"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Counter } from "@/components/shared/Counter"

const metrics = [
  { label: "Impressoes", value: 2450000, prefix: "", suffix: "", change: "+12.5%" },
  { label: "Cliques", value: 89420, prefix: "", suffix: "", change: "+8.3%" },
  { label: "CTR", value: 3.65, prefix: "", suffix: "%", change: "+0.4%" },
  { label: "Conversoes", value: 4521, prefix: "", suffix: "", change: "+15.2%" }
]

export function DashboardMock() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#1E1E1E]">
      <div className="container mx-auto px-6">
        {/* Dashboard Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-[#252525] rounded-2xl p-6 md:p-8 border border-white/5 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#FD3434]" />
              <span className="text-white/60 text-sm">Dashboard CAP.CO</span>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <span>Ultimo update: agora</span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-[#1E1E1E] rounded-xl p-4 md:p-6"
              >
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">
                  {metric.label}
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl md:text-3xl font-bold text-white tabular-nums">
                    {metric.prefix}
                    {isInView ? (
                      <AnimatedNumber value={metric.value} />
                    ) : (
                      "0"
                    )}
                    {metric.suffix}
                  </span>
                  <span className="text-green-500 text-xs mb-1">{metric.change}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart Area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-[#1E1E1E] rounded-xl p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-white font-medium">Performance Mensal</h4>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-0.5 bg-[#FD3434]" />
                  <span className="text-white/40">Conversoes</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-0.5 bg-[#E6E1C3]" />
                  <span className="text-white/40">Cliques</span>
                </span>
              </div>
            </div>

            {/* Fake Chart */}
            <ChartMock isInView={isInView} />
          </motion.div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-[#1E1E1E] rounded-xl p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#FD3434]/10 flex items-center justify-center">
                <span className="text-[#FD3434] text-lg">G</span>
              </div>
              <div>
                <p className="text-white/40 text-xs">Google Ads</p>
                <p className="text-white font-semibold">R$ 45.230</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="bg-[#1E1E1E] rounded-xl p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <span className="text-blue-500 text-lg">M</span>
              </div>
              <div>
                <p className="text-white/40 text-xs">Meta Ads</p>
                <p className="text-white font-semibold">R$ 32.180</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="bg-[#1E1E1E] rounded-xl p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#E6E1C3]/10 flex items-center justify-center">
                <span className="text-[#E6E1C3] text-lg">+</span>
              </div>
              <div>
                <p className="text-white/40 text-xs">Outras</p>
                <p className="text-white font-semibold">R$ 12.590</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setDisplayValue(Math.floor(eased * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value])

  return <>{displayValue.toLocaleString("pt-BR")}</>
}

function ChartMock({ isInView }: { isInView: boolean }) {
  const data = [35, 42, 55, 48, 62, 58, 72, 68, 85, 78, 92, 88]
  const data2 = [45, 52, 48, 58, 52, 68, 62, 78, 72, 88, 82, 95]

  return (
    <div className="h-48 flex items-end gap-2">
      {data.map((value, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex flex-col gap-1 items-center">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: `${data2[index]}%` } : { height: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.05, ease: "easeOut" }}
              className="w-full bg-[#E6E1C3]/20 rounded-t"
            />
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: `${value}%` } : { height: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.05, ease: "easeOut" }}
              className="w-full bg-[#FD3434] rounded-t -mt-[100%]"
              style={{ marginTop: `-${data2[index]}%` }}
            />
          </div>
          <span className="text-white/20 text-[10px]">
            {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][index]}
          </span>
        </div>
      ))}
    </div>
  )
}
