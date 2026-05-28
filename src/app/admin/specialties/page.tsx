"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Specialty } from "@/lib/types/database"
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Upload,
  Loader2,
  GripVertical,
} from "lucide-react"

export default function SpecialtiesPage() {
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const [form, setForm] = useState({
    name: "",
    description: "",
    price_text: "",
    image_url: "",
  })

  const loadData = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from("specialties")
      .select("*")
      .order("sort_order")
    setSpecialties(data || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    loadData()
  }, [loadData])

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price_text: "",
      image_url: "",
    })
    setEditingSpecialty(null)
    setIsCreating(false)
  }

  const handleEdit = (specialty: Specialty) => {
    setEditingSpecialty(specialty)
    setForm({
      name: specialty.name,
      description: specialty.description || "",
      price_text: specialty.price_text,
      image_url: specialty.image_url || "",
    })
    setIsCreating(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.price_text) return
    setSaving(true)

    const data = {
      name: form.name,
      description: form.description || null,
      price_text: form.price_text,
      image_url: form.image_url || null,
      updated_at: new Date().toISOString(),
    }

    if (editingSpecialty) {
      await supabase.from("specialties").update(data).eq("id", editingSpecialty.id)
    } else {
      const maxOrder = specialties.length > 0 
        ? Math.max(...specialties.map(s => s.sort_order)) + 1 
        : 0
      await supabase.from("specialties").insert({ ...data, sort_order: maxOrder })
    }

    await loadData()
    resetForm()
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta especialidade?")) return
    await supabase.from("specialties").delete().eq("id", id)
    loadData()
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const fileExt = file.name.split(".").pop()
    const fileName = `specialties/${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, file)

    if (!error && data) {
      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(data.path)
      setForm({ ...form, image_url: urlData.publicUrl })
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
          <h1 className="text-2xl font-bold text-secondary">Especialidades</h1>
          <p className="text-foreground/60">Gerencie as especialidades da casa</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nova Especialidade</span>
        </button>
      </div>

      {/* Specialties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {specialties.length === 0 ? (
          <div className="col-span-full bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-foreground/60">Nenhuma especialidade cadastrada</p>
          </div>
        ) : (
          specialties.map((specialty) => (
            <div
              key={specialty.id}
              className="bg-card border border-border rounded-xl overflow-hidden group"
            >
              <div className="relative h-48">
                {specialty.image_url ? (
                  <img
                    src={specialty.image_url}
                    alt={specialty.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-foreground/40">Sem imagem</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleEdit(specialty)}
                    className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Pencil className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleDelete(specialty.id)}
                    className="p-2 bg-white rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-destructive" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{specialty.name}</h3>
                    {specialty.description && (
                      <p className="text-sm text-foreground/60 mt-1 line-clamp-2">
                        {specialty.description}
                      </p>
                    )}
                  </div>
                  <GripVertical className="w-5 h-5 text-foreground/30 flex-shrink-0" />
                </div>
                <p className="text-primary font-semibold mt-2">{specialty.price_text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create/Edit Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-secondary">
                {editingSpecialty ? "Editar Especialidade" : "Nova Especialidade"}
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
                  placeholder="Ex: Tábua Floripa"
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
                  rows={3}
                  placeholder="Descrição da especialidade..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Texto do Preço *
                </label>
                <input
                  type="text"
                  value={form.price_text}
                  onChange={(e) => setForm({ ...form, price_text: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ex: A partir de R$ 89,90"
                />
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
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setForm({ ...form, image_url: "" })}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="w-8 h-8 text-foreground/40 mb-2" />
                    <span className="text-sm text-foreground/60">
                      Clique para fazer upload
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
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
                disabled={saving || !form.name || !form.price_text}
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
