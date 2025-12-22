"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { AnimatedText } from "@/components/shared/AnimatedText"

const tools = [
  { name: "React", category: "Frontend" },
  { name: "Python", category: "Backend" },
  { name: "MySQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "n8n", category: "Automacao" },
  { name: "Google Analytics", category: "Analytics" }
]

export function Tools() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#1E1E1E]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedText
            text="Stack de Ferramentas"
            className="text-sm uppercase tracking-[0.3em] text-[#717178] mb-4"
            as="span"
            animation="fade"
          />
          <AnimatedText
            text="Tecnologia de ponta"
            className="text-3xl md:text-4xl font-bold text-white"
            as="h2"
            animation="reveal"
            delay={0.2}
          />
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className="bg-white/5 rounded-xl p-6 text-center border border-white/5 hover:border-[#FD3434]/30 hover:bg-white/10 transition-all duration-300">
                <span className="text-[#FD3434] text-xs uppercase tracking-wider mb-2 block">
                  {tool.category}
                </span>
                <span className="text-white font-semibold text-lg">
                  {tool.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-white/40 text-sm mb-6">
            Precisa de consultoria especializada em dados e tracking?
          </p>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FD3434] text-white font-medium rounded-full hover:bg-[#e02e2e] transition-colors"
          >
            Solicitar Consultoria
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
