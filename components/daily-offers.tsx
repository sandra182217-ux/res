"use client"

import Image from "next/image"
import { Clock } from "lucide-react"

const offers = [
  {
    id: 1,
    name: "Isca de Tilápia M",
    description: "Porção de iscas de tilápia empanadas e fritas, acompanha molho tártaro",
    originalPrice: 45.99,
    price: 29.99,
    image: "/images/tilapia.jpg",
    day: "Quarta-feira",
  },
  {
    id: 2,
    name: "Camarão Empanado M",
    description: "Porção de camarões empanados crocantes com molho especial",
    originalPrice: 69.99,
    price: 49.99,
    image: "/images/camarao.jpg",
    day: "Quinta-feira",
  },
  {
    id: 3,
    name: "Chopp + Porção",
    description: "1 Chopp 500ml + Porção de batata frita com bacon",
    originalPrice: 42.00,
    price: 29.90,
    image: "/images/drinks.jpg",
    day: "Sexta-feira",
  },
]

export function DailyOffers() {
  return (
    <section id="ofertas" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium tracking-widest uppercase text-sm font-sans">
            Promoções
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4 font-sans">
            Ofertas do Dia
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-foreground/60 max-w-2xl mx-auto font-sans">
            Aproveite nossas promoções especiais de cada dia da semana
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={offer.image}
                  alt={offer.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 font-sans">
                  <Clock className="w-4 h-4" />
                  {offer.day}
                </div>
                <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium uppercase font-sans">
                  Oferta
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors font-sans">
                  {offer.name}
                </h3>
                <p className="text-foreground/50 text-sm mb-4 line-clamp-2 font-sans">
                  {offer.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="text-foreground/40 line-through text-sm font-sans">
                    R$ {offer.originalPrice.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-xl font-bold text-primary font-sans">
                    R$ {offer.price.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                {/* CTA */}
                <a
                  href="https://wa.me/5548936224040?text=Olá! Gostaria de fazer um pedido da oferta do dia."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Pedir Agora
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
