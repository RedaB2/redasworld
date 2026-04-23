export type ProjectMedia =
  | {
      type: "image"
      src: string
      alt: string
      fit?: "cover" | "contain"
      framed?: boolean
    }
  | {
      type: "video"
      video: "pelton-gpt" | "shape-of-ai" | "alpha-lasker"
    }

export type Project = {
  title: string
  href: string
  description: string
  detail?: string
  media: ProjectMedia
}

export const PROJECTS: Project[] = [
  {
    title: "Mandarin",
    href: "https://github.com/RedaB2/mandarin",
    description:
      "Context management tool for LLM discussion and chatting, built through open-source contributions.",
    detail: "Keeps long AI conversations organized",
    media: {
      type: "image",
      src: "/mandarin-logo.png?height=200&width=400",
      alt: "Mandarin logo",
      fit: "contain",
      framed: true,
    },
  },
  {
    title: "Predicting Ruff Behaviors 🦃",
    href: "https://github.com/RedaB2/accelerometer-analysis-ruffs-behaviors",
    description:
      "Deep Learning class survived & our project outperformed published research 🤗",
    media: {
      type: "image",
      src: "/poster_presentation.jpeg?height=200&width=400",
      alt: "Ruff Behaviors Analysis",
    },
  },
  {
    title: "WhyDate?",
    href: "https://github.com/RedaB2/whydateios",
    description: "Fun & original iOS dating app created for students at WPI.",
    detail: "40+ Testflight downloads (mostly friends & family 💀)",
    media: {
      type: "image",
      src: "/whydate.png?height=200&width=400",
      alt: "WhyDate app screenshot",
    },
  },
  {
    title: "Brigham and Women's Hospital",
    href: "https://github.com/RedaB2/BrighamWomenKiosk",
    description:
      "Web app to be used by patients & staff at Brigham and Women's Hospital. Packed with cool features like pathfinding in the hospital and flower ordering.",
    detail: "2nd Place @ CS3733",
    media: {
      type: "image",
      src: "/kioskdemo.png?height=200&width=400",
      alt: "Kiosk demo",
    },
  },
  {
    title: "PeltonGPT",
    href: "https://github.com/RedaB2/PeltonGPT",
    description:
      "LLM powered research assistant for Professor Ono's research lab on fluid dynamics at Shibaura Institute of Technology.",
    detail: "Improved research efficiency by 45%",
    media: {
      type: "video",
      video: "pelton-gpt",
    },
  },
  {
    title: "Shape of AI",
    href: "https://redab2.github.io/final/",
    description:
      "Web app to help visualize AI models with human knowledge. Inspired by Yann LeCun's talk at the Summit 2025.",
    detail: "Is a 4 year old child smarter than ChatGPT?",
    media: {
      type: "video",
      video: "shape-of-ai",
    },
  },
  {
    title: "AlphaLasker",
    href: "https://github.com/RedaB2/AlphaLasker",
    description:
      "A Lasker Morris player powered by Gemini API. Smart decision making, fast response time and fallback on hardcoded algorithm if API fails.",
    detail: "Can you beat it at Lasker Morris?",
    media: {
      type: "video",
      video: "alpha-lasker",
    },
  },
  {
    title: "SystemLoggerV1",
    href: "https://github.com/RedaB2/systemloggerv1",
    description: "Lightweight C++ system logger for embedded Linux devices 💡",
    detail: "Great way to learn C++ and Linux",
    media: {
      type: "image",
      src: "/systemloggerv1.png?height=200&width=400",
      alt: "SystemLoggerV1 screenshot",
      fit: "contain",
      framed: true,
    },
  },
]
