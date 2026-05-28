export interface MenuCategory {
  id: string
  name: string
  icon: string
  sort_order: number
  created_at: string
  updated_at: string
}

export interface MenuItem {
  id: string
  category_id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface DailyOffer {
  id: string
  name: string
  description: string | null
  original_price: number
  sale_price: number
  day_of_week: string
  image_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface FeaturedOffer {
  id: string
  name: string
  description: string | null
  original_price: number
  sale_price: number
  badge_text: string
  day_text: string
  image_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Specialty {
  id: string
  name: string
  description: string | null
  price_text: string
  image_url: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export interface SiteContent {
  id: string
  section: string
  title: string | null
  subtitle: string | null
  description: string | null
  extra_data: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface SiteImage {
  id: string
  section: string
  name: string
  url: string
  alt_text: string | null
  created_at: string
  updated_at: string
}
