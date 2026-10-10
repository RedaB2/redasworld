"use client"

import CodexProfileCard from "@/components/codex-profile-card"
import { MusicPreviewInline } from "@/components/music-preview-rail"
import { StravaProfileTile } from "@/components/strava-running-rail"
import { cn } from "@/lib/utils"

export default function ProfileWidgetsInline({ className }: { className?: string }) {
  return (
    <section aria-label="A little more me" className={cn("xl:hidden", className)}>
      <h2 className="mb-5 text-sm font-semibold tracking-tight text-stone-600">A little more me</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr_1.6fr]">
        <CodexProfileCard compact visibilityQuery="(max-width: 1279px)" />
        <StravaProfileTile />
        <MusicPreviewInline className="col-span-2 min-w-0 sm:col-span-1" />
      </div>
    </section>
  )
}
