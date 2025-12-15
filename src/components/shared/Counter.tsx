"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CounterProps {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
  once?: boolean
  label?: string
}

export function Counter({
  end,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
  once = true,
  label
}: CounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)

      // Easing function (ease out cubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easeOutCubic * end)

      setCount(currentCount)

      if (now < endTime) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, end, duration])

  return (
    <motion.div
      ref={ref}
      className={cn("flex flex-col", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <span className="text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums">
        {prefix}{count.toLocaleString('pt-BR')}{suffix}
      </span>
      {label && (
        <span className="text-sm md:text-base text-gray-400 mt-2 uppercase tracking-wider">
          {label}
        </span>
      )}
    </motion.div>
  )
}

// Versão compacta para uso inline
interface InlineCounterProps {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function InlineCounter({
  end,
  prefix = "",
  suffix = "",
  duration = 2,
  className
}: InlineCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easeOutCubic * end)

      setCount(currentCount)

      if (now < endTime) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, end, duration])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}{count.toLocaleString('pt-BR')}{suffix}
    </span>
  )
}
