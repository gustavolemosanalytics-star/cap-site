"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { AnimatedText } from "@/components/shared/AnimatedText"
import { Button } from "@/components/shared/Button"

export function RequestCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#1E1E1E] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="w-20 h-20 rounded-2xl bg-[#FD3434]/10 flex items-center justify-center mx-auto mb-8"
          >
            <RocketIcon className="w-10 h-10 text-[#FD3434]" />
          </motion.div>

          <AnimatedText
            text="Vamos estruturar sua página para conversão"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            as="h2"
            animation="reveal"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/60 text-lg mb-10 max-w-xl mx-auto"
          >
            Analisamos seu cenário, indicamos e implementamos a melhor estrutura.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <Button variant="primary" size="lg" magnetic>
              Solicitar diagnóstico
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mt-12 text-white/30 text-sm"
          >
            <span className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-[#FD3434]" />
              Estrutura validada por dados
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-[#FD3434]" />
              Tracking desde o primeiro clique
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-[#FD3434]" />
              Arquitetura pensada para conversão
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function RocketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
