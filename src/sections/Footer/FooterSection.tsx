import { SectionBlock } from '../../components/layout/SectionBlock'
import type { SiteContent } from '../../types/content'
import styles from './FooterSection.module.css'

interface FooterSectionProps {
  content: SiteContent
}

export function FooterSection({ content }: FooterSectionProps) {
  return (
    <SectionBlock id="footer" title={content.siteName} className={styles.section}>
      <nav aria-label={content.footer.navigationAriaLabel}>
        <ul className={styles.menu}>
          {content.footer.menu.map((item) => (
            <li key={`${item.label}-${item.href}`}>
              <a href={item.href} className={styles.menuLink}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {content.footer.copyright ? <p>{content.footer.copyright}</p> : null}
    </SectionBlock>
  )
}
