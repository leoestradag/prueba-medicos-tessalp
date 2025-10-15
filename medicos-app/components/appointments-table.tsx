"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageCircle, CheckCircle } from "lucide-react"
import type { Cita, Paciente } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { startAICall } from "@/lib/api"
import { WhatsAppModal } from "./whatsapp-modal"
import { CallStatusDrawer } from "./call-status-drawer"

interface AppointmentsTableProps {
  citas: Cita[]
  pacientes: Paciente[]
  onStatusChange: (citaId: string, newStatus: Cita["estado"]) => void
}

export function AppointmentsTable({ citas, pacientes, onStatusChange }: AppointmentsTableProps) {
  const { toast } = useToast()
  const [loadingCall, setLoadingCall] = useState<string | null>(null)
  const [whatsappModal, setWhatsappModal] = useState<{ open: boolean; cita?: Cita; paciente?: Paciente }>({
    open: false,
  })
  const [callDrawer, setCallDrawer] = useState<{ open: boolean; callId?: string; paciente?: Paciente }>({ open: false })

  const getPaciente = (pacienteId: string) => {
    return pacientes.find((p) => p.id === pacienteId)
  }

  const formatFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO)
    return fecha.toLocaleString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getEstadoBadge = (estado: Cita["estado"]) => {
    const variants = {
      Programada: "default",
      Completada: "secondary",
      Cancelada: "destructive",
    } as const

    return <Badge variant={variants[estado]}>{estado}</Badge>
  }

  const handleLlamarConIA = async (cita: Cita) => {
    const paciente = getPaciente(cita.pacienteId)
    if (!paciente) return

    setLoadingCall(cita.id)
    try {
      const result = await startAICall({
        to: paciente.telefono,
        patientName: paciente.nombre,
        purpose: `Confirmar cita: ${cita.motivo}`,
        metadata: { appointmentId: cita.id },
      })

      toast({
        title: "Llamada iniciada",
        description: `Llamando a ${paciente.nombre}...`,
      })

      setCallDrawer({ open: true, callId: result.callId, paciente })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo iniciar la llamada",
        variant: "destructive",
      })
    } finally {
      setLoadingCall(null)
    }
  }

  const handleWhatsApp = (cita: Cita) => {
    const paciente = getPaciente(cita.pacienteId)
    if (!paciente) return
    setWhatsappModal({ open: true, cita, paciente })
  }

  const handleMarcarCompletada = (citaId: string) => {
    onStatusChange(citaId, "Completada")
    toast({
      title: "Cita completada",
      description: "La cita ha sido marcada como completada",
    })
  }

  return (
    <>
      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              <TableHead>Fecha y Hora</TableHead>
              <TableHead>Motivo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {citas.map((cita) => {
              const paciente = getPaciente(cita.pacienteId)
              return (
                <TableRow key={cita.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium text-foreground">{paciente?.nombre || "Desconocido"}</TableCell>
                  <TableCell className="text-muted-foreground">{formatFecha(cita.fechaISO)}</TableCell>
                  <TableCell className="text-muted-foreground">{cita.motivo}</TableCell>
                  <TableCell>{getEstadoBadge(cita.estado)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleLlamarConIA(cita)}
                        disabled={loadingCall === cita.id || cita.estado === "Completada"}
                        className="rounded-xl"
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        {loadingCall === cita.id ? "Llamando..." : "Llamar con IA"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleWhatsApp(cita)}
                        disabled={cita.estado === "Completada"}
                        className="rounded-xl"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      {cita.estado === "Programada" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarcarCompletada(cita.id)}
                          className="rounded-xl"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <WhatsAppModal
        open={whatsappModal.open}
        onOpenChange={(open) => setWhatsappModal({ open })}
        cita={whatsappModal.cita}
        paciente={whatsappModal.paciente}
      />

      <CallStatusDrawer
        open={callDrawer.open}
        onOpenChange={(open) => setCallDrawer({ open })}
        callId={callDrawer.callId}
        paciente={callDrawer.paciente}
      />
    </>
  )
}
