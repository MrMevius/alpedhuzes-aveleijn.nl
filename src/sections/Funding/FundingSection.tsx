import { SectionBlock } from '../../components/layout/SectionBlock'
import type { FundingContent } from '../../types/content'
import styles from './FundingSection.module.css'

interface FundingSectionProps {
  content: FundingContent
}

export function FundingSection({ content }: FundingSectionProps) {
  return (
    <SectionBlock id={content.sectionId} title={content.title} className={styles.section}>
      <div className={styles.textBlock}>
        {content.paragraphs.map((paragraph, index) => (
          <p key={`${content.sectionId}-${index}`} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}

        {content.links?.length ? (
          <ul className={styles.linkList}>
            {content.links.map((link) => (
              <li key={`${link.label}-${link.href}`} className={styles.linkItem}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </SectionBlock>
  )
}
