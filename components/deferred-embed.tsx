"use client"

import { useEffect, useRef, useState, type IframeHTMLAttributes } from "react"

// Observe the actual frame so clipped carousel slides do not load their embeds.
// Its existing width/height or aspect-ratio wrapper reserves space immediately.
export default function DeferredEmbed({ src, ...props }: IframeHTMLAttributes<HTMLIFrameElement>) {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "300px 0px" },
    )

    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  return <iframe {...props} ref={frameRef} src={shouldLoad ? src : undefined} loading="lazy" />
}
