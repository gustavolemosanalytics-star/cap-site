"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Logo } from "@/components/shared/Logo"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/agencia", label: "Agencia" },
  { href: "/inteligencia", label: "Inteligencia" },
  { href: "/lps-sites", label: "LPs & Sites" }
]

const socialLinks = [
  { href: "https://instagram.com/cap.performance", label: "Instagram", icon: InstagramIcon },
  { href: "https://linkedin.com/company/capdigital", label: "LinkedIn", icon: LinkedInIcon }
]

export function Footer() {
  return (
    <footer className="bg-[#1E1E1E] border-t border-white/5">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo e descrição */}
          <div className="md:col-span-2">
            <Logo variant="red" className="w-32 mb-6" showTagline />
            <p className="text-white/60 text-sm max-w-md mt-4">
              Unimos midia, dados e tecnologia para transformar informacao em performance real.
            </p>
          </div>

          {/* Links de navegação */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navegacao
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contato
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:pedro@capdigital.company"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  pedro@capdigital.company
                </a>
              </li>
              <li>
                <a
                  href="https://capdigital.company"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  capdigital.company
                </a>
              </li>
            </ul>

            {/* Redes sociais */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} CAP.CO. Todos os direitos reservados.
          </p>
          <p className="text-white/40 text-xs">
            @cap.performance
          </p>
        </div>
      </div>
    </footer>
  )
}

// Icons
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
