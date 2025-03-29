import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { TypingAnimation } from "@/components/typing-animation"

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
            <span className="text-white text-2xl">🦁</span>
          </div>
        </div>
        <nav className="flex gap-4">
          <Link href="/projects" className="hover:underline">
            Projects
          </Link>
          <Link href="https://drive.google.com/file/d/17wnLKtC-bjAZQllFZCmm1y5qYDUmPw5K/view?usp=sharing" className="hover:underline">
            Resume
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 text-center">
            <TypingAnimation phrases={["👋 Bonjour, I'm Reda.", "🧑‍💻 I'm a Software Engineer.", "🎮 I'm a Gamer.", "🤖 AI enthusiast.", "🏃 I'm a runner."]} />
          </h1>
          <h1 className="text-2xl font-bold mb-4 border-b-2 border-green-500 pb-2 inline-block">Reda Boutayeb</h1>
          <p className="mb-4">Incoming Master's student at University of Southern California with a focus on AI. Senior at Worcester Polytechnic Institute studying Computer Science and Data Science. I can run 5 kilometers in 21 minutes. Twitch Partner.</p>
        </div>
        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200 shrink-0">
          <Image
            src="/profilepicture3.jpeg"
            alt="Profile picture of Reda at a 5K run"
            width={112}
            height={112}
            className="object-cover"
          />
        </div>
      </div>

      {/* About Me */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2 border-b border-green-500 pb-1 inline-block">About Me</h2>
        <p className="text-sm mb-2">
          Hi, I'm Reda! I enjoy building software with a purpose. I'm not trying to change the world, but solve a couple problems. Coding isn't everything, I love sports (soccer, basketball, running, pickleball, and 100 more), video games (League of Legends, FIFA, Assassin's Creed, and 100 more) and spending time with my family.
        </p>
      </section>

      {/* Work Experience */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3 border-b border-green-500 pb-1 inline-block">Work Experience</h2>

        <div className="relative border-l-2 border-gray-200 pl-6 ml-4">
          {/* CROI 1 */}
          <div className="mb-6 relative">
            <div className="absolute -left-10 w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-gray-200">
              <Image
                src="/croilogo.jpeg"
                alt="Croi Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="bg-sky-100 text-sky-900 p-4 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-lg font-bold">CollegeROI</h3>
              <p className="text-sky-700 text-sm">Software Engineer 🧑‍💻</p>
              <p className="mt-2 text-sm">
                I'm overseeing all backend services of the CollegeROI platform. Recently, I helped by building a new search engine that helps go through colleges with specific criteries (distance, cost, size, and more). Very fun work and it's helping students out there making one of the most important decision of their lives: college. ✌️ 
              </p>
              <p className="mt-2 text-xs">February 2025</p>
            </div>
          </div>

          {/* Capgemini */}
          <div className="mb-6 relative">
            <div className="absolute -left-10 w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-gray-200">
              <Image
                src="/capgeminilogo.png"
                alt="Cap Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="bg-sky-100 text-sky-900 p-4 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-lg font-bold">Capgemini</h3>
              <p className="text-sky-700 text-sm">Software Engineering Intern 🧑‍💻</p>
              <p className="mt-2 text-sm">
              Collaborated closely with a leading global mass media and entertainment conglomerate 
              to develop a service that simplifies licensing and rights management for theaters seeking to screen films.
              Gained a lot of exposure to new technologies such as SpringBoot and RestAPIs. On top of that, I learned about the media industry and how things work in Holywood! 🎥
              </p>
              <p className="mt-2 text-xs">June 2024 - August 2024</p>
            </div>
          </div>

          {/* Schneider Electric */}
          <div className="relative">
            <div className="absolute -left-10 w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-gray-200">
              <Image
                src="/selogo.png"
                alt="SE Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="bg-sky-100 text-sky-900 p-4 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-lg font-bold">Schneider Electric</h3>
              <p className="text-sky-700 text-sm">Cybersecurity Automation Engineer 🧑‍💻</p>
              <p className="mt-2 text-sm">
                Oversaw two different projects simultaneously. The first one was an internal tool to sort through lists of 
                corporate assets and detect prohibited software. After that, I improved the tool to send email notifications
                to users with prohibited software with instructions on how to delete the software. 🔒
                The second project was an internal tool to help the next wave of interns by assigning a mentor. 
                I engineered a fun questionnaire and using a point system and a matching algorithm, interns would be matched and pairs would be created. 👩‍❤️‍👨
              </p>
              <p className="mt-2 text-xs">June 2023 - March 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Publications & Articles */}
      <section className="mb-6" id="projects">
        <h2 className="text-xl font-bold mb-3 border-b border-green-500 pb-1 inline-block">Latest Publications & Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="https://www.ansi.org/standards-news/all-news/2023/12/12-18-23-university-students-explore-ais-potential-impact-on-the-workforce" className="block">
            <div className="p-3 rounded-lg bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <Image
                src="/ANSIarticle.jpeg"
                alt="ansithumbnail"
                width={300}
                height={150}
                className="w-full h-32 object-cover object-top rounded-lg mb-2"
              />
              <h3 className="font-medium text-sm">Worked with ANSI on AI Standards! ✌️ </h3>
            </div>
          </Link>
          <Link href="https://digital.wpi.edu/concern/student_works/zc77sv23v?locale=en" className="block">
            <div className="p-3 rounded-lg bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <Image
                src="/paperpreview.png"
                alt="paperthumbnail"
                width={300}
                height={150}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h3 className="font-medium text-sm">Read my first research paper! 📚</h3>
            </div>
          </Link>
        </div>
      </section>

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
      <p className="text-center text-gray-400 text-sm mt-2">Last updated: 3/25/2025</p>
    </div>
  )
}