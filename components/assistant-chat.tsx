"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Mic, Send } from "lucide-react"
import type { MensajeChat } from "@/lib/types"
import { sendAssistantMessage } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export function AssistantChat() {
  const [mensajes, setMensajes] = useState<MensajeChat[]>([
    {
      id: "1",
      remitente: "ai",
      texto: "Hola Dr. León, ¿en qué puedo ayudarle hoy?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [mensajes])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: MensajeChat = {
      id: Date.now().toString(),
      remitente: "user",
      texto: input.trim(),
      timestamp: new Date().toISOString(),
    }

    setMensajes((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await sendAssistantMessage({
        messages: [{ role: "user", content: userMessage.texto }],
        context: { doctorName: "Dr. León" },
      })

      const aiMessage: MensajeChat = {
        id: (Date.now() + 1).toString(),
        remitente: "ai",
        texto: response.reply,
        timestamp: new Date().toISOString(),
      }

      setMensajes((prev) => [...prev, aiMessage])
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo obtener respuesta del asistente",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mensajes.map((mensaje) => (
          <div key={mensaje.id} className={`flex ${mensaje.remitente === "user" ? "justify-end" : "justify-start"}`}>
            <Card
              className={`max-w-[80%] p-4 rounded-2xl ${
                mensaje.remitente === "user" ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"
              }`}
            >
              <p className="text-sm leading-relaxed">{mensaje.texto}</p>
              <span className="text-xs opacity-70 mt-2 block">
                {new Date(mensaje.timestamp).toLocaleTimeString("es-MX", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </Card>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <Card className="max-w-[80%] p-4 rounded-2xl bg-card">
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]" />
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            className="rounded-2xl shrink-0 bg-transparent"
            aria-label="Grabar audio"
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escriba su mensaje..."
            disabled={loading}
            className="rounded-2xl"
          />
          <Button onClick={handleSend} disabled={!input.trim() || loading} className="rounded-2xl shrink-0">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
