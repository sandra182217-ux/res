"use client"

import Image from "next/image"
import { Flame, Clock } from "lucide-react"

export function FeaturedOffer() {
  return (
    <section className="py-8 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-r from-secondary via-secondary/95 to-secondary rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.png')] bg-repeat" />
          </div>
          
          <div className="relative flex flex-col lg:flex-row items-center gap-6 lg:gap-12 p-6 lg:p-10">
            {/* Badge */}
            <div className="absolute top-4 left-4 lg:top-6 lg:left-6 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase animate-pulse shadow-lg">
              <Flame className="w-5 h-5" />
              Oferta do Dia
            </div>
            
            {/* Image */}
            <div className="relative w-full lg:w-1/3 mt-12 lg:mt-0">
              <div className="relative aspect-square max-w-[280px] mx-auto">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl" />
                <Image
                  src="/images/caneca-chope.png"
                  alt="Caneca de Chope 500ml"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Sexta-feira do Chope
                </span>
              </div>
              
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                Caneca de Chope 500ml
              </h2>
              
              <p className="text-white/80 text-base md:text-lg mb-6 max-w-xl">
                Chope gelado e cremoso, servido na temperatura ideal. 
                Aproveite nossa promoção especial toda sexta-feira!
              </p>
              
              {/* Price */}
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <span className="text-white/50 line-through text-xl md:text-2xl">
                  R$ 12,99
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-primary text-lg font-bold">R$</span>
                  <span className="text-primary text-5xl md:text-6xl font-extrabold">
                    4,99
                  </span>
                </div>
              </div>
              
              {/* CTA */}
              <a
                href="https://wa.me/5548936224040?text=Olá! Gostaria de aproveitar a promoção da Sexta-feira do Chope!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-lg shadow-primary/30"
              >
                Quero Aproveitar!
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
