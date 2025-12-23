"use client"

import { motion } from "framer-motion"
import { Navbar, Footer, SmoothScroll } from "@/components/layout"
import { Features, RequestCTA, LPPreview } from "@/components/lps-sites"
import { AnimatedText } from "@/components/shared/AnimatedText"
import { Button } from "@/components/shared/Button"

export default function LPsSitesPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center bg-[#1E1E1E] overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(253,52,52,0.15) 0%, rgba(253,52,52,0) 70%)"
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px"
            }}
          />

          <div className="container mx-auto px-6 text-center relative z-10 pt-24">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-[#FD3434] text-sm uppercase tracking-[0.3em] mb-4"
            >
              LPs & Sites
            </motion.span>
            <AnimatedText
              text="Landing Pages e Sites que Convertem"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              as="h1"
              animation="words"
              delay={0.2}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            >
              Páginas construídas com foco em experiência, dados e conversão.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="primary" size="lg" magnetic>
                Planejar minha página
              </Button>
              <button
                onClick={() => document.getElementById("lp-preview")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
              >
                Explorar cases
              </button>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
            >
              <motion.div className="w-1 h-2 bg-white/40 rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        <LPPreview id="lp-preview" />
        <Features />
        <RequestCTA />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
