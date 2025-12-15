"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface TickerProps {
  children: ReactNode
  className?: string
  speed?: "slow" | "normal" | "fast"
  direction?: "left" | "right"
  pauseOnHover?: boolean
}

const speedMap = {
  slow: "40s",
  normal: "30s",
  fast: "20s"
}

export function Ticker({
  children,
  className,
  speed = "normal",
  direction = "left",
  pauseOnHover = true
}: TickerProps) {
  const animationDirection = direction === "left" ? "normal" : "reverse"

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div
        className={cn(
          "inline-flex",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `ticker ${speedMap[speed]} linear infinite`,
          animationDirection
        }}
      >
        {/* Duplicar o conteúdo para efeito seamless */}
        <div className="inline-flex items-center gap-8 px-4">
          {children}
        </div>
        <div className="inline-flex items-center gap-8 px-4">
          {children}
        </div>
      </div>
    </div>
  )
}

// Componente específico para logos de clientes
interface ClientLogoTickerProps {
  logos: { name: string; src?: string }[]
  className?: string
  speed?: "slow" | "normal" | "fast"
}

export function ClientLogoTicker({ logos, className, speed = "normal" }: ClientLogoTickerProps) {
  return (
    <Ticker speed={speed} className={className}>
      {logos.map((logo, index) => (
        <div
          key={index}
          className="flex items-center justify-center px-6 py-2 grayscale hover:grayscale-0 transition-all duration-300"
        >
          {logo.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo.src}
              alt={logo.name}
              className="h-8 md:h-10 w-auto object-contain"
            />
          ) : (
            <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">
              {logo.name}
            </span>
          )}
        </div>
      ))}
    </Ticker>
  )
}
