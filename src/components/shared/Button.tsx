"use client"

import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"
import { forwardRef, useRef, useState, MouseEvent } from "react"

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  magnetic?: boolean
  children: React.ReactNode
}

const variants = {
  primary: "bg-[#FD3434] text-white hover:bg-[#e02e2e] border-transparent",
  secondary: "bg-[#E6E1C3] text-[#1E1E1E] hover:bg-[#d4cfb3] border-transparent",
  outline: "bg-transparent text-white border-white/20 hover:border-white/40 hover:bg-white/5",
  ghost: "bg-transparent text-white hover:bg-white/10 border-transparent"
}

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", magnetic = false, children, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !buttonRef.current) return

      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      setPosition({ x: x * 0.3, y: y * 0.3 })
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    return (
      <motion.button
        ref={buttonRef}
        className={cn(
          "relative inline-flex items-center justify-center font-medium rounded-full border transition-colors duration-300",
          variants[variant],
          sizes[size],
          className
        )}
        animate={magnetic ? { x: position.x, y: position.y } : {}}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = "Button"

// Link estilizado como botão
interface ButtonLinkProps {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  href?: string
  target?: string
  rel?: string
  className?: string
}

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  children,
  href,
  target,
  rel
}: ButtonLinkProps) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "relative inline-flex items-center justify-center font-medium rounded-full border transition-colors duration-300 cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  )
}
