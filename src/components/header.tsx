"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#contato", label: "Contato" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="#inicio" className="flex items-center gap-3">
            <Image
              src="/images/floripa-bar-logo.png"
              alt="Floripa Bar"
              width={60}
              height={60}
              className="rounded-full"
            />
            <span className="text-lg font-bold text-foreground hidden sm:block">
              Floripa Bar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors font-medium text-base"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/5548936224040"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-md"
            >
              Fazer Pedido
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-foreground p-2"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-border/30">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-foreground/90 hover:text-primary transition-colors font-semibold py-3 text-lg"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/5548936224040"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-center mt-4 hover:bg-primary/90 transition-all shadow-md"
              >
                Fazer Pedido
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
