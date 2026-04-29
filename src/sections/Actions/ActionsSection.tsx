import { useEffect, useState } from 'react'
import { SectionBlock } from '../../components/layout/SectionBlock'
import { ImageWithFallback } from '../../components/ui/ImageWithFallback'
import type { ActionsContent } from '../../types/content'
import styles from './ActionsSection.module.css'

interface ActionsSectionProps {
  content: ActionsContent
}

export function ActionsSection({ content }: ActionsSectionProps) {
  const [lightboxItemTitle, setLightboxItemTitle] = useState<string | null>(null)

  const lightboxItem =
    lightboxItemTitle === null
      ? null
      : content.items.find((item) => item.title === lightboxItemTitle && item.enableLightbox) ?? null

  useEffect(() => {
    if (lightboxItem === null) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxItemTitle(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxItem])

  return (
    <SectionBlock id={content.sectionId} title={content.title} className={styles.section}>
      <div className={styles.cardsGrid}>
        {content.items.map((item) => (
          <article key={item.title} className={`${styles.card} ${item.imageSize === 'large' ? styles.cardLarge : ''}`.trim()}>
            {item.enableLightbox ? (
              <button
                type="button"
                className={styles.imageButton}
                onClick={() => setLightboxItemTitle(item.title)}
                aria-label={`Vergroot afbeelding: ${item.title}`}
              >
                <ImageWithFallback
                  src={item.image.src}
                  alt={item.image.alt}
                  className={`${styles.cardImage} ${item.imageFit === 'contain' ? styles.cardImageContain : ''} ${item.imageSize === 'large' ? styles.cardImageLarge : ''}`.trim()}
                  sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className={styles.zoomIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <circle cx="11" cy="11" r="6" />
                    <line x1="16" y1="16" x2="21" y2="21" />
                  </svg>
                </span>
              </button>
            ) : (
              <ImageWithFallback
                src={item.image.src}
                alt={item.image.alt}
                className={`${styles.cardImage} ${item.imageFit === 'contain' ? styles.cardImageContain : ''} ${item.imageSize === 'large' ? styles.cardImageLarge : ''}`.trim()}
                sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDescription}>{item.description}</p>
            {item.meta ? <p className={styles.cardMeta}>{item.meta}</p> : null}
          </article>
        ))}
      </div>

      {content.notice ? <p className={styles.notice}>{content.notice}</p> : null}

      {lightboxItem ? (
        <div
          className={styles.lightboxOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={`Vergrote weergave: ${lightboxItem.title}`}
          onClick={() => setLightboxItemTitle(null)}
        >
          <div className={styles.lightboxContent} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setLightboxItemTitle(null)}
              aria-label="Sluit vergrote afbeelding"
            >
              ×
            </button>
            <ImageWithFallback
              src={lightboxItem.image.src}
              alt={lightboxItem.image.alt}
              className={styles.lightboxImage}
              sizes="(max-width: 900px) 95vw, 80vw"
            />
          </div>
        </div>
      ) : null}
    </SectionBlock>
  )
}
