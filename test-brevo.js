// Script de prueba para verificar la conexión con Brevo
// Ejecuta: node test-brevo.js

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

// IMPORTANTE: Reemplaza esto con tu API key real
const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.NEXT_PUBLIC_BREVO_API_KEY || 'TU_API_KEY_AQUI'

if (!BREVO_API_KEY || BREVO_API_KEY === 'TU_API_KEY_AQUI') {
  console.error('❌ ERROR: Debes configurar BREVO_API_KEY')
  console.log('\n📝 Cómo configurar:')
  console.log('1. Crea un archivo .env.local en la raíz del proyecto')
  console.log('2. Agrega: BREVO_API_KEY=xkeysib-tu_api_key_aqui')
  console.log('3. O ejecuta: BREVO_API_KEY=tu_key node test-brevo.js\n')
  process.exit(1)
}

const brevoApi = axios.create({
  baseURL: 'https://api.brevo.com/v3',
  headers: {
    'api-key': BREVO_API_KEY,
    'Content-Type': 'application/json',
  },
})

async function testBrevoConnection() {
  console.log('🔍 Probando conexión con Brevo...\n')
  console.log('API Key:', BREVO_API_KEY.substring(0, 15) + '...' + BREVO_API_KEY.substring(BREVO_API_KEY.length - 5))
  console.log('')

  // Test 1: Verificar cuenta
  console.log('📋 Test 1: Verificando cuenta de Brevo...')
  try {
    const accountResponse = await brevoApi.get('/account')
    console.log('✅ Cuenta verificada correctamente')
    console.log('   - Email:', accountResponse.data.email)
    console.log('   - Plan:', accountResponse.data.plan[0]?.type || 'Free')
    console.log('   - Créditos:', accountResponse.data.plan[0]?.credits || 'N/A')
    console.log('')
  } catch (error) {
    console.error('❌ Error al verificar cuenta:')
    if (error.response) {
      console.error('   Status:', error.response.status)
      console.error('   Error:', error.response.data)
      if (error.response.status === 401) {
        console.error('\n⚠️  La API key es inválida o ha expirado')
        console.error('   Ve a Brevo > Settings > SMTP & API > API Keys')
        console.error('   Genera una nueva API key si es necesario\n')
      }
    } else {
      console.error('   Error:', error.message)
    }
    process.exit(1)
  }

  // Test 2: Listar contactos
  console.log('📋 Test 2: Verificando acceso a contactos...')
  try {
    const contactsResponse = await brevoApi.get('/contacts?limit=1')
    console.log('✅ Acceso a contactos OK')
    console.log('   - Total de contactos:', contactsResponse.data.count || 0)
    console.log('')
  } catch (error) {
    console.error('❌ Error al acceder a contactos:')
    if (error.response) {
      console.error('   Status:', error.response.status)
      console.error('   Error:', error.response.data)
    } else {
      console.error('   Error:', error.message)
    }
  }

  // Test 3: Crear contacto de prueba
  console.log('📋 Test 3: Creando contacto de prueba...')
  try {
    const testEmail = `test-${Date.now()}@example.com`
    const contactData = {
      email: testEmail,
      attributes: {
        FIRSTNAME: 'Test',
        LASTNAME: 'Brevo',
      },
      updateEnabled: true,
    }

    await brevoApi.post('/contacts', contactData)
    console.log('✅ Contacto de prueba creado:', testEmail)
    console.log('')
  } catch (error) {
    console.error('❌ Error al crear contacto:')
    if (error.response) {
      console.error('   Status:', error.response.status)
      console.error('   Error:', error.response.data)
      if (error.response.status === 400 && error.response.data.code === 'duplicate_parameter') {
        console.log('   ℹ️  El contacto ya existe (esto es normal)')
      }
    } else {
      console.error('   Error:', error.message)
    }
  }

  // Test 4: Verificar remitentes
  console.log('📋 Test 4: Verificando remitentes configurados...')
  try {
    const sendersResponse = await brevoApi.get('/senders')
    const senders = sendersResponse.data.senders || []
    console.log('✅ Remitentes encontrados:', senders.length)
    senders.forEach((sender, index) => {
      console.log(`   ${index + 1}. ${sender.email} - ${sender.name}`)
      console.log(`      Verificado: ${sender.verified ? '✅' : '❌'}`)
    })
    if (senders.length === 0) {
      console.log('   ⚠️  No hay remitentes configurados')
      console.log('   Ve a Brevo > Settings > Senders & IP > Senders')
      console.log('   Agrega: noreply@zinergiamarketing.info')
    }
    console.log('')
  } catch (error) {
    console.error('❌ Error al verificar remitentes:')
    if (error.response) {
      console.error('   Status:', error.response.status)
      console.error('   Error:', error.response.data)
    } else {
      console.error('   Error:', error.message)
    }
  }

  // Test 5: Enviar email de prueba (opcional)
  console.log('📋 Test 5: Verificando capacidad de envío...')
  console.log('   ℹ️  Para probar el envío, necesitas:')
  console.log('   1. Un remitente verificado en Brevo')
  console.log('   2. Un email de destino válido')
  console.log('   3. Créditos disponibles en tu plan')
  console.log('')

  console.log('✅ Todos los tests básicos completados')
  console.log('\n📝 Próximos pasos:')
  console.log('1. Si todos los tests pasaron, el problema puede estar en Vercel')
  console.log('2. Verifica que BREVO_API_KEY esté configurada en Vercel')
  console.log('3. Verifica que el dominio esté verificado en Brevo')
  console.log('4. Revisa los logs de Vercel para ver errores específicos')
}

testBrevoConnection().catch((error) => {
  console.error('❌ Error inesperado:', error.message)
  process.exit(1)
})

