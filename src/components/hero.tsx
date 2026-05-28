import Image from "next/image"
import { MapPin, Clock } from "lucide-react"

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Frutos do Mar */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-frutos-do-mar.jpg"
          alt="Frutos do mar"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        {/* Logo Principal */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/floripa-bar-logo.png"
            alt="Floripa Bar"
            width={320}
            height={320}
            className="drop-shadow-[0_0_40px_rgba(200,160,80,0.4)]"
            priority
          />
        </div>
        
        <p className="text-3xl md:text-5xl text-secondary font-extrabold tracking-tight mb-6 drop-shadow-sm">
          Bar, Restaurante e Frutos do Mar
        </p>
        
        <div className="w-32 h-1.5 bg-primary mx-auto my-8 rounded-full" />
        
        <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-semibold bg-secondary/60 backdrop-blur-sm px-6 py-4 rounded-2xl">
          O sabor do mar na sua mesa. Camarão, tilápia, drinks gelados e o melhor 
          ambiente de Tubarão para curtir com amigos e família.
        </p>

        {/* Info Cards */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <div className="flex items-center gap-2 bg-orange-dark/80 backdrop-blur-sm px-4 py-2 rounded-full">
            <MapPin className="text-primary" size={20} />
            <span className="text-white text-sm">Tubarão, SC</span>
          </div>
          <div className="flex items-center gap-2 bg-orange-dark/80 backdrop-blur-sm px-4 py-2 rounded-full">
            <Clock className="text-primary" size={20} />
            <span className="text-white text-sm">Qua - Dom: 18h às 00h</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5548936224040"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-dark text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-orange-dark/90 transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Pedir pelo WhatsApp
          </a>
          <a
            href="#cardapio"
            className="border-2 border-orange-dark text-white bg-orange-dark/80 px-10 py-5 rounded-full font-bold text-xl hover:bg-orange-dark transition-all"
          >
            Ver Cardápio
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
