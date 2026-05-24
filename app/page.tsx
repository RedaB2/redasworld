"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRightIcon,
  BriefcaseIcon,
  FileTextIcon,
  HomeIcon,
  MenuIcon,
  PlayCircleIcon,
  SparklesIcon,
  TrophyIcon,
  UserRoundIcon,
  Youtube,
  type LucideIcon,
} from "lucide-react"
import { TypingAnimation } from "@/components/typing-animation"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react"
import { COMMAND_CENTER_EVENT } from "@/components/command-center"
import MusicPreviewRail, { MusicPreviewInline } from "@/components/music-preview-rail"
import SiteFooter from "@/components/site-footer"
import StravaRunningRail, { StravaRunningInline } from "@/components/strava-running-rail"

const ACHIEVEMENT_COUNT = 3

const MOBILE_ACHIEVEMENTS = [
  {
    title: "summer 2026 ☀️",
    label: "Adobe",
    copy: "Spending the summer at Adobe, building things I care about and learning from really smart people.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7460358217160884226",
    className: "border-red-200 bg-gradient-to-br from-red-50 to-blue-50 text-red-950",
    ctaClassName: "text-red-700",
  },
  {
    title: "2nd Place 🏆",
    label: "USCxLovable Hackathon",
    copy: "Our team placed second after building a fast prototype around creative problem-solving.",
    href: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7394497644485611522",
    className: "border-blue-200 bg-gradient-to-br from-blue-50 to-green-50 text-blue-950",
    ctaClassName: "text-blue-700",
  },
  {
    title: "Deep Learning @ USC 🤖",
    label: "Class project",
    copy: "Finished one of USC's hardest classes with project results that beat the baseline.",
    href: "https://www.linkedin.com/feed/update/urn:li:share:7401518971881156608",
    className: "border-green-200 bg-gradient-to-br from-green-50 to-blue-50 text-green-950",
    ctaClassName: "text-green-700",
  },
]

const MOBILE_WORK = [
  {
    company: "Adobe",
    role: "Software Engineering Intern",
    date: "Summer 2026",
    logo: "/adobe-logo.svg",
    logoAlt: "Adobe Logo",
    className: "bg-red-50 text-red-950",
  },
  {
    company: "Capgemini Engineering",
    role: "Software Engineer",
    date: "June 2025 - April 2026",
    logo: "/capgeminilogo.png",
    logoAlt: "Capgemini Engineering Logo",
    className: "bg-sky-50 text-sky-950",
  },
  {
    company: "CollegeROI",
    role: "Software Engineer Intern",
    date: "February 2025 - June 2025",
    logo: "/croilogo.jpeg",
    logoAlt: "CollegeROI Logo",
    className: "bg-sky-50 text-sky-950",
  },
  {
    company: "Capgemini",
    role: "Software Engineer Intern",
    date: "June 2024 - August 2024",
    logo: "/capgeminilogo.png",
    logoAlt: "Capgemini Logo",
    className: "bg-sky-50 text-sky-950",
  },
]

const MOBILE_PUBLICATIONS = [
  {
    title: "Predicting Ruff Behaviors",
    href: "https://github.com/RedaB2/accelerometer-analysis-ruffs-behaviors",
    image: "/poster_presentation.jpeg",
    alt: "Ruff Behaviors Analysis",
  },
  {
    title: "Fluid mechanics research in Japan",
    href: "https://digital.wpi.edu/concern/student_works/v405sf79n?locale=en",
    image: "/peltongpt.png",
    alt: "Pelton turbine optimization paper thumbnail",
  },
  {
    title: "AI Standards with ANSI",
    href: "https://www.ansi.org/standards-news/all-news/2023/12/12-18-23-university-students-explore-ais-potential-impact-on-the-workforce",
    image: "/ANSIarticle.jpeg",
    alt: "ANSI article thumbnail",
  },
]

const MOBILE_NAV: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "#top", label: "Home", icon: HomeIcon },
  { href: "#achievements", label: "Achievements", icon: TrophyIcon },
  { href: "#work", label: "Work", icon: BriefcaseIcon },
  { href: "#latest-video", label: "Video", icon: PlayCircleIcon },
]

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)")
    const updateViewport = () => setIsMobile(mediaQuery.matches)

    updateViewport()
    mediaQuery.addEventListener("change", updateViewport)

    return () => mediaQuery.removeEventListener("change", updateViewport)
  }, [])

  if (isMobile === null) {
    return <div className="min-h-svh bg-[#f5f7f2]" />
  }

  return isMobile ? <MobilePortfolioApp /> : <DesktopPortfolio />
}

function MobilePortfolioApp() {
  return (
    <main className="min-h-svh bg-[#f5f7f2] pb-28 text-slate-950" id="top">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-[#f5f7f2]/90 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
              <span className="text-xl">🦁</span>
            </span>
            Reda's World
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/projects"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm"
            >
              Projects
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(COMMAND_CENTER_EVENT))}
              aria-label="Open command center"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white shadow-sm"
            >
              <MenuIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-md flex-col gap-5 px-4 pt-4">
        <section className="pt-1" aria-labelledby="mobile-intro-title">
          <h1 className="mb-3 min-h-20 text-center text-3xl font-bold leading-tight">
            <TypingAnimation phrases={["👋 Bonjour, I'm Reda.", "🧑‍💻 I'm a Software Engineer.", "🎮 I'm a Gamer.", "🤖 AI enthusiast.", "🏃 I'm a runner."]} />
          </h1>

          <div className="flex items-start gap-4">
            <div className="min-w-0 flex-1">
              <h2 id="mobile-intro-title" className="mb-3 inline-block border-b-2 border-green-500 pb-2 text-2xl font-bold">
                Reda Boutayeb
              </h2>
              <p className="text-[15px] leading-6 text-slate-800">
                Master's student at University of Southern California with a focus on AI. I'm pretty good at ping-pong and I can run 5 kilometers in 23 minutes. Twitch Partner.
              </p>
            </div>
            <div className="relative mt-1 h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-gray-200">
              <Image
                src="/profilepicture3.jpeg"
                alt="Profile picture of Reda at a 5K run"
                fill
                sizes="96px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-600">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(COMMAND_CENTER_EVENT))}
              className="rounded-full border border-green-200 bg-green-50 px-3 py-1 font-medium text-green-700 transition-all duration-300 hover:border-green-300 hover:bg-green-100"
            >
              Command Center
            </button>
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1">Press ⌘K / Ctrl+K</span>
          </div>
        </section>

        <section className="grid gap-3" aria-label="Live profile widgets">
          <MusicPreviewInline className="[&>div]:rounded-lg" />
          <StravaRunningInline className="mb-0" />
        </section>

        <section id="about" className="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <UserRoundIcon className="h-4 w-4 text-green-700" />
            <h2 className="text-lg font-bold">About Me</h2>
          </div>
          <p className="text-sm leading-6 text-slate-700">
            Hi, I'm Reda! I enjoy building software with a purpose. I'm not trying to change the world, but solve a couple problems. Coding isn't everything, I love sports (soccer, basketball, running, pickleball, and 100 more), video games (League of Legends, FIFA, Assassin's Creed, and 100 more) and spending time with my family.
          </p>
        </section>

        <section id="achievements" className="scroll-mt-24">
          <SectionHeading icon={SparklesIcon} title="Achievements" />
          <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex snap-x gap-3">
              {MOBILE_ACHIEVEMENTS.map((achievement) => (
                <Link
                  key={achievement.href}
                  href={achievement.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`min-w-[82vw] max-w-[20rem] snap-center rounded-lg border p-4 shadow-sm ${achievement.className}`}
                >
                  <p className="text-xs font-semibold uppercase opacity-70">
                    {achievement.label}
                  </p>
                  <h3 className="mt-2 text-xl font-black leading-tight">{achievement.title}</h3>
                  <p className="mt-3 text-sm leading-6 opacity-80">{achievement.copy}</p>
                  <span className={`mt-4 flex items-center gap-1 text-sm font-bold ${achievement.ctaClassName}`}>
                    Open update
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="latest-video" className="scroll-mt-24">
          <div className="overflow-hidden rounded-lg border border-green-200 bg-white shadow-sm">
            <div className="aspect-video bg-slate-100">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/o26RSEnEgBs"
                title="Latest YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-black">hello <del>world</del> youtube</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                A glimpse into life beyond the desk, video games, and code.
              </p>
              <Link
                href="https://www.youtube.com/watch?v=o26RSEnEgBs"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white"
              >
                <Youtube className="h-4 w-4" />
                Watch
              </Link>
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-24">
          <SectionHeading icon={BriefcaseIcon} title="Work Experience" />
          <div className="grid gap-2">
            {MOBILE_WORK.map((job) => (
              <article key={`${job.company}-${job.date}`} className={`rounded-lg border border-slate-200 p-3 shadow-sm ${job.className}`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/70 bg-white">
                    <Image src={job.logo} alt={job.logoAlt} width={44} height={44} className="h-full w-full object-contain" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-black">{job.company}</h3>
                    <p className="truncate text-sm opacity-80">{job.role}</p>
                    <p className="mt-1 text-xs opacity-60">{job.date}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="publications" className="scroll-mt-24">
          <SectionHeading icon={FileTextIcon} title="Latest Publications & Articles" />
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            {MOBILE_PUBLICATIONS.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 p-3 ${index === 0 ? "" : "border-t border-slate-100"}`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={72}
                  height={56}
                  className="h-14 w-[72px] rounded-md object-cover"
                />
                <span className="min-w-0 flex-1 text-sm font-semibold leading-5">{item.title}</span>
                <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-slate-400" />
              </Link>
            ))}
          </div>
        </section>

        <SiteFooter />
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 backdrop-blur">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
          {MOBILE_NAV.map(({ href, label, icon: Icon }) => (
            <a key={href} href={href} className="flex flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-slate-600">
              <Icon className="h-5 w-5" />
              {label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(COMMAND_CENTER_EVENT))}
            className="flex flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-slate-600"
          >
            <MenuIcon className="h-5 w-5" />
            More
          </button>
        </div>
      </nav>
    </main>
  )
}

function SectionHeading({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-800">
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="text-lg font-black">{title}</h2>
      </div>
    </div>
  )
}

function DesktopPortfolio() {
  const [api, setApi] = useState<CarouselApi>()
  const [carouselHeight, setCarouselHeight] = useState<number>(0)

  useEffect(() => {
    if (!api) {
      return
    }

    const updateHeight = () => {
      const slideNodes = api.slideNodes()
      const currentSlide = slideNodes[api.selectedScrollSnap()]
      if (currentSlide) {
        setCarouselHeight(currentSlide.offsetHeight)
      }
    }

    updateHeight()
    api.on("select", updateHeight)
    api.on("reInit", updateHeight)

    const handleResize = () => updateHeight()
    window.addEventListener("resize", handleResize)

    return () => {
      api.off("select", updateHeight)
      api.off("reInit", updateHeight)
      window.removeEventListener("resize", handleResize)
    }
  }, [api])

  return (
    <>
      <MusicPreviewRail />
      <StravaRunningRail />
      <div className="mx-auto max-w-3xl px-4 py-4" id="top">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
              <span className="text-2xl text-white">🦁</span>
            </div>
          </div>
          <nav className="flex gap-4">
            <Link href="/projects" className="hover:underline">
              Projects
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <h1 className="mb-2 text-center text-3xl font-bold">
              <TypingAnimation phrases={["👋 Bonjour, I'm Reda.", "🧑‍💻 I'm a Software Engineer.", "🎮 I'm a Gamer.", "🤖 AI enthusiast.", "🏃 I'm a runner."]} />
            </h1>
            <h1 className="mb-4 inline-block border-b-2 border-green-500 pb-2 text-2xl font-bold">Reda Boutayeb</h1>
            <p className="mb-4">Master's student at University of Southern California with a focus on AI. I'm pretty good at ping-pong and I can run 5 kilometers in 23 minutes. Twitch Partner.</p>
          </div>
          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-gray-200">
            <Image
              src="/profilepicture3.jpeg"
              alt="Profile picture of Reda at a 5K run"
              width={112}
              height={112}
              className="object-cover"
            />
          </div>
        </div>
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-600">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(COMMAND_CENTER_EVENT))}
            className="rounded-full border border-green-200 bg-green-50 px-3 py-1 font-medium text-green-700 transition-all duration-300 hover:border-green-300 hover:bg-green-100"
          >
            Command Center
          </button>
          <span className="rounded-full border border-gray-200 px-3 py-1">Press ⌘K / Ctrl+K</span>
        </div>
        <StravaRunningInline />

        {/* About Me */}
        <section className="mb-6" id="about">
          <h2 className="mb-2 inline-block border-b border-green-500 pb-1 text-xl font-bold">About Me</h2>
          <p className="mb-2 text-sm">
            Hi, I'm Reda! I enjoy building software with a purpose. I'm not trying to change the world, but solve a couple problems. Coding isn't everything, I love sports (soccer, basketball, running, pickleball, and 100 more), video games (League of Legends, FIFA, Assassin's Creed, and 100 more) and spending time with my family.
          </p>
        </section>

        {/* Achievements Carousel */}
        <section className="mb-8" id="achievements">
          <Carousel opts={{ loop: true }} setApi={setApi} className="w-full">
            <div
              style={{
                height: carouselHeight > 0 ? `${carouselHeight}px` : "auto",
                transition: "height 0.3s ease-in-out",
                overflow: "hidden",
              }}
            >
              <CarouselContent className="items-start">
                {/* Achievement 1: Adobe SWE Internship */}
                <CarouselItem>
                  <div className="h-full rounded-lg border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-blue-50 p-4">
                    <div className="flex flex-col items-center gap-4 md:flex-row">
                      <div className="flex-1">
                        <h2 className="mb-2 text-xl font-bold">summer 2026 ☀️</h2>
                        <p className="mb-3 text-sm">
                          Spending the summer at Adobe, building things I care about, learning from really smart people,
                          and enjoying life!
                        </p>
                      </div>
                      <div className="w-full overflow-hidden rounded-lg shadow-lg md:w-auto">
                        <iframe
                          src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7460358217160884226?collapsed=1"
                          height="634"
                          width="504"
                          frameBorder="0"
                          allowFullScreen
                          title="Adobe Software Engineering Internship LinkedIn Post"
                          className="max-w-full"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Achievement 2: USCxLovable Hackathon */}
                <CarouselItem>
                  <div className="h-full rounded-lg border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-green-50 p-4">
                    <div className="flex flex-col items-center gap-4 md:flex-row">
                      <div className="flex-1">
                        <h2 className="mb-2 text-xl font-bold">🏆 2nd Place - USCxLovable Hackathon</h2>
                        <p className="mb-3 text-sm">
                          Excited to share that our team secured 2nd place at the USCxLovable hackathon!
                          We built an innovative solution that showcased the power of rapid prototyping and creative problem-solving.
                        </p>
                      </div>
                      <div className="w-full overflow-hidden rounded-lg shadow-lg md:w-auto">
                        <iframe
                          src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7394497644485611522?compact=1"
                          height="399"
                          width="504"
                          frameBorder="0"
                          allowFullScreen
                          title="USCxLovable Hackathon Achievement"
                          className="max-w-full"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Achievement 3: USC Class Project */}
                <CarouselItem>
                  <div className="h-full rounded-lg border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-blue-50 p-4">
                    <div className="flex flex-col items-center gap-4 md:flex-row">
                      <div className="flex-1">
                        <h2 className="mb-2 text-xl font-bold">🎓 Deep Learning @ USC 🤖</h2>
                        <p className="mb-3 text-sm">
                          Just finished one of the hardest classes at USC! Our project results outperformed the baseline from an established research project about birds.
                          Proud of us! 🤗
                        </p>
                      </div>
                      <div className="w-full overflow-hidden rounded-lg shadow-lg md:w-auto">
                        <iframe
                          src="https://www.linkedin.com/embed/feed/update/urn:li:share:7401518971881156608?collapsed=1"
                          height="634"
                          width="504"
                          frameBorder="0"
                          allowFullScreen
                          title="USC Class Project Achievement"
                          className="max-w-full"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </div>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Latest Video Highlight */}
        <section className="mb-8 rounded-lg border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-blue-50 p-4" id="latest-video">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="flex-1">
              <h2 className="mb-2 text-xl font-bold">📹 hello <del>world</del> youtube</h2>
              <p className="mb-3 text-sm">I don't just sit at my desk, play video games and write some code. So, here it is, a glimpse into my life.</p>
              <div className="flex items-center gap-2">
                <Link href="https://www.youtube.com/watch?v=o26RSEnEgBs" className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1 text-sm text-white transition-all duration-300 hover:bg-red-700">
                  <Youtube size={16} />
                  Subscribe
                </Link>
              </div>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg md:w-1/2">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/o26RSEnEgBs"
                title="Latest YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section className="mb-6" id="work">
          <h2 className="mb-3 inline-block border-b border-green-500 pb-1 text-xl font-bold">Work Experience</h2>

          <div className="relative ml-4 border-l-2 border-gray-200 pl-6">
            {/* Adobe */}
            <div className="relative mb-6">
              <div className="absolute -left-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-gray-200 bg-white">
                <Image
                  src="/adobe-logo.svg"
                  alt="Adobe Logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-red-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-lg font-bold">Adobe</h3>
                <p className="text-sm text-red-700">Software Engineering Intern 🧑‍💻</p>
                <p className="mt-2 text-sm">
                  Incoming on the DX Team for A2A, customer workflow and experience improvement.
                </p>
                <p className="mt-2 text-xs">Summer 2026</p>
              </div>
            </div>

            {/* Capgemini Engineering */}
            <div className="relative mb-6">
              <div className="absolute -left-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-gray-200 bg-white">
                <Image
                  src="/capgeminilogo.png"
                  alt="Capgemini Engineering Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="rounded-lg bg-sky-100 p-4 text-sky-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-lg font-bold">Capgemini Engineering</h3>
                <p className="text-sm text-sky-700">Software Engineer 🧑‍💻</p>
                <p className="mt-2 text-sm">
                  Building AI Agents and full stack applications for Healthcare companies. Streamlining healthcare operations. Also, on the side, diving
                  into GPU programming with CUDA!! 🏥⚡
                </p>
                <p className="mt-2 text-xs">June 2025 - April 2026</p>
              </div>
            </div>

            {/* CROI 1 */}
            <div className="relative mb-6">
              <div className="absolute -left-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-gray-200 bg-white">
                <Image
                  src="/croilogo.jpeg"
                  alt="Croi Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="rounded-lg bg-sky-100 p-4 text-sky-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-lg font-bold">CollegeROI</h3>
                <p className="text-sm text-sky-700">Software Engineer Intern 🧑‍💻</p>
                <p className="mt-2 text-sm">
                  I'm overseeing all backend services of the CollegeROI platform. Recently, I helped by building a new search engine that helps go through colleges with specific criteries (distance, cost, size, and more). Very fun work and it's helping students out there making one of the most important decision of their lives: college. ✌️ <br />
                  <a href="https://www.yourcollegeroi.com/" className="text-blue-500 hover:underline">https://www.yourcollegeroi.com/</a>
                </p>
                <p className="mt-2 text-xs">February 2025 - June 2025</p>
              </div>
            </div>

            {/* Capgemini */}
            <div className="relative mb-6">
              <div className="absolute -left-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-gray-200 bg-white">
                <Image
                  src="/capgeminilogo.png"
                  alt="Cap Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="rounded-lg bg-sky-100 p-4 text-sky-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-lg font-bold">Capgemini</h3>
                <p className="text-sm text-sky-700">Software Engineer Intern 🧑‍💻</p>
                <p className="mt-2 text-sm">
                  Collaborated closely with a leading global mass media and entertainment conglomerate
                  to develop a service that simplifies licensing and rights management for theaters seeking to screen films.
                  Gained a lot of exposure to new technologies such as SpringBoot and RestAPIs. On top of that, I learned about the media industry and how things work in Hollywood! 🎥
                </p>
                <p className="mt-2 text-xs">June 2024 - August 2024</p>
              </div>
            </div>

            {/* Schneider Electric */}
            <div className="relative">
              <div className="absolute -left-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-gray-200 bg-white">
                <Image
                  src="/selogo.png"
                  alt="SE Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="rounded-lg bg-sky-100 p-4 text-sky-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-lg font-bold">Schneider Electric</h3>
                <p className="text-sm text-sky-700">Software Automation Intern 🧑‍💻</p>
                <p className="mt-2 text-sm">
                  Oversaw two different projects simultaneously. The first one was an internal tool to sort through lists of
                  corporate assets and detect prohibited software. After that, I improved the tool to send email notifications
                  to users with prohibited software with instructions on how to delete the software. 🔒
                  The second project was an internal tool to help the next wave of interns by assigning a mentor.
                  I engineered a fun questionnaire and using a point system and a matching algorithm, interns would be matched and pairs would be created. 👩‍❤️‍👨
                </p>
                <p className="mt-2 text-xs">June 2023 - June 2024</p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Publications & Articles */}
        <section className="mb-6" id="publications">
          <div id="projects" />
          <h2 className="mb-3 inline-block border-b border-green-500 pb-1 text-xl font-bold">Latest Publications & Articles</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Link href="https://github.com/RedaB2/accelerometer-analysis-ruffs-behaviors" className="block">
              <div className="cursor-pointer rounded-lg bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src="/poster_presentation.jpeg?height=200&width=400"
                  alt="Ruff Behaviors Analysis"
                  width={300}
                  height={150}
                  className="mb-2 h-32 w-full rounded-lg object-cover"
                />
                <h3 className="text-sm font-medium">Predicting Ruff Behaviors 🦃</h3>
              </div>
            </Link>
            <Link href="https://digital.wpi.edu/concern/student_works/v405sf79n?locale=en" className="block">
              <div className="cursor-pointer rounded-lg bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src="/peltongpt.png"
                  alt="Pelton turbine optimization paper thumbnail"
                  width={300}
                  height={150}
                  className="mb-2 h-32 w-full rounded-lg object-cover"
                />
                <h3 className="text-sm font-medium">How I streamlined fluid mechanics research in Japan! 🇯🇵</h3>
              </div>
            </Link>
            <Link href="https://www.ansi.org/standards-news/all-news/2023/12/12-18-23-university-students-explore-ais-potential-impact-on-the-workforce" className="block">
              <div className="cursor-pointer rounded-lg bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src="/ANSIarticle.jpeg"
                  alt="ansithumbnail"
                  width={300}
                  height={150}
                  className="mb-2 h-32 w-full rounded-lg object-cover object-top"
                />
                <h3 className="text-sm font-medium">Worked with ANSI on AI Standards! ✌️ </h3>
              </div>
            </Link>
            <Link href="https://digital.wpi.edu/concern/student_works/zc77sv23v?locale=en" className="block">
              <div className="cursor-pointer rounded-lg bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src="/paperpreview.png"
                  alt="paperthumbnail"
                  width={300}
                  height={150}
                  className="mb-2 h-32 w-full rounded-lg object-cover"
                />
                <h3 className="text-sm font-medium">Read my first research paper! 📚</h3>
              </div>
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  )
}
