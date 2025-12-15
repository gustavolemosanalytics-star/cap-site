"use client"

import { motion } from "framer-motion"
import { Navbar, Footer, SmoothScroll } from "@/components/layout"
import { ProcessTimeline, Formats, Partners } from "@/components/agencia"
import { AnimatedText } from "@/components/shared/AnimatedText"

export default function AgenciaPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="min-h-[70vh] flex items-center justify-center bg-[#1E1E1E] pt-24">
          <div className="container mx-auto px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-[#FD3434] text-sm uppercase tracking-[0.3em] mb-4"
            >
              A Agencia
            </motion.span>
            <AnimatedText
              text="Performance 360°"
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              as="h1"
              animation="words"
              delay={0.2}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto"
            >
              Estrategia, execucao e otimizacao. Um ciclo completo de performance
              para levar sua marca ao proximo nivel.
            </motion.p>
          </div>
        </section>

        <ProcessTimeline />
        <Formats />
        <Partners />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
