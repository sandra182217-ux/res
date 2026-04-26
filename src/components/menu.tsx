"use client"

import { useState } from "react"
import { Fish, Beer, Utensils, Wine, Sandwich } from "lucide-react"

const categories = [
  { id: "frutos", label: "Frutos do Mar", icon: Fish },
  { id: "porcoes", label: "Porções", icon: Utensils },
  { id: "lanches", label: "Lanches", icon: Sandwich },
  { id: "drinks", label: "Drinks", icon: Wine },
  { id: "cervejas", label: "Cervejas", icon: Beer },
]

const menuItems: Record<string, Array<{name: string, description: string, price: string}>> = {
  frutos: [
    { name: "Camarão à Milanesa M", description: "500g de camarão empanado", price: "R$ 65,00" },
    { name: "Camarão à Milanesa G", description: "1kg de camarão empanado", price: "R$ 110,00" },
    { name: "Camarão Completo M", description: "500g de camarão, fritas, arroz branco e à grega", price: "R$ 105,00" },
    { name: "Camarão Completo G", description: "1kg de camarão, fritas, arroz branco e à grega", price: "R$ 160,00" },
    { name: "Isca de Tilápia M", description: "500g de tilápia empanada", price: "R$ 45,00" },
    { name: "Isca de Tilápia G", description: "1kg de tilápia empanada", price: "R$ 80,00" },
    { name: "Lula à Milanesa M", description: "500g de lula empanada", price: "R$ 50,00" },
    { name: "Lula à Milanesa G", description: "1kg de lula empanada", price: "R$ 80,00" },
    { name: "Tábua Floripa", description: "Camarão, tilápia, lula à milanesa, marisco e fritas", price: "R$ 145,00" },
    { name: "Casquinha de Siri", description: "Unidade", price: "R$ 8,00" },
    { name: "Bolinho de Siri", description: "Porção com 8 unidades", price: "R$ 30,00" },
    { name: "Camarão à Parmegiana", description: "Com arroz e fritas", price: "R$ 100,00" },
  ],
  porcoes: [
    { name: "Fritas M", description: "450g de batata frita", price: "R$ 25,00" },
    { name: "Fritas G", description: "800g de batata frita", price: "R$ 30,00" },
    { name: "Fritas com Bacon e Cheddar M", description: "500g", price: "R$ 35,00" },
    { name: "Fritas com Bacon e Cheddar G", description: "1kg", price: "R$ 50,00" },
    { name: "Isca de Carne M", description: "500g de isca bovina", price: "R$ 40,00" },
    { name: "Isca de Carne G", description: "1kg de isca bovina", price: "R$ 60,00" },
    { name: "Isca de Frango", description: "Frango em cubos empanados", price: "R$ 35,00" },
    { name: "Porção de Frios", description: "Queijo, presunto, calabresa, ovo de codorna e azeitona", price: "R$ 25,00" },
    { name: "Anéis de Cebola", description: "400g de anéis empanados", price: "R$ 25,00" },
    { name: "Tábua de Carne M", description: "Bovina, frango, coração, calabresa, salsicha e fritas", price: "R$ 120,00" },
    { name: "Tábua de Carne G", description: "Porção grande completa", price: "R$ 160,00" },
  ],
  lanches: [
    { name: "Misto Quente", description: "Pão, queijo e presunto", price: "R$ 16,00" },
    { name: "X-Burger", description: "Pão, hambúrguer, queijo e presunto", price: "R$ 18,00" },
    { name: "X-Salada", description: "Hambúrguer, queijo, presunto, alface, tomate e salada", price: "R$ 23,00" },
    { name: "X-Bacon", description: "Hambúrguer, bacon, queijo, presunto e salada", price: "R$ 26,00" },
    { name: "X-Calabresa", description: "Hambúrguer, calabresa, queijo, presunto e salada", price: "R$ 26,00" },
    { name: "X-Coração", description: "Hambúrguer, coração, queijo, presunto e salada", price: "R$ 26,00" },
    { name: "X-Floripa", description: "Hambúrguer, galinha, bacon, calabresa, queijo e salada", price: "R$ 30,00" },
    { name: "X-Camarão", description: "Camarão, queijo, alface, tomate e salada", price: "R$ 30,00" },
    { name: "Prensadão", description: "2 salsichas, queijo, tomate e salada", price: "R$ 28,00" },
  ],
  drinks: [
    { name: "Caipirinha de Cachaça", description: "Limão, cachaça e açúcar", price: "R$ 18,00" },
    { name: "Caipirinha de Vodka", description: "Limão, vodka e açúcar", price: "R$ 18,00" },
    { name: "Caipirinha de Morango", description: "Morango, cachaça e açúcar", price: "R$ 20,00" },
    { name: "Piña Colada", description: "Leite de coco, leite condensado, abacaxi e rum", price: "R$ 20,00" },
    { name: "Gin Tropical", description: "Gin, laranja e energético", price: "R$ 18,00" },
    { name: "Gin Tônica", description: "Gin e água tônica", price: "R$ 18,00" },
    { name: "Gin Morango", description: "Gin, morango, água tônica e açúcar", price: "R$ 20,00" },
    { name: "Espanhola", description: "Vinho tinto suave, abacaxi, leite condensado e gelo", price: "R$ 20,00" },
    { name: "Dose de Whisky", description: "Dose individual", price: "R$ 15,00" },
    { name: "Taça de Vinho", description: "Vinho tinto ou branco", price: "R$ 15,00" },
  ],
  cervejas: [
    { name: "Chopp 500ml", description: "Pilsen/Lager", price: "R$ 5,00" },
    { name: "Brahma 600ml", description: "Cerveja Pilsen", price: "R$ 13,00" },
    { name: "Skol 600ml", description: "Cerveja Pilsen", price: "R$ 13,00" },
    { name: "Original 600ml", description: "Cerveja Pilsen", price: "R$ 16,00" },
    { name: "Budweiser 600ml", description: "Cerveja American Lager", price: "R$ 16,00" },
    { name: "Heineken 600ml", description: "Cerveja Premium Lager", price: "R$ 18,00" },
    { name: "Eisenbahn 600ml", description: "Cerveja artesanal", price: "R$ 10,00" },
    { name: "Estrella Galícia 600ml", description: "Cerveja espanhola", price: "R$ 11,00" },
    { name: "Therezópolis 600ml", description: "Cerveja premium", price: "R$ 11,00" },
    { name: "Amstel", description: "Cerveja puro malte", price: "R$ 10,00" },
  ],
}

export function Menu() {
  const [activeCategory, setActiveCategory] = useState("frutos")

  return (
    <section id="cardapio" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            Delícias
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4 text-balance">
            Nosso Cardápio
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Conheça nossos pratos preparados com ingredientes frescos e muito sabor
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-foreground/70 hover:bg-card/80 hover:text-foreground"
              }`}
            >
              <category.icon size={20} />
              <span className="hidden sm:inline">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems[activeCategory]?.map((item, index) => (
            <div
              key={index}
              className="bg-card p-5 rounded-xl border border-border/50 hover:border-primary/50 transition-all group"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-foreground/50 text-sm mt-1">{item.description}</p>
                </div>
                <span className="text-primary font-bold whitespace-nowrap">{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-foreground/60 mb-4">
            Quer ver o cardápio completo ou fazer um pedido?
          </p>
          <a
            href="https://wa.me/5548936224040?text=Olá! Gostaria de ver o cardápio completo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all hover:scale-105"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Pedir pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
