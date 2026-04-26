import { Instagram, Phone, MapPin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary/50 border-t border-border/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold text-primary mb-4">Floripa Bar</h4>
            <p className="text-foreground/60 text-sm">
              Bar, Restaurante e Frutos do Mar<br />
              O melhor sabor de Tubarão, SC
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
              <a
                href="https://www.instagram.com/floripa.bar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="text-primary" size={20} />
              </a>
              <a
                href="https://wa.me/5548936224040"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="text-primary" size={20} />
              </a>
              <a
                href="https://maps.google.com/?q=Av.+Pedro+Zapelini,+1120+-+Santo+Antônio+de+Pádua,+Tubarão+-+SC"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors"
                aria-label="Google Maps"
              >
                <MapPin className="text-primary" size={20} />
              </a>
            </div>
            <p className="text-foreground/50 text-sm">
              (48) 3622-4040
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/30 mt-8 pt-8">
          <p className="text-center text-foreground/40 text-sm">
            &copy; {currentYear} Floripa Bar. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
