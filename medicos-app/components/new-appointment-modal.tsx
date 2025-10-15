"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NewAppointmentModalProps {
  onAppointmentCreated: (appointment: {
    nombre: string
    telefono: string
    fecha: string
    motivo: string
  }) => void
}

export function NewAppointmentModal({ onAppointmentCreated }: NewAppointmentModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      nombre: formData.get("nombre") as string,
      telefono: formData.get("telefono") as string,
      fecha: formData.get("fecha") as string,
      motivo: formData.get("motivo") as string,
    }

    // Simular creación
    await new Promise((resolve) => setTimeout(resolve, 500))

    onAppointmentCreated(data)
    toast({
      title: "Cita creada",
      description: `Cita programada para ${data.nombre}`,
    })

    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <Plus className="mr-2 h-5 w-5" />
          Nueva Cita
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Programar Nueva Cita</DialogTitle>
            <DialogDescription>Complete los datos del paciente y la cita</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre del paciente</Label>
              <Input id="nombre" name="nombre" required placeholder="Ej: Juan Pérez" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input id="telefono" name="telefono" type="tel" required placeholder="+52 555 123 4567" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fecha">Fecha y hora</Label>
              <Input id="fecha" name="fecha" type="datetime-local" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="motivo">Motivo de la consulta</Label>
              <Textarea id="motivo" name="motivo" required placeholder="Ej: Consulta general" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creando..." : "Crear Cita"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
