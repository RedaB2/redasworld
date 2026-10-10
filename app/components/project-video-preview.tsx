"use client"

import { useEffect, useRef } from "react"

type ProjectVideoPreviewProps = {
  src: string
  poster: string
}

export default function ProjectVideoPreview({ src, poster }: ProjectVideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const link = video.closest("a")
    let hovered = false
    let focused = link === document.activeElement
    let visible = true
    let disposed = false

    const wantsPreview = () => !disposed && visible && !document.hidden && (hovered || focused)

    const updatePlayback = () => {
      if (!wantsPreview()) {
        video.pause()
        return
      }

      // Keep large video files out of the initial page load entirely.
      if (video.getAttribute("src") !== src) video.src = src
      void video.play().then(() => {
        // A slow load can finish after the pointer or keyboard focus has left.
        if (!wantsPreview()) video.pause()
      }).catch(() => {
        // Leaving during loading can abort play; blocked previews keep their poster.
      })
    }

    const handleMouseEnter = () => {
      hovered = true
      updatePlayback()
    }
    const handleMouseLeave = () => {
      hovered = false
      updatePlayback()
    }
    const handleFocus = () => {
      focused = true
      updatePlayback()
    }
    const handleBlur = () => {
      focused = false
      updatePlayback()
    }

    video.addEventListener("mouseenter", handleMouseEnter)
    video.addEventListener("mouseleave", handleMouseLeave)
    link?.addEventListener("focus", handleFocus)
    link?.addEventListener("blur", handleBlur)
    document.addEventListener("visibilitychange", updatePlayback)

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible) hovered = false
      updatePlayback()
    })
    observer.observe(video)

    return () => {
      disposed = true
      video.pause()
      observer.disconnect()
      video.removeEventListener("mouseenter", handleMouseEnter)
      video.removeEventListener("mouseleave", handleMouseLeave)
      link?.removeEventListener("focus", handleFocus)
      link?.removeEventListener("blur", handleBlur)
      document.removeEventListener("visibilitychange", updatePlayback)
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      poster={poster}
      preload="none"
      className="w-full h-48 object-cover"
      muted
      loop
      playsInline
    />
  )
}
