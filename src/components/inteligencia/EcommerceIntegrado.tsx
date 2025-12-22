"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { AnimatedText } from "@/components/shared/AnimatedText"
import { Button } from "@/components/shared/Button"

const platforms = [
  { name: "Tray", icon: TrayIcon },
  { name: "Nuvemshop", icon: NuvemshopIcon },
  { name: "Shopify", icon: ShopifyIcon }
]

const dashboards = [
  {
    title: "Dashboard E-commerce",
    url: "https://dash-modelo-publi.vercel.app/",
    domain: "dash-modelo-publi.vercel.app"
  },
  {
    title: "Dashboard Analytics",
    url: "https://dash-modelo-cap.vercel.app/",
    domain: "dash-modelo-cap.vercel.app"
  },
  {
    title: "Dashboard E-commerce Avançado",
    url: "https://cap-dash-ecommerce.vercel.app/",
    domain: "cap-dash-ecommerce.vercel.app"
  },
  {
    title: "Dashboard B2B",
    url: "https://cap-dashmodelo-b2b.vercel.app/",
    domain: "cap-dashmodelo-b2b.vercel.app"
  },
  {
    title: "Monitor de Imagem Política em Tempo Real",
    url: "https://cap-ecoa.vercel.app/",
    domain: "cap-ecoa.vercel.app"
  },
  {
    title: "Dashboard Imobiliário",
    url: "https://cap-dashmodelo-imb.vercel.app/",
    domain: "cap-dashmodelo-imb.vercel.app"
  }
]

const features = [
  {
    title: "Gestão Unificada",
    description: "Gerencie produtos, pedidos e estoque de todas as plataformas em um único lugar.",
    icon: UnifiedIcon
  },
  {
    title: "Campanhas Integradas",
    description: "Conecte suas campanhas de mídia diretamente aos dados de vendas do e-commerce.",
    icon: CampaignIcon
  },
  {
    title: "Análise Preditiva",
    description: "IA que prevê tendências de produtos e categorias para otimizar seu estoque.",
    icon: PredictiveIcon
  },
  {
    title: "Relatórios em Tempo Real",
    description: "Dashboards atualizados em tempo real com métricas de performance.",
    icon: ReportsIcon
  }
]

interface EcommerceIntegradoProps {
  id?: string
}

export function EcommerceIntegrado({ id }: EcommerceIntegradoProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id={id} className="py-24 md:py-32 bg-[#1E1E1E]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedText
            text="E-commerce Integrado"
            className="text-sm uppercase tracking-[0.3em] text-[#FD3434] mb-4"
            as="span"
            animation="fade"
          />
          <AnimatedText
            text="Tudo em uma única plataforma"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            as="h2"
            animation="words"
            delay={0.2}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Gerencie seu e-commerce Tray, Nuvemshop ou Shopify junto com suas campanhas de mídia
            e análise preditiva de produtos e categorias.
          </motion.p>
        </div>

        {/* Platforms badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center gap-4 mb-12"
        >
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
            >
              <platform.icon className="w-5 h-5 text-white/60" />
              <span className="text-white/80 text-sm font-medium">{platform.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Dashboards Grid */}
        <div className="space-y-16 mb-20">
          {dashboards.map((dashboard, index) => (
            <motion.div
              key={dashboard.url}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              className="relative"
            >
              {/* Browser mockup */}
              <div className="bg-[#2A2A2A] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                {/* Browser header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#1E1E1E] border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white/5 rounded-md px-3 py-1.5 text-white/40 text-xs text-center max-w-md mx-auto">
                      {dashboard.domain}
                    </div>
                  </div>
                </div>

                {/* iframe do dashboard */}
                <div className="relative aspect-[16/9] md:aspect-[2/1]">
                  <iframe
                    src={dashboard.url}
                    className="absolute inset-0 w-full h-full"
                    title={dashboard.title}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center mt-6">
                <a
                  href={dashboard.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="md" magnetic>
                    Acessar {dashboard.title}
                    <ExternalLinkIcon className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.6,
                delay: 0.9 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="group"
            >
              <div className="bg-white/5 rounded-2xl p-6 h-full border border-white/5 hover:border-[#FD3434]/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#FD3434]/10 flex items-center justify-center mb-4 group-hover:bg-[#FD3434]/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-[#FD3434]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
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
function TrayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" strokeLinecap="round" />
    </svg>
  )
}

function NuvemshopIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ShopifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function UnifiedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" strokeLinecap="round" />
    </svg>
  )
}

function CampaignIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PredictiveIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2" strokeLinecap="round" />
      <path d="M9 14v2M15 14v2" strokeLinecap="round" />
    </svg>
  )
}

function ReportsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C3 20.24 3 19.96 3 19.4V3" strokeLinecap="round" />
      <path d="m7 14 4-4 4 4 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
