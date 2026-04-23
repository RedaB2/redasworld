import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { LAST_UPDATED } from "@/lib/site"

const FOOTER_LINKS = [
  {
    href: "https://github.com/RedaB2",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/redabtb/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "mailto:boutayeb.reda@icloud.com",
    label: "Email",
    icon: Mail,
  },
]

export default function SiteFooter() {
  return (
    <>
      <footer className="flex justify-center gap-4 pt-4 border-t border-gray-200">
        {FOOTER_LINKS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-110"
          >
            <Icon size={20} />
            <span className="sr-only">{label}</span>
          </Link>
        ))}
      </footer>
      <p className="text-center text-gray-400 text-sm mt-2">
        Last updated: {LAST_UPDATED}
      </p>
    </>
  )
}
