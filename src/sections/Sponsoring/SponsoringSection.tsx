import { SectionBlock } from '../../components/layout/SectionBlock'
import type { SponsoringContent } from '../../types/content'
import styles from './SponsoringSection.module.css'

interface SponsoringSectionProps {
  content: SponsoringContent
}

export function SponsoringSection({ content }: SponsoringSectionProps) {
  return (
    <SectionBlock id={content.sectionId} title={content.title} className={styles.section}>
      {content.intro ? <p className={styles.intro}>{content.intro}</p> : null}
      {content.note ? <p className={styles.note}>{content.note}</p> : null}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">{content.tableHeaders.package}</th>
              <th scope="col">{content.tableHeaders.contribution}</th>
              <th scope="col">{content.tableHeaders.benefits}</th>
            </tr>
          </thead>
          <tbody>
            {content.tiers.map((tier) => (
              <tr key={tier.name}>
                <td className={styles.cell} data-label={content.tableHeaders.package}>
                  {tier.name}
                </td>
                <td className={styles.cell} data-label={content.tableHeaders.contribution}>
                  {tier.contribution}
                </td>
                <td className={styles.cell} data-label={content.tableHeaders.benefits}>
                  <ul className={styles.benefitsList}>
                    {tier.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {content.cta ? (
        <a href={content.cta.href} className={styles.ctaLink}>
          {content.cta.label}
        </a>
      ) : null}
    </SectionBlock>
  )
}
