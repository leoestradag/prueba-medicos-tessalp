"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { StatsCard } from "@/components/stats-card"
import { NewAppointmentModal } from "@/components/new-appointment-modal"
import { Calendar, Users, DollarSign, CalendarCheck } from "lucide-react"
import { mockCitas, mockPacientes } from "@/lib/mock-data"
import type { Cita } from "@/lib/types"

export default function DashboardPage() {
  const [citas, setCitas] = useState<Cita[]>(mockCitas)

  const today = new Date().toISOString().split("T")[0]
  const citasHoy = citas.filter((c) => c.fechaISO.startsWith(today))
  const citasHoyProgramadas = citasHoy.filter((c) => c.estado === "Programada").length
  const citasHoyCompletadas = citasHoy.filter((c) => c.estado === "Completada").length

  const citasMes = citas.filter((c) => {
    const citaDate = new Date(c.fechaISO)
    const now = new Date()
    return citaDate.getMonth() === now.getMonth() && citaDate.getFullYear() === now.getFullYear()
  }).length

  const handleNewAppointment = (data: any) => {
    const newCita: Cita = {
      id: `c${Date.now()}`,
      pacienteId: "p_new",
      fechaISO: data.fecha,
      motivo: data.motivo,
      estado: "Programada",
    }
    setCitas([...citas, newCita])
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Resumen de actividad del día</p>
            </div>
            <NewAppointmentModal onAppointmentCreated={handleNewAppointment} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Citas de Hoy"
              value={`${citasHoyProgramadas} / ${citasHoy.length}`}
              subtitle={`${citasHoyCompletadas} completadas`}
              icon={Calendar}
            />
            <StatsCard
              title="Pacientes Activos"
              value={mockPacientes.length}
              subtitle="Total registrados"
              icon={Users}
            />
            <StatsCard title="Ingresos del Mes" value="$45,230" subtitle="MXN" icon={DollarSign} />
            <StatsCard title="Citas del Mes" value={citasMes} subtitle="Total programadas" icon={CalendarCheck} />
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Próximas Citas</h2>
              <div className="space-y-3">
                {citasHoy.slice(0, 3).map((cita) => {
                  const paciente = mockPacientes.find((p) => p.id === cita.pacienteId)
                  return (
                    <div
                      key={cita.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div>
                        <p className="font-medium text-foreground">{paciente?.nombre}</p>
                        <p className="text-sm text-muted-foreground">{cita.motivo}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(cita.fechaISO).toLocaleTimeString("es-MX", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Pacientes Recientes</h2>
              <div className="space-y-3">
                {mockPacientes.slice(0, 3).map((paciente) => (
                  <div
                    key={paciente.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{paciente.nombre}</p>
                      <p className="text-sm text-muted-foreground">{paciente.telefono}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {paciente.ultimaCita ? new Date(paciente.ultimaCita).toLocaleDateString("es-MX") : "Sin citas"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
