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
    <section id="sobre" className="py-12 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-primary font-semibold tracking-widest uppercase text-sm font-sans">
            Conheça-nos
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-secondary mt-2 mb-3 text-balance">
            A Casa do Sabor em Tubarão
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/images/ambiente.jpg"
                alt="Ambiente do Floripa Bar"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-primary rounded-xl -z-10" />
          </div>

          {/* Content */}
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold text-secondary mb-4">
              O melhor do <span className="text-primary">mar</span> e do <span className="text-primary">bar</span>
            </h3>
            
            <p className="text-foreground text-sm leading-relaxed mb-4">
              O Floripa Bar é o lugar perfeito para quem busca frutos do mar frescos 
              e saborosos, combinados com um bar completo e ambiente descontraído. 
              Localizado em Tubarão, SC, somos referência em camarão à milanesa, 
              tilápia e nossa famosa Tábua Floripa.
            </p>
            
            <p className="text-foreground text-sm leading-relaxed mb-6">
              Venha conhecer nosso espaço aconchegante, ideal para reunir a família, 
              encontrar os amigos ou simplesmente relaxar com uma cerveja gelada e 
              petiscos deliciosos. De quarta a domingo, a partir das 18h, estamos 
              prontos para te receber!
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-secondary text-sm mb-0.5">{feature.title}</h4>
                    <p className="text-foreground/70 text-xs leading-relaxed">{feature.description}</p>
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
