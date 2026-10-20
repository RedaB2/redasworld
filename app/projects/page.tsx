import Link from "next/link"
import { PROJECTS } from "@/lib/projects"
import MusicPreviewRail from "@/components/music-preview-rail"
import { CodexProfilePlacement } from "@/components/codex-profile-card"
import ProfileWidgetsInline from "@/components/profile-widgets-inline"
import SiteFooter from "@/components/site-footer"
import StravaRunningRail from "@/components/strava-running-rail"
import WorldNicheFeature from "../components/world-niche-feature"
import ProjectExplorer from "../components/project-explorer"
import styles from "./projects.module.css"

export default function Projects() {
  return (
    <>
      <MusicPreviewRail>
        <CodexProfilePlacement placement="rail" />
      </MusicPreviewRail>
      <StravaRunningRail />
      <div className={styles.page}>
        <a className={styles.skipLink} href="#projects-content">Skip to projects</a>
        <header className="flex justify-between items-center">
          <Link href="/" className={styles.home} aria-label="Reda's World home">
            <span className="text-2xl" aria-hidden="true">🦁</span>
          </Link>
          <nav aria-label="Main navigation" className="flex gap-4">
            <Link href="/projects" aria-current="page" className={styles.navLink}>
              Projects
            </Link>
          </nav>
        </header>
        <main id="projects-content" className={styles.main}>
          <div className={styles.intro}>
            <h1 className={styles.title}>Projects<span aria-hidden="true">.</span></h1>
            <div className={styles.introLine}>
              <p>Nothing fancy. But my work.</p>
              <span>{String(PROJECTS.length + 1).padStart(2, "0")} projects &amp; counting</span>
            </div>
          </div>
          <WorldNicheFeature />
          <ProjectExplorer projects={PROJECTS} />
          <ProfileWidgetsInline className="mb-8" />
          <CodexProfilePlacement placement="inline" className="mb-8" />
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
