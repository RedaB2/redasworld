"use client"

import { useEffect, useRef } from "react"
import styles from "./project-explorer.module.css"

export default function ProjectDemo({ src, poster, title }: { src: string; poster: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const pauseWhenHidden = () => { if (document.hidden) video.pause() }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause()
    })
    observer.observe(video)
    document.addEventListener("visibilitychange", pauseWhenHidden)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", pauseWhenHidden)
      video.pause()
    }
  }, [])

  // Explicit native controls work with keyboard/touch and never autoplay.
  // Reduced-motion visitors get a still poster until they choose to play.
  return (
    <video ref={ref} className={styles.demo} src={src} poster={poster}
      preload="none" controls muted playsInline aria-label={`${title} project demonstration`} />
  )
}
