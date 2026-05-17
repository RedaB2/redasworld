import MusicPreviewPlayer from "@/components/music-preview-player"

const SPOTIFY_TRACK_URL = "https://open.spotify.com/track/7cDyCQpntkBoPkPJdxeuSC?si=2e730086ea4a4d9b"
const PREVIEW_AUDIO_PATH = "/audio/lettingudownsneakpreview.mp3"
const ALBUM_COVER_PATH = "/album_cover.jpeg"
const LEFT_GUTTER_CENTER = "calc((100vw - min(100vw, 800px)) / 4)"

export default function MusicPreviewRail() {
  return (
    <aside
      aria-label="Now playing preview"
      className="pointer-events-none fixed top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 xl:block"
      style={{ left: LEFT_GUTTER_CENTER }}
    >
      <MusicPreviewPlayer
        title="let u down"
        artist="Reda B"
        audioSrc={PREVIEW_AUDIO_PATH}
        spotifyUrl={SPOTIFY_TRACK_URL}
        coverImage={ALBUM_COVER_PATH}
        className="w-[208px]"
      />
    </aside>
  )
}

export function MusicPreviewInline({ className }: { className?: string }) {
  return (
    <div className={className}>
      <MusicPreviewPlayer
        title="let u down"
        artist="Reda B"
        audioSrc={PREVIEW_AUDIO_PATH}
        spotifyUrl={SPOTIFY_TRACK_URL}
        coverImage={ALBUM_COVER_PATH}
        className="mx-auto max-w-sm rounded-xl"
      />
    </div>
  )
}
