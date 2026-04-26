import Image from "next/image"
import { Beer, Fish, Users, Heart } from "lucide-react"

const features = [
  {
    icon: Fish,
    title: "Frutos do Mar",
    description: "Camarão, tilápia e lula sempre frescos e preparados com carinho"
  },
  {
    icon: Beer,
    title: "Bar Completo",
    description: "Cervejas geladas, drinks especiais e as melhores caipirinhas"
  },
  {
    icon: Users,
    title: "Ambiente Familiar",
    description: "Espaço aconchegante perfeito para toda a família e amigos"
  },
  {
    icon: Heart,
    title: "Feito com Amor",
    description: "Cada prato é preparado com dedicação e ingredientes selecionados"
  }
]

export function About() {
  return (
    <section id="sobre" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            Conheça-nos
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4 text-balance">
            A Casa do Sabor em Tubarão
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/ambiente.jpg"
                alt="Ambiente do Floripa Bar"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-primary rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              O melhor do <span className="text-primary">mar</span> e do <span className="text-primary">bar</span>
            </h3>
            
            <p className="text-foreground/70 text-lg leading-relaxed mb-6">
              O Floripa Bar é o lugar perfeito para quem busca frutos do mar frescos 
              e saborosos, combinados com um bar completo e ambiente descontraído. 
              Localizado em Tubarão, SC, somos referência em camarão à milanesa, 
              tilápia e nossa famosa Tábua Floripa.
            </p>
            
            <p className="text-foreground/70 text-lg leading-relaxed mb-8">
              Venha conhecer nosso espaço aconchegante, ideal para reunir a família, 
              encontrar os amigos ou simplesmente relaxar com uma cerveja gelada e 
              petiscos deliciosos. De quarta a domingo, a partir das 18h, estamos 
              prontos para te receber!
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-foreground/60 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
