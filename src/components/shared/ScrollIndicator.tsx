"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollIndicatorProps {
  className?: string
  variant?: "mouse" | "arrow" | "text"
}

export function ScrollIndicator({ className, variant = "mouse" }: ScrollIndicatorProps) {
  if (variant === "arrow") {
    return (
      <motion.div
        className={cn("flex flex-col items-center gap-2", className)}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col gap-1"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white/60"
          >
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    )
  }

  if (variant === "text") {
    return (
      <motion.div
        className={cn("flex flex-col items-center gap-4", className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-white/40 rotate-90 origin-center">
          Scroll
        </span>
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    )
  }

  // Mouse variant (default)
  return (
    <motion.div
      className={cn("flex flex-col items-center gap-4", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
        <motion.div
          className="w-1 h-2 bg-white/60 rounded-full"
          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      <span className="text-xs uppercase tracking-[0.2em] text-white/40">
        Scroll
      </span>
    </motion.div>
  )
}
