"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { AnimatedText } from "@/components/shared/AnimatedText"

const clientImages = [
  "/imagens_clientes/governo_da_bahia.png",
  "/imagens_clientes/fio_laser.png",
  "/imagens_clientes/prefeitura_feira_de_santana.png",
  "/imagens_clientes/neoenergia.png",
  "/imagens_clientes/embasa.png",
  "/imagens_clientes/shopping_barra.png",
  "/imagens_clientes/mundo_verde.png",
  "/imagens_clientes/itaipava_arena_fonte_nova.png",
  "/imagens_clientes/prefeitura_salvador.png",
  "/imagens_clientes/afropunk.png"
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
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedText
            text="Confiança que gera performance"
            className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4"
            as="span"
            animation="fade"
          />
          <AnimatedText
            text="Clientes que confiam em nós"
            className="text-3xl md:text-4xl font-bold text-black"
            as="h2"
            animation="reveal"
            delay={0.2}
          />
        </div>

        {/* Clients Ticker */}
        <div className="mb-24 -mx-6 md:-mx-12">
          <div className="py-8 border-y border-black/10 overflow-hidden">
            <motion.div
              className="flex"
              animate={{
                x: [0, -2000]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear"
                }
              }}
            >
              {[...clientImages, ...clientImages, ...clientImages].map((imagePath, index) => (
                <div
                  key={`client-${index}`}
                  className="flex items-center justify-center mx-8 h-16 md:h-20 opacity-70 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                >
                  <Image
                    src={imagePath}
                    alt={`Cliente ${(index % clientImages.length) + 1}`}
                    width={150}
                    height={80}
                    className="h-full w-auto object-contain"
                    priority={index < 3}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Platforms Section */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-500 text-sm uppercase tracking-[0.2em] mb-8"
          >
            Plataformas mais utilizadas
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
                className="px-6 py-3 rounded-full border border-black/10 bg-black/5 hover:bg-black/10 transition-colors group"
              >
                <span className="text-black/60 group-hover:text-black transition-colors font-medium">
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
