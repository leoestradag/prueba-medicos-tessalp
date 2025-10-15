const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""
const DEMO_MODE = !API_BASE_URL

// Simular delay para demo
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function startAICall(data: {
  to: string
  patientName: string
  purpose: string
  metadata?: Record<string, string>
}) {
  if (DEMO_MODE) {
    await delay(1000)
    return {
      callId: `call_${Date.now()}`,
      status: "queued",
    }
  }

  // TODO: Conectar con proveedor de voz (Twilio, etc.)
  const response = await fetch(`${API_BASE_URL}/api/calls/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Error al iniciar llamada")
  }

  return response.json()
}

export async function sendWhatsAppMessage(data: { to: string; message: string }) {
  if (DEMO_MODE) {
    await delay(800)
    return {
      messageId: `wamid_${Date.now()}`,
      status: "sent",
    }
  }

  // TODO: Conectar con WhatsApp Business API
  const response = await fetch(`${API_BASE_URL}/api/whatsapp/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Error al enviar mensaje")
  }

  return response.json()
}

export async function sendAssistantMessage(data: {
  messages: Array<{ role: string; content: string }>
  context?: Record<string, string>
}) {
  if (DEMO_MODE) {
    await delay(1200)
    const responses = [
      "Claro, ¿qué horario le acomoda?",
      "Entendido. ¿Necesita algo más?",
      "Perfecto, he registrado esa información.",
      "Por supuesto, déjeme ayudarle con eso.",
    ]
    return {
      reply: responses[Math.floor(Math.random() * responses.length)],
      toolsUsed: [],
    }
  }

  // TODO: Conectar con API de asistente AI
  const response = await fetch(`${API_BASE_URL}/api/assistant/reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Error al obtener respuesta del asistente")
  }

  return response.json()
}
