"use client"

import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockPacientes } from "@/lib/mock-data"
import { Phone, Calendar } from "lucide-react"

export default function PacientesPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Pacientes</h1>
            <p className="text-muted-foreground mt-1">Lista de pacientes registrados</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPacientes.map((paciente) => (
              <Card key={paciente.id} className="hover:shadow-lg transition-all hover:scale-[1.02] rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-foreground">{paciente.nombre}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {paciente.telefono}
                  </div>
                  {paciente.ultimaCita && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Última cita: {new Date(paciente.ultimaCita).toLocaleDateString("es-MX")}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
