import type { ReactNode } from "react"
import { ArrowUpRightIcon } from "lucide-react"
import styles from "./project-window.module.css"

type WindowBarProps = {
  label: string
  href?: string
  linkLabel?: string
}

export function ProjectWindowBar({ label, href, linkLabel }: WindowBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.dots} aria-hidden="true"><span /><span /><span /></div>
      <span className={styles.label}>{label}</span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles.open}
          aria-label={`${linkLabel || "Open project"} (opens in a new tab)`}>
          <ArrowUpRightIcon size={15} aria-hidden="true" />
        </a>
      ) : <span aria-hidden="true" />}
    </div>
  )
}

export default function ProjectWindow({
  children,
  ...bar
}: WindowBarProps & { children: ReactNode }) {
  return (
    <div className={styles.window}>
      <ProjectWindowBar {...bar} />
      {children}
    </div>
  )
}
