"use client"

import { motion } from "framer-motion"
import { Logo } from "@/components/shared/Logo"
import { Counter } from "@/components/shared/Counter"
import { ScrollIndicator } from "@/components/shared/ScrollIndicator"
import { AnimatedText } from "@/components/shared/AnimatedText"

const stats = [
  { value: 10, prefix: "+", suffix: "MI", label: "investidos em anuncios" },
  { value: 97, prefix: "+", suffix: "MI", label: "usuarios alcancados" },
  { value: 600, prefix: "+", suffix: "MI", label: "impactos gerados" }
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#1E1E1E]">
      {/* Glow effect animado */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] glow-red"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>

      {/* Grid pattern sutil */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />

      <div className="container mx-auto px-6 relative z-10 pt-24">
        {/* Logo animado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <Logo variant="white" className="w-48 md:w-64 lg:w-80" />
        </motion.div>

        {/* Titulo principal */}
        <div className="text-center max-w-5xl mx-auto mb-8">
          <AnimatedText
            text="Comunicacao e Alta Performance"
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
            as="h1"
            animation="words"
            delay={0.5}
          />
        </div>

        {/* Subtitulo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mb-16"
        >
          <span className="text-[#FD3434] text-xl md:text-2xl font-medium tracking-wide">
            Solucoes Integradas
          </span>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <Counter
                end={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                duration={2}
                className="text-white items-center"
                label={stat.label}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollIndicator variant="mouse" />
      </div>
    </section>
  )
}
