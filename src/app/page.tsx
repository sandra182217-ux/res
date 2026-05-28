import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedOffer } from "@/components/featured-offer"
import { DailyOffers } from "@/components/daily-offers"
import { About } from "@/components/about"
import { Specialties } from "@/components/specialties"
import { Menu } from "@/components/menu"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedOffer />
      <DailyOffers />
      <About />
      <Specialties />
      <Menu />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
