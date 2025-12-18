// Script para probar el envío de emails con Brevo
const axios = require('axios')
const fs = require('fs')
const path = require('path')

// Cargar variables de entorno desde .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '.env.local')
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    envContent.split('\n').forEach(line => {
      const trimmedLine = line.trim()
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=')
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').trim()
          process.env[key.trim()] = value
        }
      }
    })
  }
}

loadEnvFile()

const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.NEXT_PUBLIC_BREVO_API_KEY
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'reactivomarketingcol@gmail.com'
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Zinergia Marketing'
const ZINERGIA_TEAM_EMAIL = process.env.ZINERGIA_TEAM_EMAIL || 'hola@zinergiamarketing.info'

if (!BREVO_API_KEY) {
  console.error('❌ ERROR: BREVO_API_KEY no configurada')
  process.exit(1)
}

const brevoApi = axios.create({
  baseURL: 'https://api.brevo.com/v3',
  headers: {
    'api-key': BREVO_API_KEY,
    'Content-Type': 'application/json',
  },
})

async function testEmailSending() {
  console.log('🔍 Probando envío de emails con Brevo...\n')
  console.log('Remitente:', BREVO_SENDER_EMAIL)
  console.log('Nombre:', BREVO_SENDER_NAME)
  console.log('')

  // Test 1: Verificar remitente
  console.log('📋 Test 1: Verificando remitente...')
  try {
    const sendersResponse = await brevoApi.get('/senders')
    const senders = sendersResponse.data.senders || []
    const sender = senders.find(s => s.email === BREVO_SENDER_EMAIL)
    
    if (sender) {
      console.log('✅ Remitente encontrado:', sender.email)
      console.log('   Verificado:', sender.verified ? '✅' : '❌')
      if (!sender.verified) {
        console.log('   ⚠️  El remitente NO está verificado. Los emails pueden no enviarse.')
      }
    } else {
      console.log('❌ Remitente NO encontrado:', BREVO_SENDER_EMAIL)
      console.log('   Remitentes disponibles:')
      senders.forEach((s, i) => {
        console.log(`   ${i + 1}. ${s.email} - Verificado: ${s.verified ? '✅' : '❌'}`)
      })
    }
    console.log('')
  } catch (error) {
    console.error('❌ Error al verificar remitente:', error.response?.data || error.message)
    console.log('')
  }

  // Test 2: Enviar email de prueba al cliente
  console.log('📋 Test 2: Enviando email de prueba al cliente...')
  const testClientEmail = 'test@example.com' // Cambia esto por un email real para probar
  console.log('   Email destino:', testClientEmail)
  console.log('   (Cambia test@example.com por un email real para recibir el email)')
  
  try {
    const emailResponse = await brevoApi.post('/smtp/email', {
      sender: {
        name: BREVO_SENDER_NAME,
        email: BREVO_SENDER_EMAIL,
      },
      to: [{ email: testClientEmail }],
      subject: 'Test: Gracias por contactar a Zinergia',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b0b5b;">Hola Test,</h2>
          <p>Este es un email de prueba. Si lo recibes, el sistema está funcionando correctamente.</p>
          <p>Saludos,<br>El equipo de Zinergia</p>
        </div>
      `,
    })
    console.log('✅ Email enviado correctamente')
    console.log('   Message ID:', emailResponse.data.messageId)
    console.log('')
  } catch (error) {
    console.error('❌ Error al enviar email:')
    if (error.response) {
      console.error('   Status:', error.response.status)
      console.error('   Error:', JSON.stringify(error.response.data, null, 2))
      
      if (error.response.status === 400) {
        if (error.response.data.code === 'invalid_parameter') {
          console.error('\n⚠️  El remitente no está verificado o no es válido')
          console.error('   Ve a Brevo > Settings > Senders & IP > Senders')
          console.error('   Verifica el remitente:', BREVO_SENDER_EMAIL)
        }
      }
    } else {
      console.error('   Error:', error.message)
    }
    console.log('')
  }

  // Test 3: Enviar email de notificación al equipo
  console.log('📋 Test 3: Enviando email de notificación al equipo...')
  console.log('   Email destino:', ZINERGIA_TEAM_EMAIL)
  
  try {
    const teamEmailResponse = await brevoApi.post('/smtp/email', {
      sender: {
        name: BREVO_SENDER_NAME,
        email: BREVO_SENDER_EMAIL,
      },
      to: [{ email: ZINERGIA_TEAM_EMAIL }],
      subject: 'Test: Nuevo contacto - Test User',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b0b5b;">Nuevo Contacto Recibido (TEST)</h2>
          <p><strong>Nombre:</strong> Test User</p>
          <p><strong>Email:</strong> test@example.com</p>
          <p><strong>Servicio:</strong> Test Service</p>
          <p>Este es un email de prueba.</p>
        </div>
      `,
    })
    console.log('✅ Email de notificación enviado correctamente')
    console.log('   Message ID:', teamEmailResponse.data.messageId)
    console.log('')
  } catch (error) {
    console.error('❌ Error al enviar email de notificación:')
    if (error.response) {
      console.error('   Status:', error.response.status)
      console.error('   Error:', JSON.stringify(error.response.data, null, 2))
    } else {
      console.error('   Error:', error.message)
    }
    console.log('')
  }

  console.log('✅ Tests completados')
  console.log('\n📝 Notas:')
  console.log('- Si los emails se enviaron pero no los recibes, revisa la carpeta de spam')
  console.log('- Si hay errores, verifica que el remitente esté verificado en Brevo')
  console.log('- Revisa los logs de Brevo: Statistics > Email Logs')
}

testEmailSending().catch((error) => {
  console.error('❌ Error inesperado:', error.message)
  process.exit(1)
})

