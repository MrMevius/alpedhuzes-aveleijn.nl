import type { PropsWithChildren } from 'react'
import styles from './SectionBlock.module.css'

interface SectionBlockProps {
  id: string
  title: string
  className?: string
}

export function SectionBlock({ id, title, className, children }: PropsWithChildren<SectionBlockProps>) {
  const sectionClassName = className ? `${styles.sectionBlock} ${className}` : styles.sectionBlock

  return (
    <section id={id} className={sectionClassName}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </section>
  )
}
