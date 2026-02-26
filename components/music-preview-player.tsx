"use client"

import Link from "next/link"
import { useMemo } from "react"
import {
  ExternalLink,
  MusicIcon,
  PauseIcon,
  PlayIcon,
  Repeat1Icon,
  RepeatIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Song, useMusicPlayer } from "@/hooks/use-music-player"
import { cn } from "@/lib/utils"

type MusicPreviewPlayerProps = {
  title: string
  artist: string
  audioSrc: string
  spotifyUrl: string
  coverImage?: string
  className?: string
}

export default function MusicPreviewPlayer({
  title,
  artist,
  audioSrc,
  spotifyUrl,
  coverImage,
  className,
}: MusicPreviewPlayerProps) {
  const song = useMemo<Song>(
    () => ({
      name: title,
      artists: [artist],
      album: { image: coverImage },
      audioSrc,
      spotifyUrl,
    }),
    [artist, audioSrc, coverImage, spotifyUrl, title],
  )

  const {
    audioRef,
    isPlaying,
    duration,
    progressPercentage,
    formattedCurrentTime,
    formattedDuration,
    isShuffling,
    repeatMode,
    togglePlayPause,
    handleSliderChange,
    handleSkipBack,
    handleSkipForward,
    toggleShuffle,
    toggleRepeat,
    isPlayable,
    hasError,
  } = useMusicPlayer({ song })

  return (
    <div
      className={cn(
        "pointer-events-auto flex w-full flex-col gap-2 rounded-2xl border border-border/70 bg-popover/95 p-3 shadow-sm backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-start gap-2.5">
        {song.album.image ? (
          <img
            src={song.album.image}
            alt={`${song.name} artwork`}
            className="h-11 w-11 rounded-md object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-muted">
            <MusicIcon className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-tight">{song.name}</p>
          <p className="truncate text-xs text-muted-foreground">{song.artists.join(", ")}</p>
          <p className="text-[11px] text-muted-foreground/85">Sneak preview</p>
        </div>
      </div>

      <div className="mt-0.5 flex items-center gap-1.5">
        <span className="w-7 text-[10px] tabular-nums text-muted-foreground">
          {formattedCurrentTime}
        </span>
        <Slider
          aria-label="Music progress slider"
          value={[progressPercentage]}
          max={100}
          step={1}
          onValueChange={handleSliderChange}
          disabled={duration === 0}
          className="flex-1 [&>span:first-child]:h-1.5 [&>span:first-child]:bg-muted/80 [&>span:first-child>span]:bg-[#1DB954] [&>span[role=slider]]:h-3.5 [&>span[role=slider]]:w-3.5 [&>span[role=slider]]:border [&>span[role=slider]]:border-[#1DB954]/80"
        />
        <span className="w-7 text-right text-[10px] tabular-nums text-muted-foreground">
          {formattedDuration}
        </span>
      </div>

      <div className="flex items-center justify-center gap-0.5">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={cn(
            "relative h-7 w-7 rounded-full",
            isShuffling ? "text-[#1DB954] hover:text-[#1DB954]" : "text-muted-foreground",
          )}
          aria-label={`Shuffle ${isShuffling ? "on" : "off"}`}
          onClick={toggleShuffle}
          disabled={!isPlayable}
        >
          <ShuffleIcon className="h-3.5 w-3.5" />
          {isShuffling ? (
            <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-[#1DB954]" />
          ) : null}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full text-muted-foreground"
          aria-label="Skip backwards ten seconds"
          onClick={handleSkipBack}
          disabled={!isPlayable}
        >
          <SkipBackIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="default"
          size="icon"
          className="mx-1 h-8 w-8 rounded-full bg-foreground text-background hover:bg-foreground/90"
          onClick={togglePlayPause}
          disabled={!isPlayable}
          aria-label={isPlaying ? "Pause preview" : "Play preview"}
        >
          {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full text-muted-foreground"
          aria-label="Skip forward ten seconds"
          onClick={handleSkipForward}
          disabled={!isPlayable}
        >
          <SkipForwardIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative h-7 w-7 rounded-full",
            repeatMode !== "off"
              ? "text-[#1DB954] hover:text-[#1DB954]"
              : "text-muted-foreground",
          )}
          aria-label={`Repeat ${repeatMode}`}
          onClick={toggleRepeat}
          disabled={!isPlayable}
        >
          {repeatMode === "track" ? (
            <Repeat1Icon className="h-3.5 w-3.5" />
          ) : (
            <RepeatIcon className="h-3.5 w-3.5" />
          )}
          {repeatMode !== "off" ? (
            <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-[#1DB954]" />
          ) : null}
        </Button>
      </div>

      <Button
        asChild
        variant="ghost"
        size="sm"
        className="h-7 w-full justify-between rounded-xl border border-border/70 bg-background/65 px-2.5 text-[11px] hover:bg-accent/60"
      >
        <Link href={song.spotifyUrl} target="_blank" rel="noopener noreferrer">
          Open in Spotify
          <ExternalLink className="h-3 w-3" />
        </Link>
      </Button>

      {hasError ? (
        <p className="mt-2 text-[11px] text-muted-foreground">Preview file not available yet.</p>
      ) : null}

      <audio ref={audioRef} src={song.audioSrc} preload="metadata" />
    </div>
  )
}
