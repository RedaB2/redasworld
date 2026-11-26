"use client"

import { PauseIcon, PlayIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import styles from "./world-niche-feature.module.css"

const travelMs = 2200
const endHoldMs = 1800

export default function WorldNichePreview() {
  const stageRef = useRef<HTMLDivElement>(null)
  const position = useRef(0)
  const direction = useRef(1)
  const [allowAutoplay, setAllowAutoplay] = useState<boolean | null>(null)
  const [choice, setChoice] = useState<"auto" | "play" | "pause">("auto")
  const playing = choice === "play" || (choice === "auto" && allowAutoplay === true)

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const connection = (navigator as Navigator & {
      connection?: EventTarget & { saveData?: boolean }
    }).connection

    const syncPreferences = () => {
      const allowed = !motion.matches && !connection?.saveData
      setAllowAutoplay(allowed)
      if (!allowed) setChoice(previous => previous === "play" ? "auto" : previous)
    }
    syncPreferences()
    motion.addEventListener("change", syncPreferences)
    connection?.addEventListener("change", syncPreferences)
    return () => {
      motion.removeEventListener("change", syncPreferences)
      connection?.removeEventListener("change", syncPreferences)
    }
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !playing) return

    let inView = false
    let frame = 0
    let previousTime = 0
    let previousScroll = 0
    let holdUntil = 0
    const atEnd = () => position.current === 0 || position.current === 1

    const tick = (now: number) => {
      const delta = window.scrollY - previousScroll
      const elapsed = Math.min(now - previousTime, 64)
      previousScroll = window.scrollY
      previousTime = now

      // Scrolling takes over the current pose. Idle playback continues from there.
      let next = position.current
      if (delta !== 0) {
        direction.current = Math.sign(delta)
        next += delta / Math.min(window.innerHeight * 0.32, 260)
      } else if (now >= holdUntil) {
        if (position.current === 0) direction.current = 1
        if (position.current === 1) direction.current = -1
        next += direction.current * elapsed / travelMs
      }
      next = Math.max(0, Math.min(1, next))
      if (next !== position.current) {
        position.current = next
        const openness = next * next * (3 - 2 * next)
        stage.style.setProperty("--open", String(openness))
        // Explicitly cull the far face on WebKit's nested 3D layers.
        stage.toggleAttribute("data-inner-face", openness >= 0.5)
        if (atEnd()) holdUntil = now + endHoldMs
      }
      if (delta !== 0) holdUntil = now + (atEnd() ? endHoldMs : 500)
      frame = requestAnimationFrame(tick)
    }

    const sync = () => {
      cancelAnimationFrame(frame)
      if (inView && !document.hidden) {
        previousScroll = window.scrollY
        previousTime = performance.now()
        holdUntil = previousTime + (atEnd() ? endHoldMs : 0)
        frame = requestAnimationFrame(tick)
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.intersectionRatio >= 0.12
      sync()
    }, { threshold: 0.12 })
    observer.observe(stage)
    document.addEventListener("visibilitychange", sync)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", sync)
      cancelAnimationFrame(frame)
    }
  }, [playing])

  return (
    <figure className={styles.preview}>
      <div
        id="world-niche-duo"
        ref={stageRef}
        className={styles.stage}
        role="img"
        aria-label="A hand holds an iPhone Duo. It unfolds to show World Niche’s Discover globe centered on Morocco."
      >
        <div className={styles.orbit} />
        <div className={styles.handheld}>
          <div className={styles.grip} />
          <div className={styles.device}>
            <div className={styles.fixedPanel}>
              <div className={styles.innerScreen} />
            </div>
            <div className={styles.leaf}>
              <div className={styles.inside}>
                <div className={styles.innerScreen} />
              </div>
              <div className={styles.cover}>
                <div className={styles.coverScreen} />
              </div>
              <div className={styles.edge} />
            </div>
          </div>
        </div>
      </div>
      <figcaption className={styles.caption}>
        <span>iPhone Duo{playing && " · Scroll to unfold"}</span>
        {allowAutoplay !== null && (
          <button
            className={styles.playback}
            type="button"
            aria-controls="world-niche-duo"
            aria-label={playing ? "Pause World Niche preview" : "Play World Niche preview"}
            onClick={() => setChoice(playing ? "pause" : "play")}
          >
            {playing ? <PauseIcon size={13} aria-hidden="true" /> : <PlayIcon size={13} aria-hidden="true" />}
            {playing ? "Pause preview" : "Play preview"}
          </button>
        )}
      </figcaption>
    </figure>
  )
}
