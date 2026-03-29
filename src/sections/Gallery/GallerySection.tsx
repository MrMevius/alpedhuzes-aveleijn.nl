import { SectionBlock } from '../../components/layout/SectionBlock'
import { ImageWithFallback } from '../../components/ui/ImageWithFallback'
import type { GalleryContent } from '../../types/content'
import styles from './GallerySection.module.css'

interface GallerySectionProps {
  content: GalleryContent
}

export function GallerySection({ content }: GallerySectionProps) {
  return (
    <SectionBlock id={content.sectionId} title={content.title} className={styles.section}>
      <div className={styles.galleryGrid}>
        {content.images.map((image) => (
          <figure key={`${image.src}-${image.alt}`} className={styles.figure}>
            <ImageWithFallback src={image.src} alt={image.alt} className={styles.image} />
            {image.caption ? <figcaption className={styles.caption}>{image.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    </SectionBlock>
  )
}
