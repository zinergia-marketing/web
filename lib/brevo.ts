import axios from 'axios'

// IMPORTANTE: La API key debe ser del servidor, NO del cliente
// En Vercel, configúrala como BREVO_API_KEY (sin NEXT_PUBLIC_)
const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.NEXT_PUBLIC_BREVO_API_KEY
const BREVO_LIST_ID = process.env.BREVO_LIST_ID

const brevoApi = axios.create({
  baseURL: 'https://api.brevo.com/v3',
  headers: {
    'api-key': BREVO_API_KEY,
    'Content-Type': 'application/json',
  },
})

export interface ContactData {
  email: string
  name: string
  phone?: string
  company?: string
  service?: string
  budget?: string
  message?: string
  type?: 'contact' | 'newsletter'
}

export async function addContactToBrevo(data: ContactData) {
  if (!BREVO_API_KEY) {
    console.warn('Brevo API key no configurada')
    return { success: false, error: 'API key no configurada' }
  }

  try {
    // Crear o actualizar contacto
    const contactData = {
      email: data.email,
      attributes: {
        FIRSTNAME: data.name.split(' ')[0] || data.name,
        LASTNAME: data.name.split(' ').slice(1).join(' ') || '',
        SMS: data.phone || '',
        COMPANY: data.company || '',
        SERVICE: data.service || '',
        BUDGET: data.budget || '',
        MESSAGE: data.message || '',
      },
      listIds: BREVO_LIST_ID ? [parseInt(BREVO_LIST_ID)] : [],
      updateEnabled: true,
    }

    await brevoApi.post('/contacts', contactData)

    // Si es un formulario de contacto, enviar emails
    if (data.type === 'contact' && data.message) {
      // Email de confirmación al cliente
      await sendTransactionalEmail({
        to: data.email,
        subject: 'Gracias por contactar a Zinergia',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3b0b5b;">Hola ${data.name},</h2>
            <p>Gracias por contactarnos. Hemos recibido tu solicitud y nos pondremos en contacto contigo en menos de 15 minutos.</p>
            <p>Mientras tanto, puedes contactarnos directamente por WhatsApp si tienes alguna pregunta urgente.</p>
            <p>Saludos,<br>El equipo de Zinergia</p>
          </div>
        `,
      })

      // Notificación al equipo de Zinergia
      const teamEmail = process.env.ZINERGIA_TEAM_EMAIL || 'hola@zinergiamarketing.com'
      await sendTransactionalEmail({
        to: teamEmail,
        subject: `Nuevo contacto: ${data.name} - ${data.service || 'Sin servicio especificado'}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3b0b5b;">Nuevo Contacto Recibido</h2>
            <p><strong>Nombre:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Teléfono:</strong> ${data.phone}</p>` : ''}
            ${data.company ? `<p><strong>Empresa:</strong> ${data.company}</p>` : ''}
            <p><strong>Servicio de interés:</strong> ${data.service || 'No especificado'}</p>
            <p><strong>Presupuesto:</strong> ${data.budget || 'No especificado'}</p>
            <p><strong>Mensaje:</strong></p>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${data.message || 'Sin mensaje'}</p>
            <p style="margin-top: 20px; color: #666; font-size: 12px;">
              Responder en menos de 15 minutos según compromiso.
            </p>
          </div>
        `,
      })
    } else if (data.type === 'newsletter') {
      // Email de bienvenida para newsletter
      await sendTransactionalEmail({
        to: data.email,
        subject: 'Bienvenido a Zinergia - Tu análisis está listo',
        htmlContent: `
          <h2>Hola ${data.name},</h2>
          <p>Gracias por unirte a nuestra comunidad. Pronto recibirás tu análisis gratuito de competencia.</p>
          <p>Mientras tanto, conoce nuestros servicios:</p>
          <ul>
            <li>🎨 Diseño Gráfico - Desde $50k</li>
            <li>🎬 Edición de Video - Desde $80k</li>
            <li>🚀 Landing Pages - Desde $800k</li>
          </ul>
          <p>Saludos,<br>El equipo de Zinergia</p>
        `,
      })
    }

    return { success: true }
  } catch (error: any) {
    console.error('Error al agregar contacto a Brevo:', error.response?.data || error.message)
    return {
      success: false,
      error: error.response?.data?.message || 'Error al procesar la solicitud',
    }
  }
}

interface TransactionalEmail {
  to: string
  subject: string
  htmlContent: string
}

async function sendTransactionalEmail({ to, subject, htmlContent }: TransactionalEmail) {
  if (!BREVO_API_KEY) {
    console.warn('Brevo API key no configurada')
    return
  }

  try {
    await brevoApi.post('/smtp/email', {
      sender: {
        name: 'Zinergia Marketing',
        email: 'noreply@zinergiamarketing.com',
      },
      to: [{ email: to }],
      subject,
      htmlContent,
    })
  } catch (error: any) {
    console.error('Error al enviar email transaccional:', error.response?.data || error.message)
  }
}

