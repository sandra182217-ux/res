"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Send, Loader2 } from "lucide-react"
import { RESTAURANT_CONFIG } from "@/lib/config"

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast.error("Por favor, informe seu nome")
      return false
    }
    if (!formData.email.trim()) {
      toast.error("Por favor, informe seu email")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Por favor, informe um email válido")
      return false
    }
    if (!formData.phone.trim()) {
      toast.error("Por favor, informe seu telefone")
      return false
    }
    if (!formData.subject.trim()) {
      toast.error("Por favor, informe um assunto")
      return false
    }
    if (!formData.message.trim()) {
      toast.error("Por favor, informe sua mensagem")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Formatar mensagem para WhatsApp
      const whatsappMessage = `
*Novo Contato do Site*

*Nome:* ${formData.name}
*Email:* ${formData.email}
*Telefone:* ${formData.phone}
*Assunto:* ${formData.subject}

*Mensagem:*
${formData.message}
      `.trim()

      // Codificar a mensagem para URL
      const encodedMessage = encodeURIComponent(whatsappMessage)

      // Criar URL do WhatsApp
      const whatsappUrl = `https://wa.me/${RESTAURANT_CONFIG.phone.whatsapp}?text=${encodedMessage}`

      // Simular envio (em produção, você poderia salvar no banco de dados aqui)
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mostrar sucesso
      toast.success("Mensagem preparada! Redirecionando para WhatsApp...")

      // Redirecionar para WhatsApp
      setTimeout(() => {
        window.open(whatsappUrl, "_blank")
      }, 1000)

      // Limpar formulário
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Erro ao processar formulário:", error)
      toast.error("Erro ao processar o formulário. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          Nome Completo *
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Seu nome"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email *
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
          Telefone / WhatsApp *
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="(48) 99999-9999"
          value={formData.phone}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full"
          required
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
          Assunto *
        </label>
        <Input
          id="subject"
          name="subject"
          type="text"
          placeholder="Qual é o assunto da sua mensagem?"
          value={formData.subject}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full"
          required
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Mensagem *
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Descreva sua mensagem aqui..."
          value={formData.message}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full min-h-[150px] resize-none"
          required
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processando...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Enviar via WhatsApp
          </>
        )}
      </Button>

      <p className="text-xs text-foreground/60 text-center">
        * Campos obrigatórios. Você será redirecionado para WhatsApp para confirmar o envio.
      </p>
    </form>
  )
}
