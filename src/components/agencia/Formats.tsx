"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { AnimatedText } from "@/components/shared/AnimatedText"

const formats = [
  {
    name: "Display",
    description: "Banners em diversos formatos para impacto visual.",
    sizes: ["300×250", "336×280", "728×90", "970×90", "970×250", "160×600", "300×600", "300×1050", "300×50", "320×100"],
    icon: DisplayIcon,
    exampleUrl: "https://via.placeholder.com/300x250/1E1E1E/FD3434?text=Display+Ad"
  },
  {
    name: "Rich Media",
    description: "Formatos interativos de alto engajamento.",
    details: "Expandable, Video, Interstitial",
    icon: RichMediaIcon,
    exampleUrl: "https://via.placeholder.com/400x300/1E1E1E/E6E1C3?text=Rich+Media"
  },
  {
    name: "YouTube",
    description: "Video ads para alcance massivo.",
    details: "In-Stream, Discovery, Bumper Ads",
    icon: YouTubeIcon,
    exampleUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1"
  },
  {
    name: "Redes Sociais",
    description: "Conteúdo nativo para cada plataforma.",
    details: "Reels, Feed, Stories",
    icon: SocialIcon,
    exampleUrl: "https://via.placeholder.com/400x500/1E1E1E/FD3434?text=Social+Ad"
  },
  {
    name: "Google Search",
    description: "Anúncios de busca para captura de demanda.",
    details: "Search Ads, Shopping, Local",
    icon: SearchIcon,
    exampleUrl: "https://via.placeholder.com/400x200/1E1E1E/4285F4?text=Search+Ad"
  },
  {
    name: "Spotify",
    description: "Audio ads para momentos de escuta.",
    details: "Audio, Display, Video",
    icon: SpotifyIcon,
    exampleUrl: "https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT?utm_source=generator&theme=0"
  },
  {
    name: "TV Conectada",
    description: "CTV para alcance em streaming.",
    details: "Pre-roll, Mid-roll",
    icon: TVIcon,
    exampleUrl: "https://via.placeholder.com/640x360/1E1E1E/E6E1C3?text=CTV+Ad"
  },
  {
    name: "Disparos",
    description: "Comunicação direta com usuários.",
    details: "SMS, Push, WhatsApp",
    icon: MessageIcon,
    exampleUrl: "https://via.placeholder.com/300x400/1E1E1E/25D366?text=WhatsApp+Message"
  }
]

export function Formats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<typeof formats[0] | null>(null)

  return (
    <>
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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[#717178] text-sm mt-4"
            >
              Clique em um formato para ver um exemplo
            </motion.p>
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
                onClick={() => setSelectedFormat(format)}
                className="group relative cursor-pointer"
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

                  {/* View Example indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-[#FD3434] flex items-center gap-1">
                      <EyeIcon className="w-3 h-3" />
                      Ver exemplo
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Example Preview */}
      <AnimatePresence>
        {selectedFormat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedFormat(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#1E1E1E] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FD3434]/10 flex items-center justify-center">
                    <selectedFormat.icon className="w-6 h-6 text-[#FD3434]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedFormat.name}</h3>
                    <p className="text-white/50 text-sm">{selectedFormat.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFormat(null)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <CloseIcon className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {selectedFormat.name === "Spotify" ? (
                  <div className="aspect-[3/1] rounded-lg overflow-hidden">
                    <iframe
                      src={selectedFormat.exampleUrl}
                      width="100%"
                      height="152"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="rounded-lg"
                    />
                  </div>
                ) : selectedFormat.name === "YouTube" ? (
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={selectedFormat.exampleUrl}
                      width="100%"
                      height="100%"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center bg-[#2A2A2A] rounded-lg p-8 min-h-[300px]">
                    <div className="text-center">
                      <selectedFormat.icon className="w-16 h-16 text-[#FD3434] mx-auto mb-4" />
                      <p className="text-white font-medium mb-2">Exemplo de {selectedFormat.name}</p>
                      <p className="text-white/50 text-sm max-w-md">
                        {selectedFormat.details || (selectedFormat.sizes && `Formatos: ${selectedFormat.sizes.join(", ")}`)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Sizes grid for Display */}
                {selectedFormat.sizes && (
                  <div className="mt-6">
                    <p className="text-white/60 text-sm mb-3">Tamanhos disponíveis:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedFormat.sizes.map((size) => (
                        <span
                          key={size}
                          className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/60 border border-white/10"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
