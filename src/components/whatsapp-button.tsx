"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { RESTAURANT_CONFIG, getWhatsAppUrl } from "@/lib/config"

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-20 right-0 bg-secondary text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
          Fale conosco no WhatsApp!
          <div className="absolute bottom-0 right-4 w-2 h-2 bg-secondary transform rotate-45 translate-y-1" />
        </div>
      )}

      {/* Button */}
      <a
        href={getWhatsAppUrl("Olá! Gostaria de fazer um pedido ou tirar uma dúvida")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 active:scale-95"
        aria-label="Fale conosco no WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MessageCircle className="w-8 h-8 text-white" />
        
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
      </a>
    </div>
  )
}
