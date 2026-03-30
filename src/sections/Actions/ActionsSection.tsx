import { SectionBlock } from '../../components/layout/SectionBlock'
import { ImageWithFallback } from '../../components/ui/ImageWithFallback'
import type { ActionsContent } from '../../types/content'
import styles from './ActionsSection.module.css'

interface ActionsSectionProps {
  content: ActionsContent
}

export function ActionsSection({ content }: ActionsSectionProps) {
  return (
    <SectionBlock id={content.sectionId} title={content.title} className={styles.section}>
      <div className={styles.cardsGrid}>
        {content.items.map((item) => (
          <article key={item.title} className={styles.card}>
            <ImageWithFallback
              src={item.image.src}
              alt={item.image.alt}
              className={`${styles.cardImage} ${item.imageFit === 'contain' ? styles.cardImageContain : ''}`.trim()}
              sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDescription}>{item.description}</p>
            {item.meta ? <p className={styles.cardMeta}>{item.meta}</p> : null}
          </article>
        ))}
      </div>

      {content.notice ? <p className={styles.notice}>{content.notice}</p> : null}
    </SectionBlock>
  )
}
