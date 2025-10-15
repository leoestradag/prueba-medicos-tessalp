"use client"

import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function PerfilPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6 max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Perfil</h1>
            <p className="text-muted-foreground mt-1">Información del médico</p>
          </div>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Datos Personales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre completo</Label>
                <Input id="nombre" defaultValue="Dr. León" className="rounded-xl" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="especialidad">Especialidad</Label>
                <Input id="especialidad" defaultValue="Medicina General" className="rounded-xl" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cedula">Cédula profesional</Label>
                <Input id="cedula" defaultValue="1234567" className="rounded-xl" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" type="tel" defaultValue="+52 555 000 0000" className="rounded-xl" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" defaultValue="dr.leon@ejemplo.com" className="rounded-xl" />
              </div>
              <Button className="rounded-2xl">Guardar cambios</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
