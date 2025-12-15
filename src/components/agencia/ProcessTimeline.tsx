"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { AnimatedText } from "@/components/shared/AnimatedText"

const steps = [
  {
    number: "01",
    title: "Planejamento com Dados",
    description: "Estrategia de Publicos, Construcao de Jornada",
    details: [
      "Analise de mercado e concorrencia",
      "Definicao de personas",
      "Mapeamento da jornada do cliente",
      "KPIs e metricas de sucesso"
    ],
    color: "#FD3434"
  },
  {
    number: "02",
    title: "Execucao com Precisao",
    description: "Landing Pages, Tracking, Automacoes, Gestao de Redes, Criativos com IA",
    details: [
      "Desenvolvimento de landing pages",
      "Implementacao de tracking completo",
      "Automacao de campanhas",
      "Producao de criativos com IA"
    ],
    color: "#E6E1C3"
  },
  {
    number: "03",
    title: "Otimizacao Inteligente",
    description: "Analise de Dados, Relatorios Interativos, Testes A/B",
    details: [
      "Analise continua de performance",
      "Relatorios em tempo real",
      "Testes A/B constantes",
      "Otimizacao baseada em dados"
    ],
    color: "#717178"
  }
]

export function ProcessTimeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#1E1E1E]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <AnimatedText
            text="Nosso Processo"
            className="text-sm uppercase tracking-[0.3em] text-[#717178] mb-4"
            as="span"
            animation="fade"
          />
          <AnimatedText
            text="Performance 360°"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            as="h2"
            animation="reveal"
            delay={0.2}
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 origin-top hidden md:block"
          />

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 ${
                  index % 2 === 1 ? "md:direction-rtl" : ""
                }`}
              >
                {/* Number indicator */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.2,
                    type: "spring"
                  }}
                  className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center z-10"
                  style={{ backgroundColor: step.color }}
                >
                  <span className="text-white font-bold text-lg">{step.number}</span>
                </motion.div>

                {/* Content */}
                <div className={`pl-24 md:pl-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"}`}>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/60 mb-6">{step.description}</p>

                  <ul className={`space-y-2 ${index % 2 === 0 ? "md:ml-auto" : ""}`}>
                    {step.details.map((detail, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.6 + index * 0.2 + i * 0.1
                        }}
                        className={`flex items-center gap-3 text-white/40 text-sm ${
                          index % 2 === 0 ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.color }} />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Empty column for alternating layout */}
                {index % 2 === 0 && <div className="hidden md:block" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
