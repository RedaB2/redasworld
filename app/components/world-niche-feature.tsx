import { Github, Globe2Icon } from "lucide-react"
import WorldNichePreview from "./world-niche-preview"
import { ProjectWindowBar } from "./project-window"
import styles from "./world-niche-feature.module.css"

export default function WorldNicheFeature() {
  return (
    <section className={styles.feature} aria-labelledby="world-niche-title">
      <ProjectWindowBar label="worldniche.app" />
      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <span aria-hidden="true" />
          Latest Work
        </p>
        <h2 id="world-niche-title" className={styles.title}>World Niche</h2>
        <p className={styles.tagline}>A little more world, every day.</p>
        <p className={styles.description}>
          An iPhone app I built for curious people. Pick a place on the globe or
          let a random spin take you somewhere new. Discover local music,
          cultural details, and headlines along the way.
        </p>
        <div className={styles.meta}>
          <Globe2Icon size={15} aria-hidden="true" />
          <span>Culture, music &amp; discovery</span>
        </div>
        <div className={styles.actions}>
          <a
            className={styles.link}
            href="https://worldniche.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            WorldNiche.app
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a
            className={`${styles.link} ${styles.repository}`}
            href="https://github.com/RedaB2/WorldNiche"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="World Niche repository on GitHub (opens in a new tab)"
            title="World Niche on GitHub"
          >
            <Github size={18} aria-hidden="true" />
          </a>
        </div>
        <p className={styles.availability}>Built for iPhone · In development</p>
      </div>
      <WorldNichePreview />
    </section>
  )
}
