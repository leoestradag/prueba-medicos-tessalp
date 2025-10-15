import type { Paciente, Cita } from "./types"

export const mockPacientes: Paciente[] = [
  {
    id: "p1",
    nombre: "Sarah Johnson",
    telefono: "+5215551234567",
    ultimaCita: "2025-01-10",
  },
  {
    id: "p2",
    nombre: "Carlos Méndez",
    telefono: "+5215557654321",
    ultimaCita: "2025-01-12",
  },
  {
    id: "p3",
    nombre: "Ana García",
    telefono: "+5215559876543",
    ultimaCita: "2025-01-08",
  },
]

export const mockCitas: Cita[] = [
  {
    id: "c1",
    pacienteId: "p1",
    fechaISO: "2025-01-15T09:00:00",
    motivo: "Consulta general",
    estado: "Programada",
  },
  {
    id: "c2",
    pacienteId: "p2",
    fechaISO: "2025-01-15T10:30:00",
    motivo: "Seguimiento",
    estado: "Programada",
  },
  {
    id: "c3",
    pacienteId: "p3",
    fechaISO: "2025-01-15T14:00:00",
    motivo: "Revisión de resultados",
    estado: "Programada",
  },
  {
    id: "c4",
    pacienteId: "p1",
    fechaISO: "2025-01-14T11:00:00",
    motivo: "Consulta de rutina",
    estado: "Completada",
  },
  {
    id: "c5",
    pacienteId: "p2",
    fechaISO: "2025-01-13T15:30:00",
    motivo: "Chequeo anual",
    estado: "Completada",
  },
]
