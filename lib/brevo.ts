import axios from 'axios'

// IMPORTANTE: La API key debe ser del servidor, NO del cliente
// En Vercel, configúrala como BREVO_API_KEY (sin NEXT_PUBLIC_)
const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.NEXT_PUBLIC_BREVO_API_KEY
const BREVO_LIST_ID = process.env.BREVO_LIST_ID
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'hola@zinergiamarketing.info'
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Zinergia Marketing'

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
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573243463101'
      const whatsappMessage = encodeURIComponent('Hola, tengo una pregunta sobre mi solicitud')
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
      
      const clientEmailResult = await sendTransactionalEmail({
        to: data.email,
        subject: 'Gracias por contactar a Zinergia',
        htmlContent: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gracias por contactar a Zinergia</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header con gradiente -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b0b5b 0%, #f97373 100%); padding: 40px 30px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <!-- Logo -->
                    <div style="width: 60px; height: 60px; background-color: rgba(255, 255, 255, 0.2); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                      <span style="color: #ffffff; font-size: 32px; font-weight: bold;">Z</span>
                    </div>
                    <h1 style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0; text-transform: uppercase; letter-spacing: 2px;">ZINERGIA</h1>
                    <p style="color: rgba(255, 255, 255, 0.9); font-size: 14px; margin: 8px 0 0 0;">Marketing Digital</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Contenido principal -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #3b0b5b; font-size: 24px; font-weight: bold; margin: 0 0 20px 0; line-height: 1.4;">
                ¡Hola ${data.name}!
              </h2>
              
              <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Gracias por contactarnos. Hemos recibido tu solicitud y nos pondremos en contacto contigo en <strong style="color: #f97373;">menos de 15 minutos</strong>.
              </p>
              
              <!-- Caja destacada -->
              <div style="background: linear-gradient(135deg, #f97373 0%, #3b0b5b 100%); border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
                <p style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 0 0 10px 0; display: flex; align-items: center; justify-content: center; gap: 8px;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle;">
                    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.6 10.16 9.45 9 11 9V7c-2.8 0-4.99 2.2-5 5v1h-2v4h2v8h5v-4h2l1-4zm-1-4v4H7v-4h3z"/>
                  </svg>
                  Respuesta rápida garantizada
                </p>
                <p style="color: rgba(255, 255, 255, 0.9); font-size: 14px; margin: 0;">
                  Nuestro equipo está revisando tu solicitud ahora mismo
                </p>
              </div>
              
              <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Mientras tanto, puedes contactarnos directamente por WhatsApp si tienes alguna pregunta urgente:
              </p>
              
              <!-- Botón de WhatsApp -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${whatsappUrl}" style="display: inline-flex; align-items: center; gap: 8px; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 2px 4px rgba(37, 211, 102, 0.3);">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle;">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                      </svg>
                      Contactar por WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0; padding-top: 20px; border-top: 1px solid #e7d5c4;">
                Saludos,<br>
                <strong style="color: #3b0b5b;">El equipo de Zinergia Marketing</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 30px; text-align: center;">
              <p style="color: #ffffff; font-size: 16px; font-weight: bold; margin: 0 0 16px 0;">Zinergia Marketing</p>
              <p style="color: #999999; font-size: 14px; margin: 0 0 20px 0; line-height: 1.6;">
                Impulsamos negocios y emprendedores con soluciones creativas + IA
              </p>
              
              <!-- Redes sociales -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 20px auto;">
                <tr>
                  <td style="padding: 0 8px;">
                    <a href="https://instagram.com/zinergiamarketing" style="display: inline-flex; width: 40px; height: 40px; background-color: rgba(255, 255, 255, 0.1); border-radius: 50%; align-items: center; justify-content: center; text-decoration: none;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="color: #ffffff;">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://facebook.com/zinergiamarketing.co" style="display: inline-flex; width: 40px; height: 40px; background-color: rgba(255, 255, 255, 0.1); border-radius: 50%; align-items: center; justify-content: center; text-decoration: none;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="color: #ffffff;">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://tiktok.com/@zinergiamarketing" style="display: inline-flex; width: 40px; height: 40px; background-color: rgba(255, 255, 255, 0.1); border-radius: 50%; align-items: center; justify-content: center; text-decoration: none;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="color: #ffffff;">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #666666; font-size: 12px; margin: 20px 0 0 0;">
                © ${new Date().getFullYear()} Zinergia Marketing. Todos los derechos reservados.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      })
      
      if (!clientEmailResult.success) {
        console.warn('No se pudo enviar email de confirmación al cliente:', clientEmailResult.error)
      }

      // Notificación al equipo de Zinergia
      const teamEmail = process.env.ZINERGIA_TEAM_EMAIL || 'hola@zinergiamarketing.info'
      const teamWhatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573243463101'
      const teamWhatsappMessage = encodeURIComponent(`Hola ${data.name}, gracias por contactar a Zinergia.`)
      const teamWhatsappUrl = `https://wa.me/${teamWhatsappNumber}?text=${teamWhatsappMessage}`
      const mailtoUrl = `mailto:${data.email}?subject=Re: Tu solicitud a Zinergia&body=Hola ${data.name},%0D%0A%0D%0A`
      
      const teamEmailResult = await sendTransactionalEmail({
        to: teamEmail,
        subject: `Nuevo contacto: ${data.name} - ${data.service || 'Sin servicio especificado'}`,
        htmlContent: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Contacto - Zinergia</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header con gradiente -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b0b5b 0%, #f97373 100%); padding: 30px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <div style="width: 50px; height: 50px; background-color: rgba(255, 255, 255, 0.2); border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px;">
                      <span style="color: #ffffff; font-size: 28px; font-weight: bold;">Z</span>
                    </div>
                    <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0; text-transform: uppercase; letter-spacing: 1px;">NUEVO CONTACTO</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Alerta de tiempo -->
          <tr>
            <td style="background-color: #fff3cd; border-left: 4px solid #f97373; padding: 16px 30px;">
              <p style="color: #856404; font-size: 14px; font-weight: 600; margin: 0; display: flex; align-items: center; gap: 8px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle;">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                Responder en menos de 15 minutos según compromiso
              </p>
            </td>
          </tr>
          
          <!-- Contenido principal -->
          <tr>
            <td style="padding: 30px;">
              <!-- Información del contacto -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 20px;">
                    <h2 style="color: #3b0b5b; font-size: 20px; font-weight: bold; margin: 0 0 20px 0; border-bottom: 2px solid #e7d5c4; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle;">
                        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                      </svg>
                      Información del Contacto
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                          <strong style="color: #3b0b5b; font-size: 14px; display: inline-block; width: 120px;">Nombre:</strong>
                          <span style="color: #1a1a1a; font-size: 14px;">${data.name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                          <strong style="color: #3b0b5b; font-size: 14px; display: inline-block; width: 120px;">Email:</strong>
                          <a href="mailto:${data.email}" style="color: #f97373; font-size: 14px; text-decoration: none;">${data.email}</a>
                        </td>
                      </tr>
                      ${data.phone ? `
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                          <strong style="color: #3b0b5b; font-size: 14px; display: inline-block; width: 120px;">Teléfono:</strong>
                          <a href="tel:${data.phone.replace(/\s/g, '')}" style="color: #1a1a1a; font-size: 14px; text-decoration: none;">${data.phone}</a>
                        </td>
                      </tr>
                      ` : ''}
                      ${data.company ? `
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                          <strong style="color: #3b0b5b; font-size: 14px; display: inline-block; width: 120px;">Empresa:</strong>
                          <span style="color: #1a1a1a; font-size: 14px;">${data.company}</span>
                        </td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                          <strong style="color: #3b0b5b; font-size: 14px; display: inline-block; width: 120px;">Servicio:</strong>
                          <span style="color: #f97373; font-size: 14px; font-weight: 600;">${data.service || 'No especificado'}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #3b0b5b; font-size: 14px; display: inline-block; width: 120px;">Presupuesto:</strong>
                          <span style="color: #1a1a1a; font-size: 14px;">${data.budget || 'No especificado'}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Mensaje -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #3b0b5b; padding: 20px; margin: 25px 0; border-radius: 4px;">
                <h3 style="color: #3b0b5b; font-size: 16px; font-weight: bold; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle;">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                  </svg>
                  Mensaje:
                </h3>
                <p style="color: #1a1a1a; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.message || 'Sin mensaje'}</p>
              </div>
              
              <!-- Botones de acción -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                <tr>
                  <td align="center" style="padding: 0 5px;">
                    <a href="${mailtoUrl}" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; background-color: #3b0b5b; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; width: 100%; max-width: 200px; box-sizing: border-box;">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle;">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      Responder por Email
                    </a>
                  </td>
                  <td align="center" style="padding: 0 5px;">
                    <a href="${teamWhatsappUrl}" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; width: 100%; max-width: 200px; box-sizing: border-box;">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle;">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                      </svg>
                      WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 20px 30px; text-align: center;">
              <p style="color: #999999; font-size: 12px; margin: 0;">
                Zinergia Marketing - Sistema de notificaciones
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      })
      
      if (!teamEmailResult.success) {
        console.warn('No se pudo enviar email de notificación al equipo:', teamEmailResult.error)
      }
    } else if (data.type === 'newsletter') {
      // Email de bienvenida para newsletter
      const newsletterWhatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573243463101'
      const newsletterWhatsappMessage = encodeURIComponent('Hola, me interesa conocer más sobre Zinergia')
      const newsletterWhatsappUrl = `https://wa.me/${newsletterWhatsappNumber}?text=${newsletterWhatsappMessage}`
      
      await sendTransactionalEmail({
        to: data.email,
        subject: 'Bienvenido a Zinergia - Tu análisis está listo',
        htmlContent: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenido a Zinergia</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header con gradiente -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b0b5b 0%, #f97373 100%); padding: 40px 30px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <div style="width: 60px; height: 60px; background-color: rgba(255, 255, 255, 0.2); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                      <span style="color: #ffffff; font-size: 32px; font-weight: bold;">Z</span>
                    </div>
                    <h1 style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0; text-transform: uppercase; letter-spacing: 2px;">ZINERGIA</h1>
                    <p style="color: rgba(255, 255, 255, 0.9); font-size: 14px; margin: 8px 0 0 0;">Marketing Digital</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Contenido principal -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #3b0b5b; font-size: 24px; font-weight: bold; margin: 0 0 20px 0; line-height: 1.4;">
                ¡Bienvenido, ${data.name}!
              </h2>
              
              <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Gracias por unirte a nuestra comunidad. Pronto recibirás tu <strong style="color: #f97373;">análisis gratuito de competencia</strong>.
              </p>
              
              <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Mientras tanto, conoce nuestros servicios:
              </p>
              
              <!-- Servicios -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #3b0b5b; border-radius: 4px; margin-bottom: 12px;">
                    <p style="color: #1a1a1a; font-size: 15px; margin: 0; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle;">
                        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5 11 5.67 11 6.5 10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5 16 5.67 16 6.5 15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9 19 9.67 19 10.5 18.33 12 17.5 12z"/>
                      </svg>
                      Diseño Gráfico - Desde $50k
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #f97373; border-radius: 4px; margin-bottom: 12px;">
                    <p style="color: #1a1a1a; font-size: 15px; margin: 0; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle;">
                        <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                      </svg>
                      Edición de Video - Desde $80k
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #3b0b5b; border-radius: 4px;">
                    <p style="color: #1a1a1a; font-size: 15px; margin: 0; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle;">
                        <path d="M2.81 14.12L5.64 11.3l8.49 8.48-2.83 2.83zm16.27-1.73L21.7 9.7l-1.41-1.41-2.62 2.62z"/>
                      </svg>
                      Landing Pages - Desde $800k
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Botón de WhatsApp -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${newsletterWhatsappUrl}" style="display: inline-flex; align-items: center; gap: 8px; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 2px 4px rgba(37, 211, 102, 0.3);">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle;">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                      </svg>
                      Conocer más sobre nuestros servicios
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0; padding-top: 20px; border-top: 1px solid #e7d5c4;">
                Saludos,<br>
                <strong style="color: #3b0b5b;">El equipo de Zinergia Marketing</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 30px; text-align: center;">
              <p style="color: #ffffff; font-size: 16px; font-weight: bold; margin: 0 0 16px 0;">Zinergia Marketing</p>
              <p style="color: #999999; font-size: 14px; margin: 0 0 20px 0; line-height: 1.6;">
                Impulsamos negocios y emprendedores con soluciones creativas + IA
              </p>
              
              <!-- Redes sociales -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 20px auto;">
                <tr>
                  <td style="padding: 0 8px;">
                    <a href="https://instagram.com/zinergiamarketing" style="display: inline-flex; width: 40px; height: 40px; background-color: rgba(255, 255, 255, 0.1); border-radius: 50%; align-items: center; justify-content: center; text-decoration: none;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="color: #ffffff;">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://facebook.com/zinergiamarketing.co" style="display: inline-flex; width: 40px; height: 40px; background-color: rgba(255, 255, 255, 0.1); border-radius: 50%; align-items: center; justify-content: center; text-decoration: none;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="color: #ffffff;">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://tiktok.com/@zinergiamarketing" style="display: inline-flex; width: 40px; height: 40px; background-color: rgba(255, 255, 255, 0.1); border-radius: 50%; align-items: center; justify-content: center; text-decoration: none;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="color: #ffffff;">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #666666; font-size: 12px; margin: 20px 0 0 0;">
                © ${new Date().getFullYear()} Zinergia Marketing. Todos los derechos reservados.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
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
    return { success: false, error: 'API key no configurada' }
  }

  try {
    const response = await brevoApi.post('/smtp/email', {
      sender: {
        name: BREVO_SENDER_NAME,
        email: BREVO_SENDER_EMAIL,
      },
      to: [{ email: to }],
      subject,
      htmlContent,
    })
    
    console.log('Email enviado correctamente:', {
      to,
      subject,
      messageId: response.data.messageId,
      sender: BREVO_SENDER_EMAIL,
    })
    
    return { success: true, messageId: response.data.messageId }
  } catch (error: any) {
    const errorDetails = error.response?.data || error.message
    console.error('Error al enviar email transaccional:', {
      to,
      subject,
      error: errorDetails,
      status: error.response?.status,
    })
    
    // No lanzamos el error para que el contacto se cree aunque falle el email
    // Pero registramos el error para diagnóstico
    return { 
      success: false, 
      error: errorDetails?.message || 'Error al enviar email',
      details: errorDetails 
    }
  }
}

