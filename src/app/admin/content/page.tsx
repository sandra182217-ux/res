"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { SiteContent } from "@/lib/types/database"
import { Save, Loader2, FileText } from "lucide-react"

const CONTENT_SECTIONS = [
  { 
    key: "hero", 
    label: "Hero/Banner Principal",
    fields: ["title", "subtitle", "description"]
  },
  { 
    key: "about", 
    label: "Sobre Nós",
    fields: ["title", "subtitle", "description"]
  },
  { 
    key: "menu", 
    label: "Cardápio",
    fields: ["title", "subtitle"]
  },
  { 
    key: "specialties", 
    label: "Especialidades",
    fields: ["title", "subtitle"]
  },
  { 
    key: "offers", 
    label: "Ofertas",
    fields: ["title", "subtitle"]
  },
  { 
    key: "contact", 
    label: "Contato/Localização",
    fields: ["title", "subtitle", "description"]
  },
  { 
    key: "footer", 
    label: "Rodapé",
    fields: ["description"]
  },
]

export default function ContentPage() {
  const [contents, setContents] = useState<Record<string, SiteContent>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState("hero")
  const supabase = createClient()

  const [forms, setForms] = useState<Record<string, {
    title: string
    subtitle: string
    description: string
  }>>({})

  const loadData = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from("site_content").select("*")
    
    const contentMap: Record<string, SiteContent> = {}
    const formMap: Record<string, { title: string; subtitle: string; description: string }> = {}
    
    data?.forEach(item => {
      contentMap[item.section] = item
      formMap[item.section] = {
        title: item.title || "",
        subtitle: item.subtitle || "",
        description: item.description || "",
      }
    })

    // Initialize empty forms for sections without data
    CONTENT_SECTIONS.forEach(section => {
      if (!formMap[section.key]) {
        formMap[section.key] = { title: "", subtitle: "", description: "" }
      }
    })

    setContents(contentMap)
    setForms(formMap)
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSave = async (sectionKey: string) => {
    setSaving(sectionKey)
    const form = forms[sectionKey]

    const data = {
      section: sectionKey,
      title: form.title || null,
      subtitle: form.subtitle || null,
      description: form.description || null,
      updated_at: new Date().toISOString(),
    }

    if (contents[sectionKey]) {
      await supabase.from("site_content").update(data).eq("id", contents[sectionKey].id)
    } else {
      await supabase.from("site_content").insert(data)
    }

    await loadData()
    setSaving(null)
  }

  const updateForm = (sectionKey: string, field: string, value: string) => {
    setForms(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value,
      }
    }))
  }

  const currentSection = CONTENT_SECTIONS.find(s => s.key === activeSection)

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
        <h1 className="text-2xl font-bold text-secondary">Conteúdo do Site</h1>
        <p className="text-foreground/60">Edite os textos das seções do site</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sections List */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-4">
            <h2 className="font-semibold text-foreground mb-4">Seções</h2>
            <div className="space-y-1">
              {CONTENT_SECTIONS.map((section) => (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                    activeSection === section.key
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-secondary">
                {currentSection?.label}
              </h2>
              <button
                onClick={() => handleSave(activeSection)}
                disabled={saving === activeSection}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {saving === activeSection ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Salvar</span>
              </button>
            </div>

            <div className="space-y-4">
              {currentSection?.fields.includes("title") && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    value={forms[activeSection]?.title || ""}
                    onChange={(e) => updateForm(activeSection, "title", e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Título da seção"
                  />
                </div>
              )}

              {currentSection?.fields.includes("subtitle") && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subtítulo
                  </label>
                  <input
                    type="text"
                    value={forms[activeSection]?.subtitle || ""}
                    onChange={(e) => updateForm(activeSection, "subtitle", e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Subtítulo da seção"
                  />
                </div>
              )}

              {currentSection?.fields.includes("description") && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={forms[activeSection]?.description || ""}
                    onChange={(e) => updateForm(activeSection, "description", e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows={6}
                    placeholder="Descrição ou texto principal da seção"
                  />
                </div>
              )}
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-foreground/60">
                <strong>Dica:</strong> As alterações serão refletidas automaticamente no site após salvar.
                Certifique-se de revisar o conteúdo antes de publicar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
