"use client"

import { Navbar, Footer } from "@/components/layout"
import { Hero, About, Clients, CTA } from "@/components/home"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Clients />
        <CTA />
        <Footer />
      </main>
    </>
  )
}
