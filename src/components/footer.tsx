import { MapPin } from "lucide-react"
import { RESTAURANT_CONFIG } from "@/lib/config"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary/50 border-t border-border/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold text-primary mb-4">{RESTAURANT_CONFIG.name}</h4>
            <p className="text-foreground/60 text-sm">
              {RESTAURANT_CONFIG.tagline}<br />
              {RESTAURANT_CONFIG.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-foreground font-semibold mb-4">Links Rápidos</h4>
            <nav className="flex flex-wrap justify-center gap-4">
              <a href="#inicio" className="text-foreground/60 hover:text-primary transition-colors text-sm">
                Início
              </a>
              <a href="#sobre" className="text-foreground/60 hover:text-primary transition-colors text-sm">
                Sobre
              </a>
              <a href="#cardapio" className="text-foreground/60 hover:text-primary transition-colors text-sm">
                Cardápio
              </a>
              <a href="#contato" className="text-foreground/60 hover:text-primary transition-colors text-sm">
                Contato
              </a>
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="text-center md:text-right">
            <h4 className="text-foreground font-semibold mb-4">Siga-nos</h4>
            <div className="flex justify-center md:justify-end gap-4 mb-4">
              {/* Instagram */}
              <a
                href={RESTAURANT_CONFIG.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="url(#insta-gradient)"
                >
                  <defs>
                    <linearGradient id="insta-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: "#FD5949", stopOpacity: 1 }} />
                      <stop offset="5%" style={{ stopColor: "#D6249F", stopOpacity: 1 }} />
                      <stop offset="45%" style={{ stopColor: "#285AEB", stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href={RESTAURANT_CONFIG.social.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="#25D366"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.783 1.14L1.07 3.591l1.378 4.631a9.797 9.797 0 00.2 8.531 9.829 9.829 0 008.475 5.783h.005c5.49 0 9.954-4.467 9.977-9.965 0-2.668-.704-5.192-2.034-7.322A9.822 9.822 0 0012.051 6.98zM19.913 17.52h-.016a8.366 8.366 0 01-6.08-2.386l-.436-.327-4.524 1.186.208-4.104.327-.52a8.302 8.302 0 012.368-5.748 8.325 8.325 0 015.872-2.36h.016c4.49 0 8.268 3.369 8.277 7.516.007 2.016-.435 3.716-1.541 5.157-1.047 1.32-2.923 2.686-5.062 2.686"/>
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/p/Floripa-Bar-100069710591616/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="#1877F2"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Google Maps */}
              <a
                href={RESTAURANT_CONFIG.social.googleMaps.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Google Maps"
                title="Localização"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <defs>
                    <linearGradient id="maps-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#EA4335", stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: "#FBBC04", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#34A853", stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path fill="url(#maps-gradient)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                </svg>
              </a>
            </div>
            <p className="text-foreground/50 text-sm">
              {RESTAURANT_CONFIG.phone.display}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/30 mt-8 pt-8">
          <p className="text-center text-foreground/40 text-sm">
            &copy; {currentYear} {RESTAURANT_CONFIG.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
