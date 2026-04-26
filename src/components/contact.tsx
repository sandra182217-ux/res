import { MapPin, Phone, Clock, Instagram } from "lucide-react"

const schedules = [
  { day: "Segunda-feira", hours: "Fechado" },
  { day: "Terça-feira", hours: "Fechado" },
  { day: "Quarta-feira", hours: "18:00 - 00:00" },
  { day: "Quinta-feira", hours: "18:00 - 00:00" },
  { day: "Sexta-feira", hours: "18:00 - 00:00" },
  { day: "Sábado", hours: "18:00 - 00:00" },
  { day: "Domingo", hours: "18:00 - 00:00" },
]

export function Contact() {
  return (
    <section id="contato" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-widest uppercase text-sm font-sans">
            Visite-nos
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-secondary mt-2 mb-4 text-balance">
            Localização e Contato
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-secondary mb-2">Endereço</h3>
                <p className="text-foreground text-sm">
                  Av. Pedro Zapelini, 1120<br />
                  Santo Antônio de Pádua<br />
                  Tubarão - SC, 88701-481
                </p>
                <a
                  href="https://maps.google.com/?q=Av.+Pedro+Zapelini,+1120+-+Santo+Antônio+de+Pádua,+Tubarão+-+SC,+88701-481"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline mt-2"
                >
                  Ver no Google Maps
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Phone className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-secondary mb-2">Telefone / WhatsApp</h3>
                <a
                  href="tel:+5548936224040"
                  className="text-foreground hover:text-primary transition-colors text-base"
                >
                  (48) 3622-4040
                </a>
                <div className="mt-3">
                  <a
                    href="https://wa.me/5548936224040"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-full text-base font-bold hover:bg-green-700 transition-colors shadow-md"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chamar no WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Instagram className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-secondary mb-2">Instagram</h3>
                <a
                  href="https://www.instagram.com/floripa.bar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground text-sm hover:text-primary transition-colors"
                >
                  @floripa.bar
                </a>
              </div>
            </div>

            {/* Schedule */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Clock className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-extrabold text-secondary mb-4">Horário de Funcionamento</h3>
                <div className="space-y-2">
                  {schedules.map((schedule, index) => (
                    <div 
                      key={index} 
                      className={`flex justify-between py-2 border-b border-border/30 ${
                        schedule.hours === "Fechado" ? "text-foreground/50 text-sm" : "text-foreground text-sm"
                      }`}
                    >
                      <span>{schedule.day}</span>
                      <span className={schedule.hours !== "Fechado" ? "text-primary font-bold" : ""}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative">
            <div className="bg-card rounded-2xl overflow-hidden shadow-xl h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3521.1234567890123!2d-49.0123456!3d-28.4567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAv.+Pedro+Zapelini%2C+1120+-+Santo+Ant%C3%B4nio+de+P%C3%A1dua%2C+Tubar%C3%A3o+-+SC!5e0!3m2!1spt-BR!2sbr!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Floripa Bar"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
