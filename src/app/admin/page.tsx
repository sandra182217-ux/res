import { createClient } from "@/lib/supabase/server"
import { 
  UtensilsCrossed, 
  Tag, 
  Star, 
  Image,
  TrendingUp,
  Calendar
} from "lucide-react"

async function getStats() {
  const supabase = await createClient()
  
  const [menuItems, dailyOffers, specialties, images] = await Promise.all([
    supabase.from("menu_items").select("id", { count: "exact" }),
    supabase.from("daily_offers").select("id", { count: "exact" }),
    supabase.from("specialties").select("id", { count: "exact" }),
    supabase.from("site_images").select("id", { count: "exact" }),
  ])

  return {
    menuItems: menuItems.count || 0,
    dailyOffers: dailyOffers.count || 0,
    specialties: specialties.count || 0,
    images: images.count || 0,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    { 
      label: "Itens do Cardápio", 
      value: stats.menuItems, 
      icon: UtensilsCrossed, 
      color: "bg-blue-500",
      href: "/admin/menu"
    },
    { 
      label: "Ofertas do Dia", 
      value: stats.dailyOffers, 
      icon: Tag, 
      color: "bg-green-500",
      href: "/admin/offers"
    },
    { 
      label: "Especialidades", 
      value: stats.specialties, 
      icon: Star, 
      color: "bg-yellow-500",
      href: "/admin/specialties"
    },
    { 
      label: "Imagens", 
      value: stats.images, 
      icon: Image, 
      color: "bg-purple-500",
      href: "/admin/images"
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary">Dashboard</h1>
        <p className="text-foreground/60">Bem-vindo ao painel de administração do Floripa Bar</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-foreground/30 group-hover:text-primary transition-colors" />
            </div>
            <p className="text-3xl font-bold text-secondary">{card.value}</p>
            <p className="text-sm text-foreground/60">{card.label}</p>
          </a>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-secondary mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/admin/menu"
            className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <UtensilsCrossed className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">Adicionar Item</p>
              <p className="text-sm text-foreground/60">Novo item no cardápio</p>
            </div>
          </a>
          <a
            href="/admin/offers"
            className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <Tag className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">Nova Oferta</p>
              <p className="text-sm text-foreground/60">Criar promoção do dia</p>
            </div>
          </a>
          <a
            href="/admin/images"
            className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <Image className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">Upload de Imagem</p>
              <p className="text-sm text-foreground/60">Adicionar nova imagem</p>
            </div>
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-secondary">Horário de Funcionamento</h3>
            <p className="text-foreground/70 mt-1">
              Quarta a Domingo, das 18h às 00h. As alterações no cardápio e ofertas são 
              atualizadas em tempo real no site.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
