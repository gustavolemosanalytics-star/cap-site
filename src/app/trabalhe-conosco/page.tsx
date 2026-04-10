"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar, Footer, SmoothScroll } from "@/components/layout"
import { AnimatedText } from "@/components/shared/AnimatedText"

export default function TrabalheConoscoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    portfolio: "",
  })
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)

    const mailtoSubject = encodeURIComponent("Candidatura - Creator & Content Designer")
    const mailtoBody = encodeURIComponent(
      `Nome: ${formData.nome}\nEmail: ${formData.email}\nTelefone: ${formData.telefone}\nPortfólio: ${formData.portfolio}`
    )
    const mailtoLink = `mailto:pedro@capdigital.company,guilherme@capdigital.company?subject=${mailtoSubject}&body=${mailtoBody}`

    window.location.href = mailtoLink
    setEnviando(false)
    setEnviado(true)
    setTimeout(() => setEnviado(false), 5000)
  }

  return (
    <SmoothScroll>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center bg-[#1E1E1E] overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(253,52,52,0.15) 0%, rgba(253,52,52,0) 70%)"
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px"
            }}
          />

          <div className="container mx-auto px-6 text-center relative z-10 pt-24">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-[#FD3434] text-sm uppercase tracking-[0.3em] mb-4"
            >
              Trabalhe Conosco
            </motion.span>
            <AnimatedText
              text="Faça Parte do Nosso Time"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              as="h1"
              animation="words"
              delay={0.2}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            >
              Estamos sempre em busca de pessoas criativas e apaixonadas por inovação.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <button
                onClick={() => {
                  const el = document.getElementById("vaga")
                  if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" })
                }}
                className="px-8 py-4 rounded-full bg-[#FD3434] text-white font-medium hover:bg-[#FD3434]/90 transition-colors cursor-pointer"
              >
                Ver vaga aberta
              </button>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
            >
              <motion.div className="w-1 h-2 bg-white/40 rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* Vaga */}
        <section id="vaga" className="py-24 bg-[#1E1E1E]">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12"
            >
              {/* Titulo da vaga */}
              <div className="mb-10">
                <span className="text-[#FD3434] text-sm uppercase tracking-[0.3em] mb-2 block">Vaga Aberta</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Creator & Content Designer
                </h2>
                <p className="text-white/60 text-lg">
                  A CAP.CO está em busca de uma pessoa criativa, organizada e mão na massa para atuar na criação e gestão de conteúdos digitais.
                  Se você curte transitar entre design, redes sociais e produção de conteúdo, essa vaga é pra você.
                </p>
              </div>

              {/* Responsabilidades */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-[#FD3434]">01</span> Responsabilidades
                </h3>
                <ul className="space-y-3">
                  {[
                    "Criar peças visuais (cards, apresentações e materiais digitais)",
                    "Planejar, publicar e gerenciar conteúdos nas redes sociais",
                    "Desenvolver roteiros para vídeos (principalmente para redes sociais)",
                    "Editar vídeos simples (reels, stories, cortes, etc.)",
                    "Apoiar na construção de linhas editoriais e calendário de conteúdo",
                    "Acompanhar desempenho básico das publicações",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FD3434] mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Requisitos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-[#FD3434]">02</span> Requisitos
                </h3>
                <ul className="space-y-3">
                  {[
                    "Experiência com design (Photoshop, Illustrator, Canva ou similares)",
                    "Noção de redes sociais (Instagram, TikTok, etc.)",
                    "Habilidade básica em edição de vídeo (CapCut, Premiere, ou similares)",
                    "Boa escrita e organização",
                    "Proatividade e senso estético apurado",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FD3434] mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Diferenciais */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-[#FD3434]">03</span> Diferenciais
                </h3>
                <ul className="space-y-3">
                  {[
                    "Experiência com marcas ou agências",
                    "Noção de tráfego pago / marketing digital",
                    "Conhecimento em motion simples",
                    "Facilidade em criar conteúdo criativo e atual (trends)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FD3434] mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Formato */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-4"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-[#FD3434]">04</span> Formato
                </h3>
                <div className="flex items-center gap-3 text-white/70">
                  <span className="px-4 py-2 rounded-full border border-[#FD3434]/30 bg-[#FD3434]/10 text-[#FD3434] text-sm font-medium">
                    Híbrido
                  </span>
                  <span>Presencial pelo menos 2x na semana</span>
                </div>
              </motion.div>

              {/* CTA Me inscrever */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 pt-10 border-t border-white/10 flex justify-center"
              >
                <button
                  onClick={() => {
                    const el = document.getElementById("formulario")
                    if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" })
                  }}
                  className="px-10 py-4 rounded-full bg-[#FD3434] text-white font-bold text-lg hover:bg-[#FD3434]/90 transition-colors cursor-pointer"
                >
                  Me inscrever
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Formulário de candidatura */}
        <section id="formulario" className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <span className="text-[#FD3434] text-sm uppercase tracking-[0.3em] mb-2 block">
                Candidate-se
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-4">
                Envie sua candidatura
              </h2>
              <p className="text-[#1E1E1E]/60 text-lg">
                Preencha o formulário abaixo e entraremos em contato.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-[#1E1E1E] mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1E1E1E]/5 border border-[#1E1E1E]/10 text-[#1E1E1E] placeholder-[#1E1E1E]/40 focus:outline-none focus:border-[#FD3434] focus:ring-1 focus:ring-[#FD3434] transition-colors"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1E1E1E] mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1E1E1E]/5 border border-[#1E1E1E]/10 text-[#1E1E1E] placeholder-[#1E1E1E]/40 focus:outline-none focus:border-[#FD3434] focus:ring-1 focus:ring-[#FD3434] transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-[#1E1E1E] mb-2">
                  Telefone / WhatsApp *
                </label>
                <input
                  type="tel"
                  id="telefone"
                  required
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1E1E1E]/5 border border-[#1E1E1E]/10 text-[#1E1E1E] placeholder-[#1E1E1E]/40 focus:outline-none focus:border-[#FD3434] focus:ring-1 focus:ring-[#FD3434] transition-colors"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label htmlFor="portfolio" className="block text-sm font-medium text-[#1E1E1E] mb-2">
                  Link do portfólio / Behance / LinkedIn
                </label>
                <input
                  type="url"
                  id="portfolio"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1E1E1E]/5 border border-[#1E1E1E]/10 text-[#1E1E1E] placeholder-[#1E1E1E]/40 focus:outline-none focus:border-[#FD3434] focus:ring-1 focus:ring-[#FD3434] transition-colors"
                  placeholder="https://..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={enviando}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-[#FD3434] text-white font-bold text-lg hover:bg-[#FD3434]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {enviando ? "Enviando..." : "Enviar candidatura"}
              </motion.button>

              {enviado && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-green-700 font-medium"
                >
                  Seu cliente de e-mail foi aberto com a candidatura. Envie o e-mail para concluir!
                </motion.p>
              )}
            </motion.form>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  )
}
