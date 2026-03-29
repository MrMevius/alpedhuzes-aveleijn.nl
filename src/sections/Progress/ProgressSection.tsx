import { SectionBlock } from '../../components/layout/SectionBlock'
import type { ProgressContent } from '../../types/content'
import styles from './ProgressSection.module.css'

interface ProgressSectionProps {
  content: ProgressContent
}

export function ProgressSection({ content }: ProgressSectionProps) {
  return (
    <SectionBlock id={content.sectionId} title={content.title} className={styles.section}>
      <p className={styles.metric}>{content.labels.totalRaised}: € 0</p>
      <p className={styles.metric}>{content.labels.teamGoal}: € {content.goalEur.toLocaleString('nl-NL')}</p>
    </SectionBlock>
  )
}
