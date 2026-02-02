"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  ArrowUpRight,
  Briefcase,
  FileText,
  Github,
  Home,
  Info,
  Linkedin,
  Mail,
  Sparkles,
  Video,
} from "lucide-react"

const COMMAND_CENTER_EVENT = "command-center:open"

type SectionLink = {
  id: string
  label: string
  icon?: ReactNode
}

type ExternalLink = {
  label: string
  href: string
  icon?: ReactNode
}

const PROJECT_LINKS: ExternalLink[] = [
  {
    label: "Predicting Ruff Behaviors",
    href: "https://github.com/RedaB2/accelerometer-analysis-ruffs-behaviors",
  },
  {
    label: "WhyDate?",
    href: "https://github.com/RedaB2/whydateios",
  },
  {
    label: "Brigham and Women's Hospital",
    href: "https://github.com/RedaB2/BrighamWomenKiosk",
  },
  {
    label: "PeltonGPT",
    href: "https://github.com/RedaB2/PeltonGPT",
  },
  {
    label: "Shape of AI",
    href: "https://redab2.github.io/final/",
  },
  {
    label: "AlphaLasker",
    href: "https://github.com/RedaB2/AlphaLasker",
  },
  {
    label: "SystemLoggerV1",
    href: "https://github.com/RedaB2/systemloggerv1",
  },
]

export default function CommandCenter() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const sectionLinks: SectionLink[] = useMemo(
    () => [
      { id: "top", label: "Back to top", icon: <Home /> },
      { id: "about", label: "About Me", icon: <Info /> },
      { id: "achievements", label: "Achievements", icon: <Sparkles /> },
      { id: "latest-video", label: "Latest Video", icon: <Video /> },
      { id: "work", label: "Work Experience", icon: <Briefcase /> },
      { id: "publications", label: "Publications", icon: <FileText /> },
    ],
    []
  )

  const externalLinks: ExternalLink[] = useMemo(
    () => [
      { label: "GitHub", href: "https://github.com/RedaB2", icon: <Github /> },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/redabtb/",
        icon: <Linkedin />,
      },
      {
        label: "YouTube",
        href: "https://www.youtube.com/watch?v=o26RSEnEgBs",
        icon: <Video />,
      },
    ],
    []
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable

      if (isTyping) {
        return
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    const handleOpenEvent = () => setOpen(true)

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener(COMMAND_CENTER_EVENT, handleOpenEvent)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener(COMMAND_CENTER_EVENT, handleOpenEvent)
    }
  }, [])

  const openUrl = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer")
  }

  const goToSection = (id: string) => {
    if (typeof window === "undefined") {
      return
    }

    if (window.location.pathname !== "/") {
      const target = id === "top" ? "/" : `/#${id}`
      window.location.assign(target)
      return
    }

    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      window.history.replaceState(null, "", `#${id}`)
    }
  }

  const handleSelect = (callback: () => void) => {
    callback()
    setOpen(false)
  }

  const handleRandomProject = () => {
    const random = PROJECT_LINKS[Math.floor(Math.random() * PROJECT_LINKS.length)]
    openUrl(random.href)
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("boutayeb.reda@icloud.com")
    } catch (error) {
      console.error("Failed to copy email", error)
    }
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search commands..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {sectionLinks.map((section) => (
            <CommandItem
              key={section.id}
              onSelect={() => handleSelect(() => goToSection(section.id))}
            >
              {section.icon}
              <span>{section.label}</span>
            </CommandItem>
          ))}
          <CommandItem onSelect={() => handleSelect(() => router.push("/projects"))}>
            <ArrowUpRight />
            <span>Projects page</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="External">
          {externalLinks.map((link) => (
            <CommandItem
              key={link.href}
              onSelect={() => handleSelect(() => openUrl(link.href))}
            >
              {link.icon}
              <span>{link.label}</span>
              <CommandShortcut>Open</CommandShortcut>
            </CommandItem>
          ))}
          <CommandItem
            onSelect={() => handleSelect(() => openUrl("mailto:boutayeb.reda@icloud.com"))}
          >
            <Mail />
            <span>Email me</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(handleCopyEmail)}>
            <Mail />
            <span>Copy email</span>
            <CommandShortcut>Copy</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Surprise">
          <CommandItem onSelect={() => handleSelect(handleRandomProject)}>
            <Sparkles />
            <span>Open a random project</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export { COMMAND_CENTER_EVENT }
