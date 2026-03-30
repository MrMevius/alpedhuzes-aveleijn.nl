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
        }

        if (!isMounted) {
          return
        }

        setTotalRaised(typeof payload.totalRaised === 'number' ? payload.totalRaised : 0)
        setGoal(typeof payload.goal === 'number' ? payload.goal : content.goalEur)
        setCacheAgeSeconds(typeof payload.cacheAgeSeconds === 'number' ? payload.cacheAgeSeconds : 0)
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
      </div>

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
