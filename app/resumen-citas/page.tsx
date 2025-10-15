"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff, FileText } from "lucide-react"

export default function ResumenCitasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Resumen Citas</h1>
        <p className="text-muted-foreground">Grabación y transcripción de consultas médicas</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Grabación de Audio
          </CardTitle>
        <CardDescription>
          Graba la conversación durante la consulta médica para generar un resumen automático con IA
        </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Iniciar Grabación
            </Button>
            <Button variant="outline" disabled className="flex items-center gap-2">
              <MicOff className="h-4 w-4" />
              Detener Grabación
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Transcripción y Resumen
          </CardTitle>
          <CardDescription>
            La transcripción y resumen aparecerán aquí una vez que se complete la grabación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Inicia una grabación para comenzar el proceso de transcripción y resumen con IA.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
