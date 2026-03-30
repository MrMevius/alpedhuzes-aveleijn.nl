import type { CSSProperties } from 'react'
import { SectionBlock } from '../../components/layout/SectionBlock'
import { ImageWithFallback } from '../../components/ui/ImageWithFallback'
import type { SponsorsContent } from '../../types/content'
import styles from './SponsorsSection.module.css'

interface SponsorsSectionProps {
  content: SponsorsContent
}

export function SponsorsSection({ content }: SponsorsSectionProps) {
  const sponsorCountLabel = `${content.items.length} betrokken sponsors`

  return (
    <SectionBlock id={content.sectionId} title={content.title} className={styles.section}>
      <div className={styles.headerRow}>
        {content.subtitle ? <p className={styles.subtitle}>{content.subtitle}</p> : null}
        <p className={styles.countBadge}>{sponsorCountLabel}</p>
      </div>

      <div className={styles.grid}>
        {content.items.map((item) => {
          const logoScale = item.logoScale ?? (item.logoSize === 'large' ? 1.2 : 1)

          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={styles.card}
              style={{ '--logo-scale': String(logoScale) } as CSSProperties}
              aria-label={`Bezoek sponsor ${item.name} (opent in nieuw tabblad)`}
            >
              <ImageWithFallback
                src={item.logoSrc}
                alt={item.logoAlt}
                className={styles.logo}
                sizes="(max-width: 700px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </a>
          )
        })}
      </div>
    </SectionBlock>
  )
}
