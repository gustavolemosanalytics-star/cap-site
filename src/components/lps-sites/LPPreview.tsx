"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { AnimatedText } from "@/components/shared/AnimatedText"
import { Button } from "@/components/shared/Button"

const lpModelos = [
  {
    title: "LP Modelo 1",
    url: "https://lp-modelo-cap.vercel.app/",
    domain: "lp-modelo-cap.vercel.app",
    category: "Varejo"
  },
  {
    title: "LP Modelo 2",
    url: "https://lp-modelo.vercel.app/",
    domain: "lp-modelo.vercel.app",
    category: "E-commerce"
  },
  {
    title: "LP Saúde",
    url: "https://lp-saude-cap.vercel.app/",
    domain: "lp-saude-cap.vercel.app",
    category: "Saúde"
  },
  {
    title: "LP Ensino",
    url: "https://lp-modeloensino-cap.vercel.app/",
    domain: "lp-modeloensino-cap.vercel.app",
    category: "Educação"
  },
  {
    title: "Site Modelo",
    url: "https://site-cap-modelo.vercel.app/",
    domain: "site-cap-modelo.vercel.app",
    category: "Institucional"
  },
  {
    title: "Site Modelo 2",
    url: "https://cap-site-modelo-1.vercel.app/",
    domain: "cap-site-modelo-1.vercel.app",
    category: "Institucional"
  },
  {
    title: "Site Modelo 3",
    url: "https://cap-site-modelo-2.vercel.app/",
    domain: "cap-site-modelo-2.vercel.app",
    category: "Institucional"
  },
  {
    title: "Vertex Brilliance",
    url: "https://vertex-brilliance.vercel.app/",
    domain: "vertex-brilliance.vercel.app",
    category: "Tecnologia"
  }
]

interface LPPreviewProps {
  id?: string
}

export function LPPreview({ id }: LPPreviewProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id={id} className="py-24 md:py-32 bg-[#E6E1C3]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedText
            text="Exemplos de Landing Pages"
            className="text-sm uppercase tracking-[0.3em] text-[#717178] mb-4"
            as="span"
            animation="fade"
          />
          <AnimatedText
            text="Veja nossas LPs em ação"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E1E1E] mb-6"
            as="h2"
            animation="words"
            delay={0.2}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[#1E1E1E]/60 text-lg max-w-2xl mx-auto"
          >
            Confira modelos de landing pages desenvolvidas pela CAP.CO com foco em conversão e performance.
          </motion.p>
        </div>

        {/* LPs Grid */}
        <div className="space-y-16">
          {lpModelos.map((lp, index) => (
            <motion.div
              key={lp.url}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
              className="relative"
            >
              {/* Browser mockup */}
              <div className="bg-[#2A2A2A] rounded-2xl overflow-hidden border border-black/10 shadow-2xl">
                {/* Browser header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#1E1E1E] border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white/5 rounded-md px-3 py-1.5 text-white/40 text-xs text-center max-w-md mx-auto">
                      {lp.domain}
                    </div>
                  </div>
                </div>

                {/* iframe da LP */}
                <div className="relative aspect-[16/9] md:aspect-[2/1]">
                  <iframe
                    src={lp.url}
                    className="absolute inset-0 w-full h-full"
                    title={lp.title}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Title and Category */}
              <div className="text-center mt-6 mb-4">
                <span className="inline-block px-3 py-1 bg-[#FD3434] text-white text-xs font-medium rounded-full mb-2">
                  {lp.category}
                </span>
                <h3 className="text-[#1E1E1E] text-xl font-bold">{lp.title}</h3>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <a
                  href={lp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="md" magnetic>
                    Ver em Tela Cheia
                    <ExternalLinkIcon className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
