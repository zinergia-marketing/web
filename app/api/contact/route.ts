import { NextRequest, NextResponse } from 'next/server'
import { addContactToBrevo } from '@/lib/brevo'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validación completa
    if (!body.email || !body.name) {
      return NextResponse.json(
        { error: 'Email y nombre son requeridos' },
        { status: 400 }
      )
    }

    if (!body.service) {
      return NextResponse.json(
        { error: 'Por favor selecciona un servicio de interés' },
        { status: 400 }
      )
    }

    if (!body.budget) {
      return NextResponse.json(
        { error: 'Por favor selecciona un rango de presupuesto' },
        { status: 400 }
      )
    }

    if (!body.message || body.message.length < 10) {
      return NextResponse.json(
        { error: 'El mensaje debe tener al menos 10 caracteres' },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'El formato del email no es válido' },
        { status: 400 }
      )
    }

    // Agregar contacto a Brevo
    const result = await addContactToBrevo({
      ...body,
      type: 'contact',
    })

    if (!result.success) {
      console.error('Error de Brevo:', result.error)
      return NextResponse.json(
        { error: result.error || 'Error al procesar la solicitud. Por favor intenta de nuevo o contáctanos por WhatsApp.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Mensaje enviado correctamente. Te responderemos en menos de 15 minutos.' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error en API de contacto:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor. Por favor intenta de nuevo o contáctanos por WhatsApp.' },
      { status: 500 }
    )
  }
}

