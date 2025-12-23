"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Counter } from "@/components/shared/Counter"
import { RotatingText } from "@/components/shared/RotatingText"

const stats = [
  { value: 10, prefix: "+", suffix: "MI", label: "investidos em anúncios" },
  { value: 97, prefix: "+", suffix: "MI", label: "usuários alcançados" },
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
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <Image
            src="/logo.png"
            alt="CAP.CO Logo"
            width={320}
            height={91}
            className="w-48 md:w-64 lg:w-80 h-auto"
            priority
          />
        </motion.div>

        {/* Titulo principal com RotatingText */}
        <div className="text-center max-w-5xl mx-auto mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
          >
            Comunicação e Alta
            <br />
            <RotatingText
              texts={["Performance", "Capacidade", "Competência", "Eficiência"]}
              mainClassName="px-3 md:px-4 bg-[#E6E1C3] text-[#1E1E1E] overflow-hidden py-1 md:py-2 justify-center rounded-lg"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </motion.h1>
        </div>

        {/* Subtitulo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mb-16"
        >
          <span className="text-[#FD3434] text-xl md:text-2xl font-medium tracking-wide">
            Soluções Integradas
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

    </section>
  )
}
