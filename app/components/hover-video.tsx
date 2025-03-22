'use client'

export default function AlphaLaskerVideo() {
  return (
    <video
      src="/alphalasker.mp4"
      className="w-full h-48 object-cover"
      muted
      loop
      playsInline
      onMouseEnter={(e) => e.currentTarget.play()}
      onMouseLeave={(e) => e.currentTarget.pause()}
      onEnded={(e) => e.currentTarget.pause()}
    />
  )
} 