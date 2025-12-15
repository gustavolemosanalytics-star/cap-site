"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { AnimatedText } from "@/components/shared/AnimatedText"

const partners = [
  "Huggy",
  "ShowHeroes",
  "Cazamba",
  "Eletromidia",
  "JCDecaux",
  "Gameloft",
  "Seedtag"
]

export function Partners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#1E1E1E]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedText
            text="Parceiros"
            className="text-sm uppercase tracking-[0.3em] text-[#717178] mb-4"
            as="span"
            animation="fade"
          />
          <AnimatedText
            text="Ecossistema de tecnologia"
            className="text-3xl md:text-4xl font-bold text-white"
            as="h2"
            animation="reveal"
            delay={0.2}
          />
        </div>

        {/* Partners Grid */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="px-8 py-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#FD3434]/30 transition-all duration-300 cursor-default"
            >
              <span className="text-white/60 hover:text-white transition-colors font-semibold text-lg">
                {partner}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-white/40 text-sm mt-12 max-w-md mx-auto"
        >
          Trabalhamos com os melhores parceiros de tecnologia para entregar resultados excepcionais.
        </motion.p>
      </div>
    </section>
  )
}
