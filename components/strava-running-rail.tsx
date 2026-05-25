"use client"

import Image from "next/image"
import Link from "next/link"
import { ActivityIcon, QrCodeIcon, TimerIcon } from "lucide-react"
import { useId } from "react"

import { cn } from "@/lib/utils"

const STRAVA_PROFILE_URL = "https://strava.app.link/n8Rz6tUrC2b"
const STRAVA_PHOTO_PATH = "/strava-goofy-photo.jpeg"
const STRAVA_QR_PATH = "/strava-profile-qr.svg"
const RIGHT_GUTTER_CENTER = "calc((100vw - min(100vw, 800px)) / 4)"
const ORBIT_TEXT = "FOLLOW ME ON STRAVA - ".repeat(6)

export default function StravaRunningRail() {
  return (
    <aside
      aria-label="Strava profile"
      className="pointer-events-none fixed top-1/2 z-20 hidden translate-x-1/2 -translate-y-1/2 xl:block"
      style={{ right: RIGHT_GUTTER_CENTER }}
    >
      <StravaFollowCard className="w-[236px]" />
    </aside>
  )
}

export function StravaRunningInline({ className }: { className?: string }) {
  return (
    <div className={cn("mb-6 xl:hidden", className)}>
      <StravaCompactCard className="sm:hidden" />
      <div className="hidden justify-center sm:flex">
        <StravaFollowCard className="w-full max-w-[22rem]" />
      </div>
    </div>
  )
}

function StravaCompactCard({ className }: { className?: string }) {
  return (
    <Link
      href={STRAVA_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Follow Reda on Strava"
      className={cn(
        "flex items-center gap-3 rounded-lg border border-[#fc4c02]/20 bg-white p-3 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc4c02]/45",
        className,
      )}
    >
      <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#fc4c02]/20 bg-orange-50">
        <Image
          src={STRAVA_PHOTO_PATH}
          alt="Reda making a goofy face with rice"
          fill
          sizes="64px"
          className="object-cover object-[56%_59%]"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1 text-sm font-bold">
          <StravaMark className="h-4 w-4 text-[#fc4c02]" />
          Strava profile
        </span>
        <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <TimerIcon className="h-3.5 w-3.5" />
          5K in 23 min
        </span>
        <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
          <ActivityIcon className="h-3.5 w-3.5" />
          Runs, routes, repeats
        </span>
      </span>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fc4c02] text-white">
        <QrCodeIcon className="h-4 w-4" />
      </span>
    </Link>
  )
}

function StravaFollowCard({ className }: { className?: string }) {
  const orbitPathId = `strava-orbit-${useId().replace(/:/g, "")}`

  return (
    <div className={cn("strava-follow-card group/strava pointer-events-auto text-foreground", className)}>
      <Link
        href={STRAVA_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Reda on Strava"
        className="block rounded-xl transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc4c02]/45"
      >
        <span className="sr-only">Follow Reda on Strava</span>

        <div className="relative mx-auto h-[232px] w-[220px]">
          <div className="pointer-events-none absolute left-1/2 top-[132px] z-0 h-[218px] w-[218px] -translate-x-1/2 -translate-y-1/2 overflow-visible">
            <svg
              viewBox="0 0 220 220"
              aria-hidden="true"
              className="strava-orbit h-full w-full overflow-visible text-[10px] font-black uppercase text-slate-500/70 transition-colors duration-300 group-hover/strava:text-[#fc4c02]"
            >
              <defs>
                <path
                  id={orbitPathId}
                  d="M110 110 m -92 0 a 92 92 0 1 1 184 0 a 92 92 0 1 1 -184 0"
                />
              </defs>
              <text fill="currentColor">
                <textPath href={`#${orbitPathId}`} startOffset="0">
                  {ORBIT_TEXT}
                </textPath>
              </text>
            </svg>
          </div>

          <div className="absolute left-1/2 top-7 z-10 w-[146px] -translate-x-1/2 -rotate-[4deg] transition-transform duration-300 group-hover/strava:-rotate-1 group-hover/strava:scale-[1.03]">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/2 z-20 h-6 w-20 -translate-x-1/2 rotate-3 rounded-sm border border-amber-200/55 bg-amber-100/75 shadow-sm backdrop-blur-[1px]"
            />
            <div className="rounded-[8px] border border-border/70 bg-white p-2 pb-7 shadow-[0_14px_28px_rgba(15,23,42,0.14)]">
              <Image
                src={STRAVA_PHOTO_PATH}
                alt="Reda making a goofy face with rice"
                width={280}
                height={360}
                className="h-[168px] w-full rounded-[4px] object-cover object-[56%_59%]"
              />
            </div>
          </div>

          <span className="absolute right-0 top-16 z-30 flex rotate-6 items-center gap-1 rounded-md bg-[#fc4c02] px-2 py-1 text-white shadow-md transition-transform duration-300 group-hover/strava:rotate-3">
            <StravaMark className="h-4 w-4" />
            <span className="text-[10px] font-black italic leading-none">STRAVA</span>
          </span>
        </div>
      </Link>

      <Link
        href={STRAVA_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-1 grid max-w-[218px] grid-cols-[58px_1fr] items-center gap-2 rounded-xl transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc4c02]/45"
      >
        <span className="rounded-lg bg-white p-1 shadow-[0_6px_16px_rgba(15,23,42,0.09)]">
          <img src={STRAVA_QR_PATH} alt="QR code for Reda's Strava profile" className="h-12 w-12" />
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-1 text-xs font-semibold">
            <QrCodeIcon className="h-3.5 w-3.5 text-[#fc4c02]" />
            Strava profile
          </span>
          <span className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
            <TimerIcon className="h-3 w-3" />
            5K in 23 min
          </span>
          <span className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
            <ActivityIcon className="h-3 w-3" />
            Runs, routes, repeats
          </span>
        </span>
      </Link>
    </div>
  )
}

function StravaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M25.7 8 8.5 42.5h10.3l6.9-13.9 7 13.9H43L25.7 8Z"
      />
      <path
        fill="currentColor"
        fillOpacity="0.58"
        d="m42.2 42.5-6.8-13.6-6.9 13.6h8.9l4.8 9.5 13.3-25.6H45.3l-3.1 16.1Z"
      />
    </svg>
  )
}
