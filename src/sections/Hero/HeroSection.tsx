import { SectionBlock } from '../../components/layout/SectionBlock'
import { ImageWithFallback } from '../../components/ui/ImageWithFallback'
import type { HeroContent } from '../../types/content'
import styles from './HeroSection.module.css'

interface HeroSectionProps {
  content: HeroContent
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <SectionBlock id={content.sectionId} title={content.title} className={styles.section} headingLevel={1}>
      <div className={styles.mediaFrame}>
        <ImageWithFallback
          src={content.backgroundImage.src}
          alt={content.backgroundImage.alt}
          className={styles.backgroundImage}
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 1200px) 100vw, 1160px"
        />
        <div className={styles.overlay}>
          <p className={styles.subtitle}>{content.subtitle}</p>
          {content.impactHighlight ? <p className={styles.impactHighlight}>{content.impactHighlight}</p> : null}
          <div className={styles.actions}>
            {content.primaryCta.label ? (
              <a href={content.primaryCta.href} className={`${styles.ctaLink} ${styles.primaryCta}`}>
                {content.primaryCta.label}
              </a>
            ) : null}
            {content.secondaryCta.label ? (
              <a href={content.secondaryCta.href} className={`${styles.ctaLink} ${styles.secondaryCta}`}>
                {content.secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
        <ImageWithFallback
          src={content.logoImage.src}
          alt={content.logoImage.alt}
          className={styles.logoImage}
          loading="eager"
          fetchPriority="high"
        />
      </div>
      {content.description ? <p className={styles.description}>{content.description}</p> : null}
    </SectionBlock>
  )
}
