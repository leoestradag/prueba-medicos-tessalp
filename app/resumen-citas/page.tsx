"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff, FileText, Play, Square } from "lucide-react"
import { useState, useRef } from "react"

export default function ResumenCitasPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' })
        setAudioBlob(audioBlob)
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error al acceder al micrófono:', error)
      alert('No se pudo acceder al micrófono. Por favor, permite el acceso al micrófono.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      
      // Detener todas las pistas de audio
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      }
    }
  }
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
            {!isRecording ? (
              <Button 
                onClick={startRecording}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
              >
                <Mic className="h-4 w-4" />
                Iniciar Grabación
              </Button>
            ) : (
              <Button 
                onClick={stopRecording}
                variant="outline"
                className="flex items-center gap-2 border-red-600 text-red-600 hover:bg-red-50"
              >
                <Square className="h-4 w-4" />
                Detener Grabación
              </Button>
            )}
          </div>
          
          {isRecording && (
            <div className="mt-4 flex items-center gap-2 text-red-600">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Grabando...</span>
            </div>
          )}
          
          {audioUrl && !isRecording && (
            <div className="mt-4">
              <p className="text-sm text-green-600 mb-2">✅ Grabación completada</p>
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/wav" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>
          )}
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
          {!audioBlob ? (
            <p className="text-muted-foreground">
              Inicia una grabación para comenzar el proceso de transcripción y resumen con IA.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Transcribir Audio
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Generar Resumen con IA
                </Button>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Próximo paso:</strong> El audio está listo para ser procesado. 
                  Haz clic en "Transcribir Audio" para convertir el audio a texto, 
                  y luego "Generar Resumen con IA" para crear un resumen médico.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
