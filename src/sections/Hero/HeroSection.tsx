import { SectionBlock } from '../../components/layout/SectionBlock'
import { ImageWithFallback } from '../../components/ui/ImageWithFallback'
import type { HeroContent } from '../../types/content'
import styles from './HeroSection.module.css'

interface HeroSectionProps {
  content: HeroContent
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <SectionBlock id={content.sectionId} title={content.title} className={styles.section}>
      <ImageWithFallback
        src={content.backgroundImage.src}
        alt={content.backgroundImage.alt}
        className={styles.backgroundImage}
      />
      <ImageWithFallback src={content.logoImage.src} alt={content.logoImage.alt} className={styles.logoImage} />
      {content.subtitle ? <p className={styles.subtitle}>{content.subtitle}</p> : null}
      {content.description ? <p className={styles.description}>{content.description}</p> : null}
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
    </SectionBlock>
  )
}
