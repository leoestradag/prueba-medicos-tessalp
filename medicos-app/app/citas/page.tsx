"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { AppointmentsTable } from "@/components/appointments-table"
import { NewAppointmentModal } from "@/components/new-appointment-modal"
import { mockCitas, mockPacientes } from "@/lib/mock-data"
import type { Cita } from "@/lib/types"

export default function CitasPage() {
  const [citas, setCitas] = useState<Cita[]>(mockCitas)
  const [pacientes] = useState(mockPacientes)

  const handleStatusChange = (citaId: string, newStatus: Cita["estado"]) => {
    setCitas((prev) => prev.map((cita) => (cita.id === citaId ? { ...cita, estado: newStatus } : cita)))
  }

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
              <h1 className="text-3xl font-bold text-foreground">Citas</h1>
              <p className="text-muted-foreground mt-1">Gestión de citas médicas</p>
            </div>
            <NewAppointmentModal onAppointmentCreated={handleNewAppointment} />
          </div>

          <AppointmentsTable citas={citas} pacientes={pacientes} onStatusChange={handleStatusChange} />
        </main>
      </div>
    </div>
  )
}
