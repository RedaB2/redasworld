"use client"

import { ArrowUpRightIcon, TerminalIcon } from "lucide-react"
import { useEffect, useState } from "react"

import { CODEX_PROFILE_HANDLE, CODEX_PROFILE_URL, type CodexProfile } from "@/lib/codex-profile"
import { cn } from "@/lib/utils"

const SIDE_RAIL_QUERY = "(min-width: 1280px) and (min-height: 720px)"
const FALLBACK_PROFILE: CodexProfile = {
  name: "Réda Boutayeb",
  handle: CODEX_PROFILE_HANDLE,
  // Keep the public profile photo available when ChatGPT's preview cannot load.
  avatarUrl: "/codex-profile.jpeg",
}

export default function CodexProfileCard({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [profile, setProfile] = useState(FALLBACK_PROFILE)
  const [avatarFailed, setAvatarFailed] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProfile() {
      try {
        const response = await fetch("/api/codex-profile", { signal: controller.signal })
        if (!response.ok) return

        const data = await response.json()
        if (controller.signal.aborted) return
        setProfile({ ...data, avatarUrl: data.avatarUrl || FALLBACK_PROFILE.avatarUrl })
        setAvatarFailed(false)
      } catch {
        // The profile link and local identity remain usable if the preview is unavailable.
      }
    }

    void loadProfile()
    const refresh = window.setInterval(() => void loadProfile(), 60 * 60 * 1000)

    return () => {
      controller.abort()
      window.clearInterval(refresh)
    }
  }, [])

  return (
    <a
      href={CODEX_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${profile.name}'s Codex profile (opens in a new tab)`}
      className={cn(
        "group/codex pointer-events-auto relative block rounded-xl border border-stone-200 bg-[#fffefa] text-slate-900 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-4 motion-reduce:transform-none motion-reduce:transition-none",
        compact && "flex h-full flex-col rounded-2xl shadow-sm",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("pointer-events-none absolute -top-3 left-1/2 z-10 h-6 w-[76px] -translate-x-1/2 -rotate-[5deg] rounded-sm border border-amber-200/55 bg-amber-100/75 shadow-sm backdrop-blur-[1px]", compact && "-top-2 h-4 w-12")}
      />

      <div className={cn("flex items-center justify-between gap-3 rounded-t-xl border-b border-stone-200/80 bg-stone-100/70 px-3 pb-2.5 pt-4", compact && "rounded-t-2xl pb-2 pt-3")}>
        <span aria-hidden="true" className={cn("flex gap-1", compact && "hidden")}>
          <span className="h-1.5 w-1.5 rounded-full bg-stone-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-stone-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-stone-300" />
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-stone-600">
          <TerminalIcon aria-hidden="true" className="h-3 w-3" />
          {compact ? "Codex" : "Codex profile"}
        </span>
        <ArrowUpRightIcon aria-hidden="true" className="h-3 w-3 text-stone-400" />
      </div>

      <div className={cn("px-4 pb-4 pt-4", compact && "flex flex-1 flex-col p-3 pb-0")}>
        <div className={cn("flex items-center gap-3", compact && "flex-1 flex-wrap gap-2")}>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-green-50 text-sm font-semibold text-green-800">
            {profile.avatarUrl && !avatarFailed ? (
              <img
                src={profile.avatarUrl}
                alt=""
                width={44}
                height={44}
                referrerPolicy="no-referrer"
                onError={() => {
                  if (profile.avatarUrl !== FALLBACK_PROFILE.avatarUrl) {
                    setProfile((current) => ({ ...current, avatarUrl: FALLBACK_PROFILE.avatarUrl }))
                  } else {
                    setAvatarFailed(true)
                  }
                }}
                className="h-full w-full object-cover"
              />
            ) : (
              <span aria-hidden="true">RB</span>
            )}
          </div>
          <div className="min-w-0">
            <p className={cn("truncate text-sm font-semibold", compact && "sr-only")}>{profile.name}</p>
            <p className="mt-0.5 truncate font-mono text-[11px] text-stone-500">@{profile.handle}</p>
          </div>
        </div>

        {!compact && <p className="mt-3 text-xs leading-5 text-stone-600">A little window into my world with Codex.</p>}

        <span className={cn("mt-4 flex items-center justify-between border-t border-stone-200/80 pt-3 text-xs font-medium text-green-800", compact && "mt-3 min-h-11 pt-0")}>
          {compact ? "See profile" : "Open full profile"}
          <ArrowUpRightIcon aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover/codex:-translate-y-0.5 group-hover/codex:translate-x-0.5 motion-reduce:transform-none" />
        </span>
      </div>
    </a>
  )
}

export function CodexProfilePlacement({ placement, className }: { placement: "rail" | "inline"; className?: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Smaller screens use the grouped profile tiles; short desktops keep a single inline window.
    const mediaQuery = window.matchMedia(placement === "rail" ? SIDE_RAIL_QUERY : "(min-width: 1280px) and (max-height: 719px)")
    const updatePlacement = () => setVisible(mediaQuery.matches)
    updatePlacement()
    mediaQuery.addEventListener("change", updatePlacement)
    return () => mediaQuery.removeEventListener("change", updatePlacement)
  }, [placement])

  if (!visible) return null

  return placement === "rail" ? (
    <CodexProfileCard className="mb-7 w-[220px] rotate-[1.5deg] hover:rotate-0" />
  ) : (
    <div className={cn("mx-auto w-full max-w-sm pb-2 pt-4", className)}>
      <CodexProfileCard />
    </div>
  )
}
