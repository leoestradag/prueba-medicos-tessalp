"use client"

import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { AssistantChat } from "@/components/assistant-chat"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, CheckCircle, XCircle } from "lucide-react"

export default function AsistentePage() {
  const historialLlamadas = [
    { id: "1", paciente: "Sarah Johnson", estado: "completada", fecha: "2025-01-15 09:30" },
    { id: "2", paciente: "Carlos Méndez", estado: "completada", fecha: "2025-01-15 11:00" },
    { id: "3", paciente: "Ana García", estado: "fallida", fecha: "2025-01-15 14:15" },
  ]

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Asistente AI</h1>
            <p className="text-muted-foreground mt-1">Chat con el asistente y gestión de llamadas</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-foreground">Chat con Asistente</CardTitle>
                </CardHeader>
                <CardContent>
                  <AssistantChat />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Estado de Llamadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">En curso</span>
                      <Badge variant="default">0</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Completadas hoy</span>
                      <Badge variant="secondary">2</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Fallidas</span>
                      <Badge variant="destructive">1</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-foreground">Historial Reciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {historialLlamadas.map((llamada) => (
                      <div key={llamada.id} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                        {llamada.estado === "completada" ? (
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{llamada.paciente}</p>
                          <p className="text-xs text-muted-foreground">{llamada.fecha}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
