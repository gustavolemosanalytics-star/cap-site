"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { AnimatedText } from "@/components/shared/AnimatedText"

const features = [
  {
    title: "Mobile First",
    description: "Design responsivo priorizando a experiencia mobile, onde seus clientes estao.",
    icon: MobileIcon,
    stat: "70%",
    statLabel: "do trafego e mobile"
  },
  {
    title: "Otimizado para Conversao",
    description: "Cada elemento pensado para guiar o usuario ate a acao desejada.",
    icon: ConversionIcon,
    stat: "+35%",
    statLabel: "taxa de conversao"
  },
  {
    title: "Tracking Completo",
    description: "Eventos e micro-conversoes rastreados para analise detalhada do funil.",
    icon: TrackingIcon,
    stat: "100%",
    statLabel: "dos eventos trackeados"
  },
  {
    title: "Alta Velocidade",
    description: "Performance otimizada para carregamento ultra-rapido e melhor SEO.",
    icon: SpeedIcon,
    stat: "<2s",
    statLabel: "tempo de carregamento"
  }
]

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#E6E1C3]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedText
            text="Diferenciais"
            className="text-sm uppercase tracking-[0.3em] text-[#717178] mb-4"
            as="span"
            animation="fade"
          />
          <AnimatedText
            text="Por que nossas LPs convertem mais"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E1E1E]"
            as="h2"
            animation="reveal"
            delay={0.2}
          />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="group"
            >
              <div className="bg-[#1E1E1E] rounded-2xl p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col md:flex-row gap-6">
                {/* Icon and content */}
                <div className="flex-1">
                  <div className="w-14 h-14 rounded-xl bg-[#FD3434]/10 flex items-center justify-center mb-6 group-hover:bg-[#FD3434] transition-colors">
                    <feature.icon className="w-7 h-7 text-[#FD3434] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Stat */}
                <div className="md:border-l md:border-white/10 md:pl-6 flex md:flex-col items-center md:items-start justify-center">
                  <span className="text-4xl md:text-5xl font-bold text-[#FD3434]">
                    {feature.stat}
                  </span>
                  <span className="text-white/40 text-xs uppercase tracking-wider ml-3 md:ml-0 md:mt-2">
                    {feature.statLabel}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Icons
function MobileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  )
}

function ConversionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

function TrackingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function SpeedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}
