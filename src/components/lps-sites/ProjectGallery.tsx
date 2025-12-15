"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { AnimatedText } from "@/components/shared/AnimatedText"

const projects = [
  {
    name: "Governo da Bahia",
    type: "Landing Page",
    category: "Governo",
    image: "/placeholder-project.jpg"
  },
  {
    name: "Fiolaser",
    type: "Site Institucional",
    category: "Saude",
    image: "/placeholder-project.jpg"
  },
  {
    name: "Neoenergia",
    type: "Landing Page",
    category: "Energia",
    image: "/placeholder-project.jpg"
  },
  {
    name: "Shopping Barra",
    type: "Site + LP",
    category: "Varejo",
    image: "/placeholder-project.jpg"
  },
  {
    name: "Itaipava Arena",
    type: "Landing Page",
    category: "Entretenimento",
    image: "/placeholder-project.jpg"
  },
  {
    name: "Afropunk",
    type: "Landing Page",
    category: "Eventos",
    image: "/placeholder-project.jpg"
  }
]

export function ProjectGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#1E1E1E]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedText
            text="Portfolio"
            className="text-sm uppercase tracking-[0.3em] text-[#717178] mb-4"
            as="span"
            animation="fade"
          />
          <AnimatedText
            text="Projetos de Alta Conversao"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            as="h2"
            animation="reveal"
            delay={0.2}
          />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#252525] to-[#1a1a1a]">
                {/* Fake browser window */}
                <div className="absolute inset-4 bg-[#1E1E1E] rounded-lg overflow-hidden border border-white/5">
                  <div className="h-6 bg-[#2a2a2a] flex items-center px-3 gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FD3434]" />
                    <div className="w-2 h-2 rounded-full bg-[#E6E1C3]" />
                    <div className="w-2 h-2 rounded-full bg-[#717178]" />
                  </div>
                  <div className="p-4">
                    <div className="space-y-2">
                      <div className="h-2 w-3/4 bg-white/5 rounded" />
                      <div className="h-2 w-1/2 bg-white/5 rounded" />
                      <div className="h-8 w-full bg-[#FD3434]/20 rounded mt-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-[#FD3434]/90 flex flex-col items-center justify-center p-6 text-center"
              >
                <span className="text-white/60 text-xs uppercase tracking-wider mb-2">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.name}
                </h3>
                <span className="text-white/80 text-sm">{project.type}</span>
              </motion.div>

              {/* Default info */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: hoveredIndex === index ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-4 left-4 right-4"
              >
                <span className="text-[#FD3434] text-xs uppercase tracking-wider">
                  {project.type}
                </span>
                <h3 className="text-white font-semibold mt-1">{project.name}</h3>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
