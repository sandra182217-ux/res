/**
 * Configuração centralizada do Floripa Bar
 * Todos os dados do restaurante em um único lugar para fácil manutenção
 */

export const RESTAURANT_CONFIG = {
  // Informações básicas
  name: "Floripa Bar",
  tagline: "Bar, Restaurante e Frutos do Mar",
  description: "O melhor sabor de Tubarão, SC",

  // Contato
  phone: {
    display: "(48) 3622-4040",
    whatsapp: "5548936224040",
    tel: "+5548936224040",
  },

  // Localização
  address: {
    street: "Av. Pedro Zapelini, 1120",
    neighborhood: "Santo Antônio de Pádua",
    city: "Tubarão",
    state: "SC",
    zipCode: "88701-481",
    full: "Av. Pedro Zapelini, 1120 - Santo Antônio de Pádua, Tubarão - SC, 88701-481",
  },

  // Redes sociais
  social: {
    instagram: {
      url: "https://www.instagram.com/floripa.bar",
      handle: "@floripa.bar",
    },
    whatsapp: {
      url: "https://wa.me/5548936224040",
    },
    googleMaps: {
      url: "https://maps.google.com/?q=Av.+Pedro+Zapelini,+1120+-+Santo+Antônio+de+Pádua,+Tubarão+-+SC",
    },
  },

  // Horário de funcionamento
  schedule: [
    { day: "Segunda-feira", hours: "Fechado" },
    { day: "Terça-feira", hours: "Fechado" },
    { day: "Quarta-feira", hours: "18:00 - 00:00" },
    { day: "Quinta-feira", hours: "18:00 - 00:00" },
    { day: "Sexta-feira", hours: "18:00 - 00:00" },
    { day: "Sábado", hours: "18:00 - 00:00" },
    { day: "Domingo", hours: "18:00 - 00:00" },
  ],

  // Cores da marca
  colors: {
    primary: "#10b981", // Green
    secondary: "#1f2937", // Dark gray
  },
}

/**
 * Função auxiliar para gerar URL do WhatsApp com mensagem pré-formatada
 */
export function getWhatsAppUrl(message?: string): string {
  const baseUrl = `https://wa.me/${RESTAURANT_CONFIG.phone.whatsapp}`
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`
  }
  return baseUrl
}

/**
 * Função auxiliar para gerar URL do Google Maps
 */
export function getGoogleMapsUrl(): string {
  return RESTAURANT_CONFIG.social.googleMaps.url
}

/**
 * Função auxiliar para verificar se o restaurante está aberto
 */
export function isRestaurantOpen(): boolean {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const currentTime = hours * 60 + minutes

  // Segunda (1) e Terça (2) fechado
  if (dayOfWeek === 1 || dayOfWeek === 2) {
    return false
  }

  // Quarta a domingo: 18:00 - 00:00
  const openTime = 18 * 60 // 18:00
  const closeTime = 24 * 60 // 00:00

  return currentTime >= openTime || currentTime < closeTime
}
