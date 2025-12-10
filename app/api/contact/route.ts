import { NextRequest, NextResponse } from 'next/server'
import { addContactToBrevo } from '@/lib/brevo'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validación básica
    if (!body.email || !body.name) {
      return NextResponse.json(
        { error: 'Email y nombre son requeridos' },
        { status: 400 }
      )
    }

    // Agregar contacto a Brevo
    const result = await addContactToBrevo({
      ...body,
      type: 'contact',
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Error al procesar la solicitud' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Mensaje enviado correctamente' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error en API de contacto:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

