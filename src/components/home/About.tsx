"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { AnimatedText } from "@/components/shared/AnimatedText"

const pillars = [
  {
    title: "Analise de Dados",
    description: "Transformamos dados em insights acionaveis para decisoes estrategicas.",
    icon: DataIcon
  },
  {
    title: "Midia e Automacao",
    description: "Campanhas otimizadas com tecnologia de ponta e automacao inteligente.",
    icon: MediaIcon
  },
  {
    title: "IA First",
    description: "Inteligencia artificial aplicada em todas as etapas do processo.",
    icon: AIIcon
  },
  {
    title: "Time + Tecnologia",
    description: "Especialistas dedicados combinados com as melhores ferramentas.",
    icon: TeamIcon
  }
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#E6E1C3]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <AnimatedText
            text="Sobre Nos"
            className="text-sm uppercase tracking-[0.3em] text-[#717178] mb-4"
            as="span"
            animation="fade"
          />
          <AnimatedText
            text="Na CAP.CO, unimos midia, dados e tecnologia para transformar informacao em performance real."
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#1E1E1E] leading-tight"
            as="h2"
            animation="words"
            delay={0.2}
          />
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.6,
                delay: 0.4 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="group"
            >
              <div className="bg-[#1E1E1E] rounded-2xl p-6 md:p-8 h-full transition-transform duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 rounded-xl bg-[#FD3434]/10 flex items-center justify-center mb-6 group-hover:bg-[#FD3434]/20 transition-colors">
                  <pillar.icon className="w-6 h-6 text-[#FD3434]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Icons
function DataIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C3 20.24 3 19.96 3 19.4V3" strokeLinecap="round" />
      <path d="m7 14 4-4 4 4 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MediaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" strokeLinecap="round" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  )
}

function AIIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2" strokeLinecap="round" />
      <path d="M9 14v2M15 14v2" strokeLinecap="round" />
    </svg>
  )
}

function TeamIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeLinecap="round" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
    </svg>
  )
}
