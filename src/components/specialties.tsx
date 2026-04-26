import Image from "next/image"

const specialties = [
  {
    name: "Camarão à Milanesa",
    description: "Camarões empanados e fritos, crocantes por fora e suculentos por dentro",
    price: "A partir de R$ 65",
    image: "/images/camarao.jpg"
  },
  {
    name: "Isca de Tilápia",
    description: "Filé de tilápia em iscas empanadas, acompanha molho especial",
    price: "A partir de R$ 45",
    image: "/images/tilapia.jpg"
  },
  {
    name: "Drinks Especiais",
    description: "Caipirinhas, piña colada, gin tônica e muito mais",
    price: "A partir de R$ 18",
    image: "/images/drinks.jpg"
  }
]

export function Specialties() {
  return (
    <section id="especialidades" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-widest uppercase text-sm font-sans">
            Sabores Únicos
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4 text-balance">
            Nossas Especialidades
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-foreground/70 max-w-3xl mx-auto text-base font-normal">
            Pratos preparados com ingredientes frescos e o carinho que faz toda a diferença
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {specialties.map((item, index) => (
            <div 
              key={index} 
              className="group bg-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
                    {item.price}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{item.name}</h3>
                <p className="text-foreground/60 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Box */}
        <div className="mt-16 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Tábua Floripa
          </h3>
          <p className="text-foreground max-w-3xl mx-auto mb-8 text-base">
            Nossa especialidade da casa! Camarão à milanesa, isca de tilápia, lula à milanesa, 
            fritas e muito mais em uma tábua completa para compartilhar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <span className="text-3xl font-bold text-primary">R$ 145,00</span>
            <a
              href="https://wa.me/5548936224040?text=Olá! Gostaria de fazer um pedido da Tábua Floripa"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg"
            >
              Pedir Agora
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
