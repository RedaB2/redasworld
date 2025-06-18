import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { thoughts } from "@/data/thoughts"

export default function Thoughts() {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "just now"
    if (diffInHours < 24) return `${diffInHours}h`
    if (diffInHours < 48) return "1d"
    return `${Math.floor(diffInHours / 24)}d`
  }

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
          <Link href="/thoughts" className="hover:underline text-green-600 font-medium">
            Thoughts
          </Link>
        </nav>
      </header>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4 border-b-2 border-green-500 pb-2 inline-block">Thoughts</h1>
        <p className="text-sm text-gray-600">Random thoughts, tech takes, and life updates</p>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {thoughts.map((thought) => (
          <div key={thought.id} className="bg-white rounded-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg">
            {/* Post Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-green-100">
                <span className="text-green-600 text-xl">🦁</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900">Reda Boutayeb</h3>
                  <span className="text-gray-500 text-sm">@redab2</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500 text-sm">{formatDate(thought.timestamp)}</span>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-gray-900 leading-relaxed">{thought.content}</p>
            </div>

          </div>
        ))}
      </div>

      {thoughts.length === 0 && (
        <div className="text-center mt-8 text-gray-500">
          <p>No thoughts yet. Check back later!</p>
        </div>
      )}

      <footer className="flex justify-center gap-4 pt-8 mt-8 border-t border-gray-200">
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
      <p className="text-center text-gray-400 text-sm mt-2">Last updated: 06/17/2025</p>
    </div>
  )
}