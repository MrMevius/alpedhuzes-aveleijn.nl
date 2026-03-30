import { SectionBlock } from '../../components/layout/SectionBlock'
import { ImageWithFallback } from '../../components/ui/ImageWithFallback'
import type { AboutContent } from '../../types/content'
import styles from './AboutSection.module.css'

interface AboutSectionProps {
  content: AboutContent
}

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <SectionBlock id={content.sectionId} title={content.title} className={styles.section}>
      <ImageWithFallback
        src={content.image.src}
        alt={content.image.alt}
        className={styles.image}
        sizes="(max-width: 900px) 100vw, 860px"
      />

      <div className={styles.textBlock}>
        {content.paragraphs.map((paragraph, index) => (
          <p key={`${content.sectionId}-${index}`} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}

        {content.donationLink ? (
          <p className={styles.linkParagraph}>
            <a href={content.donationLink.href}>{content.donationLink.label}</a>
          </p>
        ) : null}
      </div>
    </SectionBlock>
  )
}
