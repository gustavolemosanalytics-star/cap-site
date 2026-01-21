import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { WhatsAppButton } from "@/components/shared"
import { ScrollToTop } from "@/components/layout"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "CAP.CO | Comunicacao e Alta Performance",
  description: "Agencia de marketing digital focada em performance, dados e inteligencia. Solucoes integradas em midia, dados e tecnologia para transformar informacao em resultados reais.",
  keywords: ["marketing digital", "performance", "google ads", "meta ads", "dados", "automacao", "IA", "Salvador", "Bahia"],
  authors: [{ name: "CAP.CO" }],
  openGraph: {
    title: "CAP.CO | Comunicacao e Alta Performance",
    description: "Agencia de marketing digital focada em performance, dados e inteligencia.",
    url: "https://capdigital.company",
    siteName: "Cap Digital",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CAP.CO | Comunicacao e Alta Performance",
    description: "Agencia de marketing digital focada em performance, dados e inteligencia.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ScrollToTop />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
