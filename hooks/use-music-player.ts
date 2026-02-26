"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type RepeatMode = "off" | "all" | "track"

export type Song = {
  name: string
  artists: string[]
  album: {
    image?: string
  }
  audioSrc: string
  spotifyUrl: string
}

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00"
  }

  const total = Math.floor(seconds)
  const mins = Math.floor(total / 60)
  const secs = total % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function useMusicPlayer({ song }: { song: Song }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isShuffling, setIsShuffling] = useState(false)
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off")
  const [isReady, setIsReady] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    audio.pause()
    audio.currentTime = 0
    setCurrentTime(0)
    setDuration(0)
    setIsPlaying(false)
    setIsReady(false)
    setHasError(false)
  }, [song.audioSrc])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
      setIsReady(true)
      setHasError(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleError = () => {
      setHasError(true)
      setIsReady(false)
      setIsPlaying(false)
    }

    const handleEnded = async () => {
      if (repeatMode === "track" || repeatMode === "all") {
        audio.currentTime = 0
        setCurrentTime(0)
        try {
          await audio.play()
          setHasError(false)
        } catch {
          setHasError(true)
        }
        return
      }

      audio.currentTime = 0
      setCurrentTime(0)
      setIsPlaying(false)
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    if (audio.readyState >= 1) {
      handleLoadedMetadata()
    }

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
    }
  }, [repeatMode, song.audioSrc])

  useEffect(() => {
    const audio = audioRef.current

    return () => {
      audio?.pause()
    }
  }, [])

  const progressPercentage = useMemo(() => {
    if (duration <= 0) {
      return 0
    }

    return (currentTime / duration) * 100
  }, [currentTime, duration])

  const isPlayable = isReady && !hasError && duration > 0

  const togglePlayPause = async () => {
    const audio = audioRef.current
    if (!audio || !isPlayable) {
      return
    }

    if (isPlaying) {
      audio.pause()
      return
    }

    try {
      await audio.play()
      setHasError(false)
    } catch {
      setHasError(true)
    }
  }

  const handleSliderChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio || duration <= 0) {
      return
    }

    const sliderValue = value[0] ?? 0
    const nextTime = (sliderValue / 100) * duration
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const handleSkipBack = () => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    const nextTime = Math.max(audio.currentTime - 10, 0)
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const handleSkipForward = () => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    const maxDuration = duration > 0 ? duration : audio.duration || 0
    const nextTime = Math.min(audio.currentTime + 10, maxDuration)
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const toggleShuffle = () => {
    setIsShuffling((prev) => !prev)
  }

  const toggleRepeat = () => {
    setRepeatMode((prev) => {
      if (prev === "off") {
        return "all"
      }

      if (prev === "all") {
        return "track"
      }

      return "off"
    })
  }

  return {
    audioRef,
    isPlaying,
    duration,
    progressPercentage,
    formattedCurrentTime: formatTime(currentTime),
    formattedDuration: formatTime(duration),
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
  }
}
