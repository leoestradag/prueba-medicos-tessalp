"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Cita, Paciente } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { sendWhatsAppMessage } from "@/lib/api"

interface WhatsAppModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cita?: Cita
  paciente?: Paciente
}

export function WhatsAppModal({ open, onOpenChange, cita, paciente }: WhatsAppModalProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  // Generar mensaje prellenado
  const defaultMessage =
    cita && paciente
      ? `Hola ${paciente.nombre}, le confirmamos su cita el ${new Date(cita.fechaISO).toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" })} a las ${new Date(cita.fechaISO).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })} con el Dr. León. Motivo: ${cita.motivo}.`
      : ""

  const handleSend = async () => {
    if (!paciente || !message.trim()) return

    setLoading(true)
    try {
      await sendWhatsAppMessage({
        to: paciente.telefono,
        message: message.trim(),
      })

      toast({
        title: "Mensaje enviado",
        description: `WhatsApp enviado a ${paciente.nombre}`,
      })

      onOpenChange(false)
      setMessage("")
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Enviar mensaje por WhatsApp</DialogTitle>
          <DialogDescription>
            Enviar mensaje a {paciente?.nombre} ({paciente?.telefono})
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
              id="message"
              value={message || defaultMessage}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              placeholder="Escriba su mensaje aquí..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSend} disabled={loading || !message.trim()}>
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
