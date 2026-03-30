import { useEffect, useMemo, useState } from 'react'
import { SectionBlock } from '../../components/layout/SectionBlock'
import type { ProgressContent } from '../../types/content'
import styles from './ProgressSection.module.css'

interface ProgressSectionProps {
  content: ProgressContent
}

export function ProgressSection({ content }: ProgressSectionProps) {
  const [totalRaised, setTotalRaised] = useState(0)
  const [goal, setGoal] = useState(content.goalEur)
  const [activeFundraisers, setActiveFundraisers] = useState(0)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [cacheAgeSeconds, setCacheAgeSeconds] = useState(0)
  const [isStale, setIsStale] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function fetchProgress() {
      try {
        const response = await fetch('/api/progress')

        if (!response.ok) {
          if (isMounted) {
            setHasError(true)
            setIsStale(true)
            setIsLoading(false)
          }

          return
        }

        const payload = (await response.json()) as {
          totalRaised?: number
          goal?: number
          lastUpdated?: string
          cacheAgeSeconds?: number
          isStale?: boolean
          sources?: Array<{ id?: string; status?: 'ok' | 'error' }>
        }

        if (!isMounted) {
          return
        }

        setTotalRaised(typeof payload.totalRaised === 'number' ? payload.totalRaised : 0)
        setGoal(typeof payload.goal === 'number' ? payload.goal : content.goalEur)
        setLastUpdated(typeof payload.lastUpdated === 'string' ? payload.lastUpdated : null)
        setCacheAgeSeconds(typeof payload.cacheAgeSeconds === 'number' ? payload.cacheAgeSeconds : 0)
        setActiveFundraisers(Array.isArray(payload.sources) ? payload.sources.length : 0)
        setIsStale(Boolean(payload.isStale))
        setHasError(false)
        setIsLoading(false)
      } catch {
        if (isMounted) {
          setIsStale(true)
          setHasError(true)
          setIsLoading(false)
        }
      }
    }

    void fetchProgress()

    return () => {
      isMounted = false
    }
  }, [])

  const percentage = useMemo(() => {
    if (goal <= 0) {
      return 0
    }

    return Math.max(0, Math.min(100, Math.round((totalRaised / goal) * 100)))
  }, [goal, totalRaised])

  const totalRaisedRounded = Math.round(totalRaised)

  const formattedLastUpdated = useMemo(() => {
    if (!lastUpdated) {
      return 'Onbekend'
    }

    const date = new Date(lastUpdated)
    if (Number.isNaN(date.getTime())) {
      return 'Onbekend'
    }

    return new Intl.DateTimeFormat('nl-NL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }, [lastUpdated])

  const staleMinutes = Math.floor(cacheAgeSeconds / 60)

  return (
    <SectionBlock id={content.sectionId} title={content.title} className={styles.section}>
      <div className={styles.progressBarTrack} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}>
        <div className={styles.progressBarFill} style={{ width: `${percentage}%` }} />
      </div>

      <div className={styles.metricsGrid}>
        <p className={styles.metricCard}>
          <span className={styles.metricLabel}>{content.labels.totalRaised}</span>
          <span className={styles.metricValue}>€ {totalRaisedRounded.toLocaleString('nl-NL')}</span>
        </p>
        <p className={styles.metricCard}>
          <span className={styles.metricLabel}>{content.labels.teamGoal}</span>
          <span className={styles.metricValue}>€ {goal.toLocaleString('nl-NL')}</span>
        </p>
        <p className={styles.metricCard}>
          <span className={styles.metricLabel}>{content.labels.activeFundraisers}</span>
          <span className={styles.metricValue}>{activeFundraisers.toLocaleString('nl-NL')}</span>
        </p>
      </div>

      <p className={styles.statusMeta}>
        {content.labels.lastUpdated}: <strong>{formattedLastUpdated}</strong>
      </p>

      {content.primaryCta?.label || content.secondaryCta?.label ? (
        <div className={styles.actions}>
          {content.primaryCta?.label ? (
            <a href={content.primaryCta.href} className={`${styles.ctaLink} ${styles.primaryCta}`}>
              {content.primaryCta.label}
            </a>
          ) : null}
          {content.secondaryCta?.label ? (
            <a href={content.secondaryCta.href} className={`${styles.ctaLink} ${styles.secondaryCta}`}>
              {content.secondaryCta.label}
            </a>
          ) : null}
        </div>
      ) : null}

      {isLoading ? <p className={styles.status}>Tussenstand laden…</p> : null}
      {!isLoading && hasError ? (
        <p className={styles.error}>
          Live tussenstand tijdelijk niet beschikbaar. Laatste bekende tussenstand wordt getoond.
        </p>
      ) : null}
      {!isLoading && isStale ? (
        <p className={styles.status}>Laatste bekende tussenstand getoond ({staleMinutes} minuten oud).</p>
      ) : null}
    </SectionBlock>
  )
}
