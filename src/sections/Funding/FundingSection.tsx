import { SectionBlock } from '../../components/layout/SectionBlock'
import type { FundingContent } from '../../types/content'
import styles from './FundingSection.module.css'

interface FundingSectionProps {
  content: FundingContent
}

export function FundingSection({ content }: FundingSectionProps) {
  return (
    <SectionBlock id={content.sectionId} title={content.title} className={styles.section}>
      {content.paragraphs.map((paragraph, index) => (
        <p key={`${content.sectionId}-${index}`} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
    </SectionBlock>
  )
}
