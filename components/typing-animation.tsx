"use client"

import { useEffect, useState } from "react"

interface TypingAnimationProps {
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenPhrases?: number
}

export function TypingAnimation({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenPhrases = 1000,
}: TypingAnimationProps) {
  const [text, setText] = useState("")
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]

    const timeout = setTimeout(
      () => {
        if (isWaiting) {
          setIsWaiting(false)
          setIsDeleting(true)
          return
        }

        if (isDeleting) {
          setText(currentPhrase.substring(0, text.length - 1))

          if (text.length === 1) {
            setIsDeleting(false)
            setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
          }
        } else {
          setText(currentPhrase.substring(0, text.length + 1))

          if (text.length === currentPhrase.length) {
            setIsWaiting(true)
          }
        }
      },
      isWaiting ? delayBetweenPhrases : isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [text, phraseIndex, isDeleting, isWaiting, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases])

  return (
    <div className="inline-block">
      <span>{text}</span>
      <span className="animate-pulse">|</span>
    </div>
  )
}

