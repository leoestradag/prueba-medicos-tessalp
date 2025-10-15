"use client"

import { useEffect, useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Paciente, Llamada } from "@/lib/types"
import { Phone, CheckCircle, XCircle, ExternalLink } from "lucide-react"

interface CallStatusDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  callId?: string
  paciente?: Paciente
}

export function CallStatusDrawer({ open, onOpenChange, callId, paciente }: CallStatusDrawerProps) {
  const [llamada, setLlamada] = useState<Llamada | null>(null)

  useEffect(() => {
    if (!callId || !paciente) return

    // Simular estados de llamada en demo mode
    const DEMO_MODE = !process.env.NEXT_PUBLIC_API_BASE_URL

    if (DEMO_MODE) {
      // Iniciar con estado en_curso
      setLlamada({
        id: callId,
        pacienteId: paciente.id,
        estado: "en_curso",
        timestamp: new Date().toISOString(),
      })

      // Simular progreso de la llamada
      const transcripcionChunks = [
        "Hola, buenos días.",
        "Llamamos para confirmar su cita.",
        "Sí, perfecto. Nos vemos entonces.",
        "Gracias, hasta luego.",
      ]

      let currentChunk = 0
      const interval = setInterval(() => {
        if (currentChunk < transcripcionChunks.length) {
          setLlamada((prev) => ({
            ...prev!,
            transcripcion: (prev?.transcripcion || "") + " " + transcripcionChunks[currentChunk],
          }))
          currentChunk++
        } else {
          // Finalizar llamada
          setLlamada((prev) => ({
            ...prev!,
            estado: "completada",
            recordingUrl: "https://example.com/recording.mp3",
          }))
          clearInterval(interval)
        }
      }, 2000)

      return () => clearInterval(interval)
    } else {
      // TODO: Conectar con WebSocket o SSE para recibir actualizaciones en tiempo real
      // const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_BASE_URL}/api/calls/stream?callId=${callId}`)
      // ws.onmessage = (event) => {
      //   const data = JSON.parse(event.data)
      //   setLlamada(prev => ({ ...prev, ...data }))
      // }
    }
  }, [callId, paciente])

  const getEstadoIcon = () => {
    if (!llamada) return <Phone className="h-5 w-5" />
    switch (llamada.estado) {
      case "en_curso":
        return <Phone className="h-5 w-5 text-primary animate-pulse" />
      case "completada":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "fallida":
        return <XCircle className="h-5 w-5 text-destructive" />
    }
  }

  const getEstadoBadge = () => {
    if (!llamada) return null
    const variants = {
      en_curso: { label: "En curso", variant: "default" as const },
      completada: { label: "Completada", variant: "secondary" as const },
      fallida: { label: "Fallida", variant: "destructive" as const },
    }
    const { label, variant } = variants[llamada.estado]
    return <Badge variant={variant}>{label}</Badge>
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {getEstadoIcon()}
            Estado de Llamada
          </SheetTitle>
          <SheetDescription>Llamada con {paciente?.nombre}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Estado:</span>
            {getEstadoBadge()}
          </div>

          {llamada?.transcripcion && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">Transcripción en vivo:</h3>
              <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground leading-relaxed">
                {llamada.transcripcion}
              </div>
            </div>
          )}

          {llamada?.estado === "completada" && llamada.recordingUrl && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">Grabación:</h3>
              <Button variant="outline" className="w-full rounded-xl bg-transparent" asChild>
                <a href={llamada.recordingUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Escuchar grabación
                </a>
              </Button>
            </div>
          )}

          {llamada?.estado === "en_curso" && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Llamada en progreso...
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
