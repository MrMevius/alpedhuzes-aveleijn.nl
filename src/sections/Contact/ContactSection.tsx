import { SectionBlock } from '../../components/layout/SectionBlock'
import type { ContactContent } from '../../types/content'
import styles from './ContactSection.module.css'

interface ContactSectionProps {
  content: ContactContent
}

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <SectionBlock id={content.sectionId} title={content.title} className={styles.section}>
      {content.introParagraphs?.map((paragraph, index) => (
        <p key={`${content.sectionId}-intro-${index}`} className={styles.introParagraph}>
          {paragraph}
        </p>
      ))}

      <div className={styles.cards}>
        {content.items.map((item) => (
          <a key={`${item.label}-${item.href}`} href={item.href} className={styles.card}>
            <strong>{item.label}</strong>
            <span>{item.value}</span>
          </a>
        ))}
      </div>
    </SectionBlock>
  )
}
