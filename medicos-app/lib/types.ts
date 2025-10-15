export type Paciente = {
  id: string
  nombre: string
  telefono: string
  ultimaCita?: string
}

export type Cita = {
  id: string
  pacienteId: string
  fechaISO: string
  motivo: string
  estado: "Programada" | "Completada" | "Cancelada"
}

export type MensajeChat = {
  id: string
  remitente: "user" | "ai"
  texto: string
  timestamp: string
}

export type Llamada = {
  id: string
  pacienteId: string
  estado: "en_curso" | "completada" | "fallida"
  transcripcion?: string
  recordingUrl?: string
  timestamp: string
}
