"use client"

import Image from "next/image"
import { PauseIcon, PlayIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import styles from "./world-niche-feature.module.css"

const demoVideo = "/world-niche/app-demo.mp4?v=niche-build2-20261020"
const demoPoster = "/world-niche/app-poster.jpg?v=niche-build2-20261020"

export default function WorldNichePreview() {
  const stageRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const userPaused = useRef(false)
  const manuallyStarted = useRef(false)
  const inView = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const stage = stageRef.current
    if (!video || !stage) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const connection = (navigator as Navigator & {
      connection?: EventTarget & { saveData?: boolean }
    }).connection
    let active = true

    const syncPlayback = () => {
      const mayAutoplay = !reducedMotion.matches && !connection?.saveData
      if (
        inView.current &&
        !document.hidden &&
        !userPaused.current &&
        (mayAutoplay || manuallyStarted.current)
      ) {
        video.play().then(() => {
          // A pending play request must not restart a hidden/unmounted preview.
          if (!active || !inView.current || document.hidden || userPaused.current) {
            video.pause()
          }
        }).catch(() => {
          // Autoplay can be blocked. The poster and Play button remain usable.
        })
      } else {
        video.pause()
      }
    }

    const onPreferenceChange = () => {
      manuallyStarted.current = false
      syncPlayback()
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting
      syncPlayback()
    }, { threshold: 0.35 })
    observer.observe(stage)
    document.addEventListener("visibilitychange", syncPlayback)
    reducedMotion.addEventListener("change", onPreferenceChange)
    connection?.addEventListener("change", onPreferenceChange)

    return () => {
      active = false
      observer.disconnect()
      document.removeEventListener("visibilitychange", syncPlayback)
      reducedMotion.removeEventListener("change", onPreferenceChange)
      connection?.removeEventListener("change", onPreferenceChange)
      video.pause()
    }
  }, [])

  const togglePlayback = async () => {
    const video = videoRef.current
    if (!video) return
    if (!video.paused) {
      userPaused.current = true
      video.pause()
    } else {
      userPaused.current = false
      manuallyStarted.current = true
      try {
        await video.play()
        if (!inView.current || document.hidden) video.pause()
      } catch {
        // Leave the explicit play control available if the browser blocks playback.
      }
    }
  }

  return (
    <figure ref={stageRef} className={styles.preview} aria-label="World Niche app preview">
      <div className={styles.stage}>
        <div className={styles.orbit} aria-hidden="true" />
        <div className={styles.handheld}>
          <Image
            src="/world-niche/hand-phone.webp"
            width={768}
            height={1152}
            alt=""
            className={styles.hand}
            sizes="(max-width: 639px) 360px, 370px"
          />
          <div className={styles.screen}>
            <video
              id="world-niche-video"
              ref={videoRef}
              className={styles.video}
              src={demoVideo}
              poster={demoPoster}
              preload="none"
              muted
              loop
              playsInline
              aria-label="World Niche demo: explore Morocco, read about Medfouna, and browse the Atlas"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={() => setFailed(true)}
            />
          </div>
        </div>
      </div>
      <figcaption className={styles.caption}>
        <span>A whole world, in your hand.</span>
        {failed ? (
          <a className={styles.playback} href={demoVideo}>
            Open demo video
          </a>
        ) : (
          <button
            className={styles.playback}
            type="button"
            aria-controls="world-niche-video"
            aria-label={playing ? "Pause World Niche preview" : "Play World Niche preview"}
            onClick={togglePlayback}
          >
            {playing
              ? <PauseIcon size={13} aria-hidden="true" />
              : <PlayIcon size={13} aria-hidden="true" />}
            {playing ? "Pause preview" : "Play preview"}
          </button>
        )}
      </figcaption>
    </figure>
  )
}
