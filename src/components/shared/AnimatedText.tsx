"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  animation?: "reveal" | "fade" | "slide" | "words"
}

export function AnimatedText({
  text,
  className,
  once = true,
  delay = 0,
  as: Tag = "p",
  animation = "reveal"
}: AnimatedTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px" })

  if (animation === "words") {
    const words = text.split(" ")
    return (
      <Tag ref={ref} className={cn("overflow-hidden", className)}>
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
              className="inline-block"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{
                duration: 0.5,
                delay: delay + index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    )
  }

  if (animation === "reveal") {
    return (
      <div ref={ref} className="overflow-hidden">
        <motion.div
          initial={{ y: "100%" }}
          animate={isInView ? { y: 0 } : { y: "100%" }}
          transition={{
            duration: 0.8,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <Tag className={className}>{text}</Tag>
        </motion.div>
      </div>
    )
  }

  if (animation === "fade") {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        <Tag className={className}>{text}</Tag>
      </motion.div>
    )
  }

  // slide
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <Tag className={className}>{text}</Tag>
    </motion.div>
  )
}

// Componente para caracteres individuais (para efeitos mais dramáticos)
interface AnimatedCharactersProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
}

export function AnimatedCharacters({
  text,
  className,
  once = true,
  delay = 0,
  as: Tag = "p"
}: AnimatedCharactersProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px" })
  const characters = text.split("")

  return (
    <Tag ref={ref} className={cn("overflow-hidden", className)}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{
            duration: 0.4,
            delay: delay + index * 0.03,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  )
}
