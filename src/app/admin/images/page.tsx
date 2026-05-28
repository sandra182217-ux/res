"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { SiteImage } from "@/lib/types/database"
import {
  Upload,
  Trash2,
  X,
  Loader2,
  Copy,
  Check,
  Filter,
} from "lucide-react"

const SECTIONS = [
  { value: "hero", label: "Hero/Banner Principal" },
  { value: "about", label: "Sobre Nós" },
  { value: "menu", label: "Cardápio" },
  { value: "specialties", label: "Especialidades" },
  { value: "gallery", label: "Galeria" },
  { value: "offers", label: "Ofertas" },
  { value: "other", label: "Outros" },
]

export default function ImagesPage() {
  const [images, setImages] = useState<SiteImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [filter, setFilter] = useState<string>("all")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [uploadForm, setUploadForm] = useState({
    section: "other",
    name: "",
    alt_text: "",
  })
  const supabase = createClient()

  const loadData = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from("site_images")
      .select("*")
      .order("created_at", { ascending: false })
    setImages(data || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    setUploading(true)

    for (const file of Array.from(files)) {
      const fileExt = file.name.split(".").pop()
      const fileName = `site/${uploadForm.section}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

      const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, file)

      if (!error && data) {
        const { data: urlData } = supabase.storage
          .from("images")
          .getPublicUrl(data.path)

        await supabase.from("site_images").insert({
          section: uploadForm.section,
          name: uploadForm.name || file.name,
          url: urlData.publicUrl,
          alt_text: uploadForm.alt_text || null,
        })
      }
    }

    await loadData()
    setUploadForm({ section: "other", name: "", alt_text: "" })
    setUploading(false)
  }

  const handleDelete = async (image: SiteImage) => {
    if (!confirm("Tem certeza que deseja excluir esta imagem?")) return

    // Extract path from URL
    const urlParts = image.url.split("/storage/v1/object/public/images/")
    if (urlParts[1]) {
      await supabase.storage.from("images").remove([urlParts[1]])
    }
    await supabase.from("site_images").delete().eq("id", image.id)
    loadData()
  }

  const copyUrl = async (url: string, id: string) => {
    await navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredImages = filter === "all" 
    ? images 
    : images.filter(img => img.section === filter)

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
      <div>
        <h1 className="text-2xl font-bold text-secondary">Imagens</h1>
        <p className="text-foreground/60">Gerencie as imagens do site</p>
      </div>

      {/* Upload Section */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-secondary mb-4">Upload de Imagens</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Seção
            </label>
            <select
              value={uploadForm.section}
              onChange={(e) => setUploadForm({ ...uploadForm, section: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {SECTIONS.map((section) => (
                <option key={section.value} value={section.value}>
                  {section.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nome (opcional)
            </label>
            <input
              type="text"
              value={uploadForm.name}
              onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nome da imagem"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Texto Alt (opcional)
            </label>
            <input
              type="text"
              value={uploadForm.alt_text}
              onChange={(e) => setUploadForm({ ...uploadForm, alt_text: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Descrição para acessibilidade"
            />
          </div>
        </div>

        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
              <span className="text-sm text-foreground/60">Fazendo upload...</span>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-foreground/40 mb-2" />
              <span className="text-sm text-foreground/60">
                Clique para fazer upload ou arraste arquivos aqui
              </span>
              <span className="text-xs text-foreground/40 mt-1">
                PNG, JPG, GIF até 10MB
              </span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-5 h-5 text-foreground/50" />
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground/70 hover:text-foreground"
          }`}
        >
          Todas
        </button>
        {SECTIONS.map((section) => (
          <button
            key={section.value}
            onClick={() => setFilter(section.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === section.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground/70 hover:text-foreground"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.length === 0 ? (
          <div className="col-span-full bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-foreground/60">Nenhuma imagem encontrada</p>
          </div>
        ) : (
          filteredImages.map((image) => (
            <div
              key={image.id}
              className="bg-card border border-border rounded-xl overflow-hidden group"
            >
              <div className="relative aspect-square">
                <img
                  src={image.url}
                  alt={image.alt_text || image.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => copyUrl(image.url, image.id)}
                    className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                    title="Copiar URL"
                  >
                    {copiedId === image.id ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-700" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(image)}
                    className="p-2 bg-white rounded-lg hover:bg-red-50 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-5 h-5 text-destructive" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="font-medium text-sm text-foreground truncate">
                  {image.name}
                </p>
                <p className="text-xs text-foreground/50">
                  {SECTIONS.find(s => s.value === image.section)?.label || image.section}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
