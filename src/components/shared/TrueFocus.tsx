"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface TrueFocusProps {
  sentence?: string
  separator?: string
  manualMode?: boolean
  blurAmount?: number
  borderColor?: string
  glowColor?: string
  animationDuration?: number
  pauseBetweenAnimations?: number
  className?: string
  textClassName?: string
}

export function TrueFocus({
  sentence = "True Focus",
  separator = " ",
  manualMode = false,
  blurAmount = 5,
  borderColor = "green",
  glowColor = "rgba(0, 255, 0, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className,
  textClassName
}: TrueFocusProps) {
  const words = sentence.split(separator)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 })

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex((prev) => (prev + 1) % words.length)
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      )

      return () => clearInterval(interval)
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length])

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return

    if (!wordRefs.current[currentIndex] || !containerRef.current) return

    const parentRect = containerRef.current.getBoundingClientRect()
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect()

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    })
  }, [currentIndex, words.length])

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index)
      setCurrentIndex(index)
    }
  }

  const handleMouseLeave = () => {
    if (manualMode && lastActiveIndex !== null) {
      setCurrentIndex(lastActiveIndex)
    }
  }

  return (
    <div
      className={cn(
        "relative flex gap-[0.3em] justify-center items-center flex-wrap outline-none select-none",
        className
      )}
      ref={containerRef}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex
        return (
          <span
            key={index}
            ref={(el) => {
              wordRefs.current[index] = el
            }}
            className={cn(
              "relative cursor-pointer transition-all outline-none select-none",
              textClassName
            )}
            style={{
              filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
              transition: `filter ${animationDuration}s ease`
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        )
      })}

      <motion.div
        className="absolute top-0 left-0 pointer-events-none box-content border-none"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0
        }}
        transition={{
          duration: animationDuration
        }}
      >
        {/* Top Left Corner */}
        <span
          className="absolute w-4 h-4 rounded-[3px] border-t-[3px] border-l-[3px]"
          style={{
            top: "-10px",
            left: "-10px",
            borderColor: borderColor,
            filter: `drop-shadow(0px 0px 4px ${glowColor})`
          }}
        />
        {/* Top Right Corner */}
        <span
          className="absolute w-4 h-4 rounded-[3px] border-t-[3px] border-r-[3px]"
          style={{
            top: "-10px",
            right: "-10px",
            borderColor: borderColor,
            filter: `drop-shadow(0px 0px 4px ${glowColor})`
          }}
        />
        {/* Bottom Left Corner */}
        <span
          className="absolute w-4 h-4 rounded-[3px] border-b-[3px] border-l-[3px]"
          style={{
            bottom: "-10px",
            left: "-10px",
            borderColor: borderColor,
            filter: `drop-shadow(0px 0px 4px ${glowColor})`
          }}
        />
        {/* Bottom Right Corner */}
        <span
          className="absolute w-4 h-4 rounded-[3px] border-b-[3px] border-r-[3px]"
          style={{
            bottom: "-10px",
            right: "-10px",
            borderColor: borderColor,
            filter: `drop-shadow(0px 0px 4px ${glowColor})`
          }}
        />
      </motion.div>
    </div>
  )
}
