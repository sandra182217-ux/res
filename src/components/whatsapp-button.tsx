"use client"

import { useState, useEffect } from "react"
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        className="flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
        style={{ backgroundColor: "#25D366" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Fale conosco no WhatsApp"
      >
        <svg
          className="w-8 h-8 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.783 1.14L1.07 3.591l1.378 4.631a9.797 9.797 0 00.2 8.531 9.829 9.829 0 008.475 5.783h.005c5.49 0 9.954-4.467 9.977-9.965 0-2.668-.704-5.192-2.034-7.322A9.822 9.822 0 0012.051 6.98zM19.913 17.52h-.016a8.366 8.366 0 01-6.08-2.386l-.436-.327-4.524 1.186.208-4.104.327-.52a8.302 8.302 0 012.368-5.748 8.325 8.325 0 015.872-2.36h.016c4.49 0 8.268 3.369 8.277 7.516.007 2.016-.435 3.716-1.541 5.157-1.047 1.32-2.923 2.686-5.062 2.686"/>
        </svg>
        
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ backgroundColor: "#25D366" }} />
      </a>
    </div>
  )
}
