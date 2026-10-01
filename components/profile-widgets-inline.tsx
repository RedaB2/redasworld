"use client"

import { useEffect, useState } from "react"
import CodexProfileCard from "@/components/codex-profile-card"
import { MusicPreviewInline } from "@/components/music-preview-rail"
import { StravaProfileTile } from "@/components/strava-running-rail"

export default function ProfileWidgetsInline({ className }: { className?: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1279px)")
    const updateVisibility = () => setVisible(mediaQuery.matches)
    updateVisibility()
    mediaQuery.addEventListener("change", updateVisibility)
    return () => mediaQuery.removeEventListener("change", updateVisibility)
  }, [])

  if (!visible) return null

  return (
    <section aria-label="A little more me" className={className}>
      <h2 className="mb-5 text-sm font-semibold tracking-tight text-stone-600">A little more me</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr_1.6fr]">
        <CodexProfileCard compact />
        <StravaProfileTile />
        <MusicPreviewInline className="col-span-2 min-w-0 sm:col-span-1" />
      </div>
    </section>
  )
}
