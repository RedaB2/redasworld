"use client"

import Image from "next/image"
import { ArrowUpRightIcon } from "lucide-react"
import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import type { Project } from "@/lib/projects"
import ProjectWindow from "./project-window"
import ProjectDemo from "./project-demo"
import styles from "./project-explorer.module.css"

const VIDEOS = {
  "pelton-gpt": { src: "/peltongpt.mp4", poster: "/peltongpt-poster.jpg" },
  "shape-of-ai": { src: "/shapeofai.mp4", poster: "/shapeofai-poster.jpg" },
  "alpha-lasker": { src: "/alphalasker.mp4", poster: "/alphalasker-poster.jpg" },
}

function ProjectVisual({ project }: { project: Project }) {
  const { media } = project
  if (media.type === "video") {
    return <ProjectDemo {...VIDEOS[media.video]} title={project.title} />
  }
  return (
    <a className={`${styles.imageStage} ${media.framed ? styles.framed : ""}`}
      href={project.href} target="_blank" rel="noopener noreferrer"
      aria-label={`Open ${project.title} (opens in a new tab)`}>
      <Image src={media.src} alt={media.alt} fill
        sizes="(min-width: 768px) 518px, (min-width: 640px) calc(100vw - 250px), calc(100vw - 34px)"
        className={media.fit === "contain" ? styles.contain : styles.cover} />
    </a>
  )
}

export default function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(0)
  const [vertical, setVertical] = useState(true)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)")
    const update = () => setVertical(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  const handleKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % projects.length
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + projects.length) % projects.length
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = projects.length - 1
    else return
    event.preventDefault()
    setSelected(next)
    tabs.current[next]?.focus({ preventScroll: true })
    tabs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "auto" })
  }

  return (
    <section className={styles.explorer} aria-labelledby="more-projects-title">
      <div className={styles.heading}>
        <div>
          <h2 id="more-projects-title">More projects</h2>
          <p>Pick one. Take a closer look.</p>
        </div>
        <span className={styles.count}>{String(projects.length).padStart(2, "0")} to explore</span>
      </div>
      <div className={styles.layout}>
        <div className={styles.tabs} role="tablist" aria-label="Explore Reda's projects"
          aria-orientation={vertical ? "vertical" : "horizontal"}>
          {projects.map((project, index) => (
            <button key={project.href} type="button" role="tab"
              id={`project-tab-${index}`} aria-controls={`project-panel-${index}`}
              aria-selected={selected === index} tabIndex={selected === index ? 0 : -1}
              ref={node => { tabs.current[index] = node }}
              className={styles.tab}
              onClick={() => setSelected(index)}
              onKeyDown={event => handleKey(event, index)}>
              <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.tabText}>
                <span className={styles.tabTitle}>{project.title}</span>
                <span className={styles.category}>{project.category}</span>
              </span>
            </button>
          ))}
        </div>
        <div className={styles.panels}>
          {projects.map((project, index) => (
            <div key={project.href} id={`project-panel-${index}`} role="tabpanel"
              aria-labelledby={`project-tab-${index}`} tabIndex={0}
              hidden={selected !== index} className={styles.panel}>
              {selected === index && (
                <ProjectWindow label={project.category} href={project.href} linkLabel={`Open ${project.title}`}>
                  <ProjectVisual project={project} />
                </ProjectWindow>
              )}
              <div className={styles.copy}>
                <h3>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                {project.detail && <p className={styles.detail}>{project.detail}</p>}
                <a className={styles.projectLink} href={project.href} target="_blank" rel="noopener noreferrer">
                  {project.href.startsWith("https://github.com/") ? "View repository" : "Visit website"}
                  <ArrowUpRightIcon size={15} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
