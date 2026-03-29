import { useEffect, useMemo, useState } from 'react'
import { SectionBlock } from '../../components/layout/SectionBlock'
import type { ProgressContent } from '../../types/content'
import styles from './ProgressSection.module.css'

interface ProgressSectionProps {
  content: ProgressContent
}

export function ProgressSection({ content }: ProgressSectionProps) {
  const [totalEurRounded, setTotalEurRounded] = useState(0)
  const [isStale, setIsStale] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function fetchProgress() {
      try {
        const response = await fetch('/api/progress')

        if (!response.ok) {
          return
        }

        const payload = (await response.json()) as {
          totalEurRounded?: number
          isStale?: boolean
        }

        if (!isMounted) {
          return
        }

        setTotalEurRounded(typeof payload.totalEurRounded === 'number' ? payload.totalEurRounded : 0)
        setIsStale(Boolean(payload.isStale))
      } catch {
        if (isMounted) {
          setTotalEurRounded(0)
          setIsStale(true)
        }
      }
    }

    void fetchProgress()

    return () => {
      isMounted = false
    }
  }, [])

  const percentage = useMemo(() => {
    if (content.goalEur <= 0) {
      return 0
    }

    return Math.max(0, Math.min(100, Math.round((totalEurRounded / content.goalEur) * 100)))
  }, [content.goalEur, totalEurRounded])

  return (
    <SectionBlock id={content.sectionId} title={content.title} className={styles.section}>
      <div className={styles.progressBarTrack} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}>
        <div className={styles.progressBarFill} style={{ width: `${percentage}%` }} />
      </div>

      <p className={styles.metric}>
        {content.labels.totalRaised}: € {totalEurRounded.toLocaleString('nl-NL')}
      </p>
      <p className={styles.metric}>{content.labels.teamGoal}: € {content.goalEur.toLocaleString('nl-NL')}</p>
      {isStale ? <p className={styles.status}>Laatste bekende tussenstand getoond.</p> : null}
    </SectionBlock>
  )
}
