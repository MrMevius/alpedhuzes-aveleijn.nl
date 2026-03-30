import type { PropsWithChildren } from 'react'
import styles from './SectionBlock.module.css'

interface SectionBlockProps {
  id: string
  title: string
  className?: string
  headingLevel?: 1 | 2 | 3
}

export function SectionBlock({ id, title, className, headingLevel = 2, children }: PropsWithChildren<SectionBlockProps>) {
  const sectionClassName = className ? `${styles.sectionBlock} ${className}` : styles.sectionBlock
  const HeadingTag = `h${headingLevel}` as const

  return (
    <section id={id} className={sectionClassName}>
      <HeadingTag className={styles.title}>{title}</HeadingTag>
      {children}
    </section>
  )
}
