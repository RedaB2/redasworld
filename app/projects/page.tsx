import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Mail } from "lucide-react"
import HoverVideo from "../components/hover-video"
import ShapeOfAIVideo from "../components/shape-of-ai-video"
import PeltonGPTVideo from "../components/pelton-gpt-video"

export default function Projects() {
  return (
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
          <Link href="/resume" className="hover:underline">
            Resume
          </Link>
        </nav>
      </header>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 border-b-2 border-green-500 pb-2 inline-block">Projects</h1>
        <p className="text-sm mb-8">Nothing fancy. But my work.</p>
      </div>
    {/* Projects Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 mb-8">
        {/* Project 1 */}
        <Link href="https://github.com/RedaB2/whydateios">
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full">
              <Image
                src="/whydate.png?height=200&width=400"
                alt="whydatepj1"
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
            </div>
            <h2 className="text-xl font-bold mt-3 mb-1">WhyDate?</h2>
            <p className="text-sm text-gray-600 text-center mb-1 max-w-xs">
              Fun & original iOS dating app created for students at WPI.
            </p>
            <p className="text-xs text-gray-500">40+ Testflight downloads (mostly friends & family 💀)</p>
          </div>
        </Link>

        {/* Project 2 */}
        <Link href="https://github.com/RedaB2/BrighamWomenKiosk">
        <div className="flex flex-col items-center">
          <div className="overflow-hidden rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full">
            <Image
              src="/kioskdemo.png?height=200&width=400"
              alt="Kiosk Demo"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
          </div>
          <h2 className="text-xl font-bold mt-3 mb-1">Brigham and Women's Hospital</h2>
          <p className="text-sm text-gray-600 text-center mb-1 max-w-xs">
            Web app to be used by patients & staff at Brigham and Women's Hospital. Packed with cool features like pathfinding in the hospital and flower ordering.
          </p>
          <p className="text-xs text-gray-500">2nd Place @ CS3733</p>
        </div>
        </Link>
        {/* Project 3 */}
        <Link href="https://github.com/RedaB2/PeltonGPT">
        <div className="flex flex-col items-center">
          <div className="overflow-hidden rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full">
            <PeltonGPTVideo />
          </div>
          <h2 className="text-xl font-bold mt-3 mb-1">PeltonGPT</h2>
          <p className="text-sm text-gray-600 text-center mb-1 max-w-xs">
            LLM powered research assistant for Professor Ono's research lab on fluid dynamics at Shibaura Institute of Technology.
          </p>
          <p className="text-xs text-gray-500">Improved research efficiency by 45%</p>
        </div>
        </Link>
        {/* Project 4 */}
        <Link href="https://github.com/RedaB2/final">
        <div className="flex flex-col items-center">
          <div className="overflow-hidden rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full">
            <ShapeOfAIVideo />
          </div>
          <h2 className="text-xl font-bold mt-3 mb-1">Shape of AI</h2>
          <p className="text-sm text-gray-600 text-center mb-1 max-w-xs">
            Web app to help visualize AI models with human knowledge. Inspired by Yann LeCun's talk at the Summit 2025.
          </p>
          <p className="text-xs text-gray-500">Is a 4 year old child smarter than ChatGPT?</p>
        </div>
        </Link>
      </div>
      {/* Project 5 - Centered below grid */}
      <div className="flex justify-center mb-8">
        <Link href="https://github.com/RedaB2/AlphaLasker">
          <div className="flex flex-col items-center max-w-md">
            <div className="overflow-hidden rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full">
              <HoverVideo />
            </div>
            <h2 className="text-xl font-bold mt-3 mb-1">AlphaLasker</h2>
            <p className="text-sm text-gray-600 text-center mb-1 max-w-xs">
              A Lasker Morris player powered by Gemini API. Smart decision making, fast response time and fallback on hardcoded algorithm if API fails.
            </p>
            <p className="text-xs text-gray-500">Can you beat it at Lasker Morris?</p>
          </div>
        </Link>
      </div>
      <footer className="flex justify-center gap-4 pt-4 border-t border-gray-200">
        <Link
          href="https://github.com/RedaB2"
          className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-110"
        >
          <Github size={20} />
          <span className="sr-only">GitHub</span>
        </Link>
        <Link
          href="https://www.linkedin.com/in/redabtb/"
          className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-110"
        >
          <Linkedin size={20} />
          <span className="sr-only">LinkedIn</span>
        </Link>
        <Link
          href="mailto:boutayeb.reda@icloud.com"
          className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-110"
        >
          <Mail size={20} />
          <span className="sr-only">Email</span>
        </Link>
      </footer>
      <p className="text-center text-gray-400 text-sm mt-2">Last updated: {new Date().toLocaleDateString()}</p>
    </div>
  )
} 