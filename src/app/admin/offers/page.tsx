"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { DailyOffer, FeaturedOffer } from "@/lib/types/database"
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Upload,
  Loader2,
  Star,
} from "lucide-react"

const DAYS_OF_WEEK = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
]

export default function OffersPage() {
  const [dailyOffers, setDailyOffers] = useState<DailyOffer[]>([])
  const [featuredOffer, setFeaturedOffer] = useState<FeaturedOffer | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"daily" | "featured">("daily")
  const [editingOffer, setEditingOffer] = useState<DailyOffer | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const [form, setForm] = useState({
    name: "",
    description: "",
    original_price: "",
    sale_price: "",
    day_of_week: "",
    image_url: "",
    is_active: true,
  })

  const [featuredForm, setFeaturedForm] = useState({
    name: "",
    description: "",
    original_price: "",
    sale_price: "",
    badge_text: "Oferta do Dia",
    day_text: "Sexta-feira do Chope",
    image_url: "",
    is_active: true,
  })

  const loadData = useCallback(async () => {
    setLoading(true)
    const [dailyRes, featuredRes] = await Promise.all([
      supabase.from("daily_offers").select("*").order("day_of_week"),
      supabase.from("featured_offer").select("*").limit(1).single(),
    ])
    setDailyOffers(dailyRes.data || [])
    if (featuredRes.data) {
      setFeaturedOffer(featuredRes.data)
      setFeaturedForm({
        name: featuredRes.data.name,
        description: featuredRes.data.description || "",
        original_price: featuredRes.data.original_price.toString(),
        sale_price: featuredRes.data.sale_price.toString(),
        badge_text: featuredRes.data.badge_text,
        day_text: featuredRes.data.day_text,
        image_url: featuredRes.data.image_url || "",
        is_active: featuredRes.data.is_active,
      })
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    loadData()
  }, [loadData])

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      original_price: "",
      sale_price: "",
      day_of_week: "",
      image_url: "",
      is_active: true,
    })
    setEditingOffer(null)
    setIsCreating(false)
  }

  const handleEdit = (offer: DailyOffer) => {
    setEditingOffer(offer)
    setForm({
      name: offer.name,
      description: offer.description || "",
      original_price: offer.original_price.toString(),
      sale_price: offer.sale_price.toString(),
      day_of_week: offer.day_of_week,
      image_url: offer.image_url || "",
      is_active: offer.is_active,
    })
    setIsCreating(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.original_price || !form.sale_price || !form.day_of_week) return
    setSaving(true)

    const data = {
      name: form.name,
      description: form.description || null,
      original_price: parseFloat(form.original_price),
      sale_price: parseFloat(form.sale_price),
      day_of_week: form.day_of_week,
      image_url: form.image_url || null,
      is_active: form.is_active,
      updated_at: new Date().toISOString(),
    }

    if (editingOffer) {
      await supabase.from("daily_offers").update(data).eq("id", editingOffer.id)
    } else {
      await supabase.from("daily_offers").insert(data)
    }

    await loadData()
    resetForm()
    setSaving(false)
  }

  const handleSaveFeatured = async () => {
    if (!featuredForm.name || !featuredForm.original_price || !featuredForm.sale_price) return
    setSaving(true)

    const data = {
      name: featuredForm.name,
      description: featuredForm.description || null,
      original_price: parseFloat(featuredForm.original_price),
      sale_price: parseFloat(featuredForm.sale_price),
      badge_text: featuredForm.badge_text,
      day_text: featuredForm.day_text,
      image_url: featuredForm.image_url || null,
      is_active: featuredForm.is_active,
      updated_at: new Date().toISOString(),
    }

    if (featuredOffer) {
      await supabase.from("featured_offer").update(data).eq("id", featuredOffer.id)
    } else {
      await supabase.from("featured_offer").insert(data)
    }

    await loadData()
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta oferta?")) return
    await supabase.from("daily_offers").delete().eq("id", id)
    loadData()
  }

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "daily" | "featured"
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    const fileExt = file.name.split(".").pop()
    const fileName = `offers/${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, file)

    if (!error && data) {
      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(data.path)
      
      if (type === "daily") {
        setForm({ ...form, image_url: urlData.publicUrl })
      } else {
        setFeaturedForm({ ...featuredForm, image_url: urlData.publicUrl })
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Ofertas</h1>
          <p className="text-foreground/60">Gerencie ofertas e promoções</p>
        </div>
        {activeTab === "daily" && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Nova Oferta</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("daily")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "daily"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground/70 hover:text-foreground"
          }`}
        >
          Ofertas do Dia
        </button>
        <button
          onClick={() => setActiveTab("featured")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
            activeTab === "featured"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground/70 hover:text-foreground"
          }`}
        >
          <Star className="w-4 h-4" />
          Oferta em Destaque
        </button>
      </div>

      {/* Daily Offers Tab */}
      {activeTab === "daily" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground/70">
                    Imagem
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground/70">
                    Nome
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground/70">
                    Dia
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground/70">
                    Preço
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground/70">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-foreground/70">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {dailyOffers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-foreground/60">
                      Nenhuma oferta cadastrada
                    </td>
                  </tr>
                ) : (
                  dailyOffers.map((offer) => (
                    <tr key={offer.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3">
                        {offer.image_url ? (
                          <img
                            src={offer.image_url}
                            alt={offer.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-muted rounded-lg" />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">{offer.name}</p>
                      </td>
                      <td className="px-4 py-3 text-foreground/70">{offer.day_of_week}</td>
                      <td className="px-4 py-3">
                        <span className="text-foreground/50 line-through text-sm mr-2">
                          R$ {offer.original_price.toFixed(2)}
                        </span>
                        <span className="text-primary font-semibold">
                          R$ {offer.sale_price.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            offer.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {offer.is_active ? "Ativo" : "Inativo"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(offer)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                          >
                            <Pencil className="w-4 h-4 text-foreground/70" />
                          </button>
                          <button
                            onClick={() => handleDelete(offer.id)}
                            className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Featured Offer Tab */}
      {activeTab === "featured" && (
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome do Prato *
                </label>
                <input
                  type="text"
                  value={featuredForm.name}
                  onChange={(e) => setFeaturedForm({ ...featuredForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ex: Porção de Camarão"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Texto do Badge
                </label>
                <input
                  type="text"
                  value={featuredForm.badge_text}
                  onChange={(e) => setFeaturedForm({ ...featuredForm, badge_text: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ex: Oferta do Dia"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Descrição
              </label>
              <textarea
                value={featuredForm.description}
                onChange={(e) => setFeaturedForm({ ...featuredForm, description: e.target.value })}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={2}
                placeholder="Descrição da oferta..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Preço Original *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={featuredForm.original_price}
                  onChange={(e) => setFeaturedForm({ ...featuredForm, original_price: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Preço Promocional *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={featuredForm.sale_price}
                  onChange={(e) => setFeaturedForm({ ...featuredForm, sale_price: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Texto do Dia
                </label>
                <input
                  type="text"
                  value={featuredForm.day_text}
                  onChange={(e) => setFeaturedForm({ ...featuredForm, day_text: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ex: Sexta-feira do Chope"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Imagem
              </label>
              {featuredForm.image_url ? (
                <div className="relative inline-block">
                  <img
                    src={featuredForm.image_url}
                    alt="Preview"
                    className="w-full max-w-md h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setFeaturedForm({ ...featuredForm, image_url: "" })}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full max-w-md h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="w-8 h-8 text-foreground/40 mb-2" />
                  <span className="text-sm text-foreground/60">
                    Clique para fazer upload
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "featured")}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured_is_active"
                checked={featuredForm.is_active}
                onChange={(e) => setFeaturedForm({ ...featuredForm, is_active: e.target.checked })}
                className="w-4 h-4 rounded border-border"
              />
              <label htmlFor="featured_is_active" className="text-sm text-foreground">
                Oferta ativa (visível no site)
              </label>
            </div>

            <div className="pt-4 border-t border-border">
              <button
                onClick={handleSaveFeatured}
                disabled={saving || !featuredForm.name || !featuredForm.original_price || !featuredForm.sale_price}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Salvar Oferta em Destaque</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Daily Offer Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-secondary">
                {editingOffer ? "Editar Oferta" : "Nova Oferta do Dia"}
              </h2>
              <button onClick={resetForm} className="p-2 hover:bg-muted rounded-lg">
                <X className="w-5 h-5 text-foreground/70" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ex: Tilápia Completa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Descrição
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={2}
                  placeholder="Descrição da oferta..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Dia da Semana *
                </label>
                <select
                  value={form.day_of_week}
                  onChange={(e) => setForm({ ...form, day_of_week: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Selecione um dia</option>
                  {DAYS_OF_WEEK.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Preço Original *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.original_price}
                    onChange={(e) => setForm({ ...form, original_price: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Preço Promocional *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.sale_price}
                    onChange={(e) => setForm({ ...form, sale_price: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Imagem
                </label>
                {form.image_url ? (
                  <div className="relative">
                    <img
                      src={form.image_url}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setForm({ ...form, image_url: "" })}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="w-8 h-8 text-foreground/40 mb-2" />
                    <span className="text-sm text-foreground/60">
                      Clique para fazer upload
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "daily")}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="offer_is_active"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="offer_is_active" className="text-sm text-foreground">
                  Oferta ativa (visível no site)
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={resetForm}
                className="px-4 py-2 text-foreground/70 hover:text-foreground transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name || !form.original_price || !form.sale_price || !form.day_of_week}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Salvar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
