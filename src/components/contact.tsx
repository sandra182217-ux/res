import { MapPin, Phone, Clock } from "lucide-react"
import { ContactForm } from "./contact-form"
import { RESTAURANT_CONFIG } from "@/lib/config"

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

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 lg:col-span-2">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ color: "#EA4335" }}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-secondary mb-2">Endereço</h3>
                <p className="text-foreground text-sm">
                  {RESTAURANT_CONFIG.address.street}<br />
                  {RESTAURANT_CONFIG.address.neighborhood}<br />
                  {RESTAURANT_CONFIG.address.city} - {RESTAURANT_CONFIG.address.state}, {RESTAURANT_CONFIG.address.zipCode}
                </p>
                <a
                  href={RESTAURANT_CONFIG.social.googleMaps.url}
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
              <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ color: "#25D366" }}
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.783 1.14L1.07 3.591l1.378 4.631a9.797 9.797 0 00.2 8.531 9.829 9.829 0 008.475 5.783h.005c5.49 0 9.954-4.467 9.977-9.965 0-2.668-.704-5.192-2.034-7.322A9.822 9.822 0 0012.051 6.98zM19.913 17.52h-.016a8.366 8.366 0 01-6.08-2.386l-.436-.327-4.524 1.186.208-4.104.327-.52a8.302 8.302 0 012.368-5.748 8.325 8.325 0 015.872-2.36h.016c4.49 0 8.268 3.369 8.277 7.516.007 2.016-.435 3.716-1.541 5.157-1.047 1.32-2.923 2.686-5.062 2.686"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-secondary mb-2">Telefone / WhatsApp</h3>
                <a
                  href={`tel:${RESTAURANT_CONFIG.phone.tel}`}
                  className="text-foreground hover:text-primary transition-colors text-base"
                >
                  {RESTAURANT_CONFIG.phone.display}
                </a>
                <div className="mt-3">
                  <a
                    href={RESTAURANT_CONFIG.social.whatsapp.url}
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
              <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ color: "#E4405F" }}
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-secondary mb-2">Instagram</h3>
                <a
                  href={RESTAURANT_CONFIG.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground text-sm hover:text-primary transition-colors"
                >
                  {RESTAURANT_CONFIG.social.instagram.handle}
                </a>
              </div>
            </div>

            {/* Schedule */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ color: "#4285F4" }}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-extrabold text-secondary mb-4">Horário de Funcionamento</h3>
                <div className="space-y-2">
                  {RESTAURANT_CONFIG.schedule.map((schedule, index) => (
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

          {/* Contact Form */}
          <div className="bg-card rounded-2xl shadow-xl p-8 h-fit sticky top-6">
            <h3 className="text-2xl font-extrabold text-secondary mb-6">Envie uma Mensagem</h3>
            <ContactForm />
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extrabold text-secondary mb-4">Visite-nos no Mapa</h3>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3521.1234567890123!2d-49.0123456!3d-28.4567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAv.+Pedro+Zapelini%2C+1120+-+Santo+Ant%C3%B4nio+de+P%C3%A1dua%2C+Tubar%C3%A3o+-+SC!5e0!3m2!1spt-BR!2sbr!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Localização ${RESTAURANT_CONFIG.name}`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
