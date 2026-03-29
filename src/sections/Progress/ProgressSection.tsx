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
          isStale?: boolean
        }

        if (!isMounted) {
          return
        }

        setTotalRaised(typeof payload.totalRaised === 'number' ? payload.totalRaised : 0)
        setGoal(typeof payload.goal === 'number' ? payload.goal : content.goalEur)
        setIsStale(Boolean(payload.isStale))
        setHasError(false)
        setIsLoading(false)
      } catch {
        if (isMounted) {
          setTotalRaised(0)
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

  return (
    <SectionBlock id={content.sectionId} title={content.title} className={styles.section}>
      <div className={styles.progressBarTrack} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}>
        <div className={styles.progressBarFill} style={{ width: `${percentage}%` }} />
      </div>

      <p className={styles.metric}>
        {content.labels.totalRaised}: € {totalRaisedRounded.toLocaleString('nl-NL')}
      </p>
      <p className={styles.metric}>{content.labels.teamGoal}: € {goal.toLocaleString('nl-NL')}</p>

      {isLoading ? <p className={styles.status}>Tussenstand laden…</p> : null}
      {!isLoading && hasError ? (
        <p className={styles.error}>Live tussenstand tijdelijk niet beschikbaar. Laatste lokale fallback wordt getoond.</p>
      ) : null}
      {!isLoading && isStale && !hasError ? <p className={styles.status}>Laatste bekende tussenstand getoond.</p> : null}
    </SectionBlock>
  )
}
