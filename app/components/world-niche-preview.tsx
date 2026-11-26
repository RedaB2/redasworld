"use client"

import { PauseIcon, PlayIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import styles from "./world-niche-feature.module.css"

const clip = "/world-niche/duo-fold.mp4"
const cover = "/world-niche/duo-cover.webp"
const unfolded = "/world-niche/duo-unfolded.webp"
const frameRate = 60
const travelMs = 2200
const endHoldMs = 1800

export default function WorldNichePreview() {
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const requestedFrame = useRef(0)
  const position = useRef(0)
  const direction = useRef(1)
  const [allowAutoplay, setAllowAutoplay] = useState<boolean | null>(null)
  const [choice, setChoice] = useState<"auto" | "play" | "pause">("auto")
  const [failed, setFailed] = useState(false)
  const [openStill, setOpenStill] = useState(false)
  const playing = !failed && (choice === "play" || (choice === "auto" && allowAutoplay === true))

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
    const video = videoRef.current
    if (!stage || !video || failed) return

    let inView = false
    let frame = 0
    let previousTime = 0
    let previousScroll = 0
    let holdUntil = 0
    let loaded = video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
    const atEnd = () => position.current === 0 || position.current === 1
    const openness = () => position.current ** 2 * (3 - 2 * position.current)

    // Seek into the middle of a sample. In particular, duration itself is
    // past the final open frame. Let each decode finish before asking for the
    // latest pose so fast scrolls do not leave a backlog of stale seeks.
    const showPose = () => {
      if (!loaded || video.seeking || !Number.isFinite(video.duration)) return
      const count = Math.max(1, Math.round(video.duration * frameRate))
      const target = Math.round(openness() * (count - 1))
      if (target === requestedFrame.current) return
      requestedFrame.current = target
      video.currentTime = (target + 0.5) * video.duration / count
    }

    const onLoaded = () => {
      loaded = true
      showPose()
    }

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
      } else if (loaded && now >= holdUntil) {
        if (position.current === 0) direction.current = 1
        if (position.current === 1) direction.current = -1
        next += direction.current * elapsed / travelMs
      }
      next = Math.max(0, Math.min(1, next))
      if (next !== position.current) {
        position.current = next
        stage.style.setProperty("--open", String(openness()))
        showPose()
        if (atEnd()) holdUntil = now + endHoldMs
      }
      if (delta !== 0) holdUntil = now + (atEnd() ? endHoldMs : 500)
      frame = requestAnimationFrame(tick)
    }

    const sync = () => {
      cancelAnimationFrame(frame)
      if (!playing || !inView || document.hidden) return
      if (!video.hasAttribute("src")) {
        video.preload = "auto"
        video.src = clip
      }
      previousScroll = window.scrollY
      previousTime = performance.now()
      holdUntil = previousTime + (atEnd() ? endHoldMs : 0)
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.intersectionRatio >= 0.12
      sync()
    }, { threshold: 0.12 })
    observer.observe(stage)
    video.addEventListener("loadeddata", onLoaded)
    video.addEventListener("seeked", onLoaded)
    document.addEventListener("visibilitychange", sync)
    return () => {
      observer.disconnect()
      video.removeEventListener("loadeddata", onLoaded)
      video.removeEventListener("seeked", onLoaded)
      document.removeEventListener("visibilitychange", sync)
      cancelAnimationFrame(frame)
    }
  }, [playing, failed])

  return (
    <figure className={styles.preview}>
      <div
        id="world-niche-duo"
        ref={stageRef}
        className={styles.stage}
        role="img"
        aria-label={failed
          ? `A hand holds ${openStill ? "an unfolded" : "a folded"} iPhone Duo showing World Niche’s Discover globe centered on Morocco.`
          : "A hand holds an iPhone Duo. It unfolds to show World Niche’s Discover globe centered on Morocco."}
      >
        {failed ? (
          <img src={openStill ? unfolded : cover} width={864} height={800} className={styles.duoMedia} alt="" />
        ) : (
          <video
            ref={videoRef}
            className={styles.duoMedia}
            width={864}
            height={800}
            poster={cover}
            preload="none"
            playsInline
            muted
            aria-hidden="true"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <figcaption className={styles.caption}>
        <span>iPhone Duo{playing && " · Scroll to unfold"}</span>
        {failed ? (
          <button
            className={styles.playback}
            type="button"
            aria-controls="world-niche-duo"
            onClick={() => setOpenStill(open => !open)}
          >
            View {openStill ? "folded" : "unfolded"} Duo
          </button>
        ) : allowAutoplay !== null && (
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
