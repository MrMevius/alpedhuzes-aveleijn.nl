import { SectionBlock } from '../../components/layout/SectionBlock'
import type { ContactContent } from '../../types/content'
import styles from './ContactSection.module.css'

interface ContactSectionProps {
  content: ContactContent
}

function iconForLabel(label: string) {
  const normalizedLabel = label.trim().toLowerCase()

  switch (normalizedLabel) {
    case 'e-mail':
    case 'email':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3.75 6h16.5A1.75 1.75 0 0 1 22 7.75v8.5A1.75 1.75 0 0 1 20.25 18H3.75A1.75 1.75 0 0 1 2 16.25v-8.5A1.75 1.75 0 0 1 3.75 6Zm.3 2 7.4 5.38a.95.95 0 0 0 1.1 0L19.95 8" />
        </svg>
      )
    case 'telefoon':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M6.62 3.12a1.2 1.2 0 0 1 1.3-.28l2.26.9a1.2 1.2 0 0 1 .72 1.32l-.42 2.22a1.2 1.2 0 0 1-.6.84l-1.26.7a13.2 13.2 0 0 0 6.56 6.56l.7-1.26a1.2 1.2 0 0 1 .84-.6l2.22-.42a1.2 1.2 0 0 1 1.32.72l.9 2.26a1.2 1.2 0 0 1-.28 1.3l-1.51 1.5a2.4 2.4 0 0 1-2.2.65 17.2 17.2 0 0 1-7.36-3.45 17.2 17.2 0 0 1-3.45-7.36 2.4 2.4 0 0 1 .65-2.2l1.5-1.5Z" />
        </svg>
      )
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.87.24-1.46 1.5-1.46h1.6V5.02A21.6 21.6 0 0 0 14.27 5C11.95 5 10.3 6.42 10.3 9.03V11H8v3h2.3v7h3.2Z" />
        </svg>
      )
    case 'instagram':
    case 'instragram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M8.2 3h7.6A5.2 5.2 0 0 1 21 8.2v7.6a5.2 5.2 0 0 1-5.2 5.2H8.2A5.2 5.2 0 0 1 3 15.8V8.2A5.2 5.2 0 0 1 8.2 3Zm0 1.8A3.4 3.4 0 0 0 4.8 8.2v7.6a3.4 3.4 0 0 0 3.4 3.4h7.6a3.4 3.4 0 0 0 3.4-3.4V8.2a3.4 3.4 0 0 0-3.4-3.4H8.2Zm3.8 2.7A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8a2.7 2.7 0 1 0 2.7 2.7 2.7 2.7 0 0 0-2.7-2.7Zm4.7-2a1.05 1.05 0 1 1-1.05 1.05A1.05 1.05 0 0 1 16.7 7.3Z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M5.5 8.3A1.8 1.8 0 1 1 5.5 4.7a1.8 1.8 0 0 1 0 3.6ZM4 20h3V10H4v10Zm5 0h3v-5.1c0-1.35.26-2.65 1.93-2.65 1.64 0 1.67 1.53 1.67 2.73V20h3v-5.63c0-2.77-.6-4.9-3.83-4.9a3.37 3.37 0 0 0-3 1.65h-.04V10H9v10Z" />
        </svg>
      )
    default:
      return null
  }
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
          <a
            key={`${item.label}-${item.href}`}
            href={item.href}
            className={styles.card}
            aria-label={`${item.label}: ${item.value}`}
          >
            <span className={styles.cardHeader}>
              <span className={styles.icon} aria-hidden="true">
                {iconForLabel(item.label)}
              </span>
              <strong>{item.label}</strong>
            </span>
            <span className={styles.value}>{item.value}</span>
          </a>
        ))}
      </div>
    </SectionBlock>
  )
}
