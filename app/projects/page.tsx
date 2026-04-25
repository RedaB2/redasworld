import Link from "next/link"
import Image from "next/image"
import { PROJECTS, type Project } from "@/lib/projects"
import HoverVideo from "../components/hover-video"
import ShapeOfAIVideo from "../components/shape-of-ai-video"
import PeltonGPTVideo from "../components/pelton-gpt-video"
import MusicPreviewRail from "@/components/music-preview-rail"
import SiteFooter from "@/components/site-footer"
import StravaRunningRail from "@/components/strava-running-rail"

function ProjectMedia({ project }: { project: Project }) {
  const { media } = project

  if (media.type === "video") {
    if (media.video === "pelton-gpt") {
      return <PeltonGPTVideo />
    }

    if (media.video === "shape-of-ai") {
      return <ShapeOfAIVideo />
    }

    return <HoverVideo />
  }

  const imageFitClass = media.fit === "contain" ? "object-contain" : "object-cover"
  const image = (
    <Image
      src={media.src}
      alt={media.alt}
      width={400}
      height={200}
      className={`w-full h-48 ${imageFitClass}`}
    />
  )

  if (media.framed) {
    return <div className="w-full h-48 bg-gray-100 flex items-center justify-center">{image}</div>
  }

  return image
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={project.href}>
      <div className="flex flex-col items-center">
        <div className="overflow-hidden rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full">
          <ProjectMedia project={project} />
        </div>
        <h2 className="text-xl font-bold mt-3 mb-1">{project.title}</h2>
        <p className="text-sm text-gray-600 text-center mb-1 max-w-xs">
          {project.description}
        </p>
        {project.detail ? (
          <p className="text-xs text-gray-500">{project.detail}</p>
        ) : null}
      </div>
    </Link>
  )
}

export default function Projects() {
  return (
    <>
      <MusicPreviewRail />
      <StravaRunningRail />
      <div className="max-w-3xl mx-auto px-4 py-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              <span className="text-white text-2xl">🦁</span>
            </div>
          </Link>
        </div>
        <nav className="flex gap-4">
          <Link href="/projects" className="hover:underline">
            Projects
          </Link>
          {/* <Link href="https://drive.google.com/file/d/17wnLKtC-bjAZQllFZCmm1y5qYDUmPw5K/view?usp=sharing" className="hover:underline">
            Resume
          </Link> */}
        </nav>
      </header>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 border-b-2 border-green-500 pb-2 inline-block">Projects</h1>
        <p className="text-sm mb-8">Nothing fancy. But my work.</p>
      </div>
    {/* Projects Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 mb-8">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.href} project={project} />
        ))}
      </div>
      <SiteFooter />
      </div>
    </>
  )
}
