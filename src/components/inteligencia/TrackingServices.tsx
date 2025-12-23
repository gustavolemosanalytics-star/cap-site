"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { AnimatedText } from "@/components/shared/AnimatedText"

const services = [
  {
    title: "Conversões Offline",
    description: "Integre dados de vendas offline com suas campanhas digitais para medir o impacto real.",
    icon: OfflineIcon
  },
  {
    title: "Conversions API (CAPI)",
    description: "Envie dados de conversão diretamente para as plataformas, sem depender de cookies.",
    icon: APIIcon
  },
  {
    title: "Google Tag Manager",
    description: "Gerenciamento centralizado de tags para controle total do tracking.",
    icon: TagIcon
  },
  {
    title: "Server-Side Tracking",
    description: "Tracking robusto via servidor para maior precisão e privacidade dos dados.",
    icon: ServerIcon
  },
  {
    title: "Pixel e Tags",
    description: "Implementação e auditoria de pixels para rastreamento completo de eventos.",
    icon: PixelIcon
  },
  {
    title: "Atribuição Avançada",
    description: "Modelos de atribuição customizados para entender o valor de cada touchpoint.",
    icon: AttributionIcon
  }
]

export function TrackingServices() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#E6E1C3]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedText
            text="Serviços de Tracking"
            className="text-sm uppercase tracking-[0.3em] text-[#717178] mb-4"
            as="span"
            animation="fade"
          />
          <AnimatedText
            text="Rastreie. Mensure. Otimize."
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E1E1E]"
            as="h2"
            animation="reveal"
            delay={0.2}
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="group"
            >
              <div className="bg-[#1E1E1E] rounded-2xl p-6 md:p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="w-12 h-12 rounded-xl bg-[#FD3434]/10 flex items-center justify-center mb-6 group-hover:bg-[#FD3434] transition-colors">
                  <service.icon className="w-6 h-6 text-[#FD3434] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {service.description}
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
function OfflineIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  )
}

function APIIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" />
    </svg>
  )
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  )
}

function ServerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  )
}

function PixelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <rect x="7" y="7" width="3" height="3" />
      <rect x="14" y="7" width="3" height="3" />
      <rect x="7" y="14" width="3" height="3" />
      <rect x="14" y="14" width="3" height="3" />
    </svg>
  )
}

function AttributionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" fillOpacity="0.2" />
      <path d="M12 2v10l7 4" />
    </svg>
  )
}
