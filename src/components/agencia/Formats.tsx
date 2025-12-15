"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { AnimatedText } from "@/components/shared/AnimatedText"

const formats = [
  {
    name: "Display",
    description: "Banners em diversos formatos para impacto visual.",
    sizes: ["300x250", "728x90", "160x600", "320x50"],
    icon: DisplayIcon
  },
  {
    name: "Rich Media",
    description: "Formatos interativos de alto engajamento.",
    details: "Expandable, Video, Interstitial",
    icon: RichMediaIcon
  },
  {
    name: "YouTube",
    description: "Video ads para alcance massivo.",
    details: "In-Stream, Discovery, Bumper Ads",
    icon: YouTubeIcon
  },
  {
    name: "Redes Sociais",
    description: "Conteudo nativo para cada plataforma.",
    details: "Reels, Feed, Stories",
    icon: SocialIcon
  },
  {
    name: "Google Search",
    description: "Anuncios de busca para captura de demanda.",
    details: "Search Ads, Shopping, Local",
    icon: SearchIcon
  },
  {
    name: "Spotify",
    description: "Audio ads para momentos de escuta.",
    details: "Audio, Display, Video",
    icon: SpotifyIcon
  },
  {
    name: "TV Conectada",
    description: "CTV para alcance em streaming.",
    details: "Pre-roll, Mid-roll",
    icon: TVIcon
  },
  {
    name: "Disparos",
    description: "Comunicacao direta com usuarios.",
    details: "SMS, Push, WhatsApp",
    icon: MessageIcon
  }
]

export function Formats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#E6E1C3]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedText
            text="Formatos e Canais"
            className="text-sm uppercase tracking-[0.3em] text-[#717178] mb-4"
            as="span"
            animation="fade"
          />
          <AnimatedText
            text="Onde sua marca precisa estar"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E1E1E]"
            as="h2"
            animation="reveal"
            delay={0.2}
          />
        </div>

        {/* Formats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {formats.map((format, index) => (
            <motion.div
              key={format.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div className="bg-[#1E1E1E] rounded-xl p-6 h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-[#FD3434]/10 flex items-center justify-center mb-4 group-hover:bg-[#FD3434]/20 transition-colors">
                  <format.icon className="w-5 h-5 text-[#FD3434]" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2">{format.name}</h3>
                <p className="text-white/50 text-sm mb-3">{format.description}</p>

                {/* Details */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    height: hoveredIndex === index ? "auto" : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {format.sizes ? (
                    <div className="flex flex-wrap gap-2">
                      {format.sizes.map((size) => (
                        <span
                          key={size}
                          className="text-xs px-2 py-1 rounded bg-white/5 text-white/40"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-[#FD3434]">{format.details}</span>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Icons
function DisplayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}

function RichMediaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  )
}

function SocialIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14.5c2.5-1 5.5-1 8 0" />
      <path d="M7 11.5c3.5-1.5 7.5-1.5 11 0" />
      <path d="M6 8.5c4-1.5 9-1.5 13 0" />
    </svg>
  )
}

function TVIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
      <polyline points="17 2 12 7 7 2" />
    </svg>
  )
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
