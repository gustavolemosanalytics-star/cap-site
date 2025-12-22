"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/shared/Button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/agencia", label: "Agência" },
  { href: "/inteligencia", label: "Inteligência e Dashboards" },
  { href: "/lps-sites", label: "LPs & Sites" }
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLightBackground, setIsLightBackground] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Detectar se está em uma seção com fundo claro
      const sections = document.querySelectorAll("section")
      const navbarHeight = 80

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= navbarHeight && rect.bottom >= navbarHeight) {
          const bgColor = window.getComputedStyle(section).backgroundColor
          // Verificar se é fundo claro (cream)
          const isLight = bgColor.includes("230, 225, 195") ||
                          section.classList.contains("bg-[#E6E1C3]") ||
                          section.className.includes("E6E1C3")
          setIsLightBackground(isLight)
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Checar estado inicial
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fechar menu mobile ao mudar de rota
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevenir scroll quando menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? isLightBackground
              ? "bg-[#E6E1C3]/80 backdrop-blur-nav border-b border-black/5"
              : "bg-[#1E1E1E]/80 backdrop-blur-nav border-b border-white/5"
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium tracking-wide transition-colors duration-300",
                  pathname === link.href
                    ? isLightBackground ? "text-[#1E1E1E]" : "text-white"
                    : isLightBackground ? "text-[#1E1E1E]/60 hover:text-[#1E1E1E]" : "text-white/60 hover:text-white"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[#FD3434]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="primary" size="sm" magnetic>
              Fale Conosco
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className={cn("w-6 h-0.5 block", isLightBackground && !isMobileMenuOpen ? "bg-[#1E1E1E]" : "bg-white")}
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={cn("w-6 h-0.5 block", isLightBackground && !isMobileMenuOpen ? "bg-[#1E1E1E]" : "bg-white")}
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className={cn("w-6 h-0.5 block", isLightBackground && !isMobileMenuOpen ? "bg-[#1E1E1E]" : "bg-white")}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Fullscreen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#1E1E1E]"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "text-3xl font-bold tracking-tight transition-colors",
                      pathname === link.href
                        ? "text-[#FD3434]"
                        : "text-white hover:text-[#FD3434]"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-8"
              >
                <Button variant="primary" size="lg">
                  Fale Conosco
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
