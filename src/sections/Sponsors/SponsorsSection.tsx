import { SectionBlock } from '../../components/layout/SectionBlock'
import { ImageWithFallback } from '../../components/ui/ImageWithFallback'
import type { SponsorsContent } from '../../types/content'
import styles from './SponsorsSection.module.css'

interface SponsorsSectionProps {
  content: SponsorsContent
}

export function SponsorsSection({ content }: SponsorsSectionProps) {
  return (
    <SectionBlock id={content.sectionId} title={content.title} className={styles.section}>
      {content.subtitle ? <p className={styles.subtitle}>{content.subtitle}</p> : null}

      <div className={styles.grid}>
        {content.items.map((item) => (
          <a key={item.name} href={item.href} target="_blank" rel="noreferrer" className={styles.card}>
            <ImageWithFallback src={item.logoSrc} alt={item.logoAlt} className={styles.logo} />
            <span>{item.name}</span>
          </a>
        ))}
      </div>
    </SectionBlock>
  )
}
