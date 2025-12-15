"use client"

import { Navbar, Footer, SmoothScroll } from "@/components/layout"
import { Hero, About, Clients, CTA } from "@/components/home"

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Clients />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
