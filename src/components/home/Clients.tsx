"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Ticker } from "@/components/shared/Ticker"
import { AnimatedText } from "@/components/shared/AnimatedText"

const clients = [
  "Governo da Bahia",
  "Fiolaser",
  "Prefeitura de Feira",
  "Neoenergia",
  "Embasa",
  "Shopping Barra",
  "Mundo Verde",
  "Itaipava Arena Fonte Nova",
  "Prefeitura de Salvador",
  "Afropunk"
]

const platforms = [
  { name: "Google Ads", color: "#4285F4" },
  { name: "Meta", color: "#0668E1" },
  { name: "YouTube", color: "#FF0000" },
  { name: "TikTok", color: "#000000" },
  { name: "LinkedIn", color: "#0A66C2" },
  { name: "Spotify", color: "#1DB954" }
]

export function Clients() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#1E1E1E]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedText
            text="Confianca que gera performance"
            className="text-sm uppercase tracking-[0.3em] text-[#717178] mb-4"
            as="span"
            animation="fade"
          />
          <AnimatedText
            text="Clientes que confiam em nos"
            className="text-3xl md:text-4xl font-bold text-white"
            as="h2"
            animation="reveal"
            delay={0.2}
          />
        </div>

        {/* Clients Ticker */}
        <div className="mb-24 -mx-6 md:-mx-12">
          <Ticker speed="slow" className="py-8 border-y border-white/5">
            {clients.map((client, index) => (
              <span
                key={index}
                className="text-2xl md:text-3xl font-bold text-white/20 hover:text-white/60 transition-colors duration-300 whitespace-nowrap"
              >
                {client}
              </span>
            ))}
          </Ticker>
        </div>

        {/* Platforms Section */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[#717178] text-sm uppercase tracking-[0.2em] mb-8"
          >
            Plataformas que dominamos
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <span className="text-white/60 group-hover:text-white transition-colors font-medium">
                  {platform.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
