# 📧 Guía: Verificar y Configurar el Formulario con Brevo

## ✅ Estado Actual

El formulario de contacto ya está configurado y funcional. Esta guía te ayudará a:
1. Verificar que Brevo esté correctamente configurado en Vercel
2. Probar el formulario
3. Solucionar problemas comunes

---

## 🔧 Paso 1: Verificar Variables de Entorno en Vercel

### Variables Necesarias:

1. **Ve a Vercel Dashboard:**
   - [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - Selecciona tu proyecto `web`
   - Ve a **Settings** > **Environment Variables**

2. **Verifica estas variables:**

   **✅ BREVO_API_KEY** (IMPORTANTE - Sin NEXT_PUBLIC_)
   - **Nombre:** `BREVO_API_KEY`
   - **Valor:** Tu API key de Brevo (formato: `xkeysib-...`)
   - **Entornos:** Production, Preview, Development (marca los 3)
   - **⚠️ IMPORTANTE:** NO uses `NEXT_PUBLIC_BREVO_API_KEY` (eso expondría la key al cliente)

   **✅ ZINERGIA_TEAM_EMAIL** (Opcional)
   - **Nombre:** `ZINERGIA_TEAM_EMAIL`
   - **Valor:** `hola@zinergiamarketing.info` (o el email donde quieres recibir notificaciones)
   - **Entornos:** Production, Preview, Development
   - Si no está, se usará `hola@zinergiamarketing.info` por defecto

   **✅ BREVO_LIST_ID** (Opcional - Para agregar contactos a una lista)
   - **Nombre:** `BREVO_LIST_ID`
   - **Valor:** ID de tu lista en Brevo (número)
   - **Entornos:** Production, Preview, Development
   - Si no está, los contactos se crearán pero no se agregarán a ninguna lista

### Cómo Obtener tu API Key de Brevo:

1. **Inicia sesión en Brevo:**
   - Ve a [https://app.brevo.com](https://app.brevo.com)
   - Inicia sesión con tu cuenta

2. **Obtener API Key:**
   - Ve a **Settings** (⚙️) > **SMTP & API** > **API Keys**
   - Si no tienes una, haz clic en **"Generate a new API key"**
   - **Copia la API key** (formato: `xkeysib-...`)
   - ⚠️ **IMPORTANTE:** Solo se muestra una vez, guárdala bien

3. **Agregar en Vercel:**
   - Pega la API key en la variable `BREVO_API_KEY`
   - Guarda los cambios
   - Vercel desplegará automáticamente

---

## 🔧 Paso 2: Configurar Dominio de Envío en Brevo

Para que los emails se envíen desde `noreply@zinergiamarketing.info`:

1. **En Brevo, ve a:**
   - **Settings** > **Senders & IP** > **Domains**
   - Haz clic en **"Add a domain"**

2. **Agrega tu dominio:**
   - Ingresa: `zinergiamarketing.info`
   - Haz clic en **"Add domain"**

3. **Verifica el dominio:**
   - Brevo te dará registros DNS para agregar en Porkbun
   - Agrega estos registros en Porkbun:
     - **Tipo:** TXT
     - **Host:** `brevo-code` (o el que Brevo te dé)
     - **Answer:** [El valor que Brevo te dé]
   - También necesitarás agregar un registro SPF (si no lo tienes ya):
     - **Tipo:** TXT
     - **Host:** @
     - **Answer:** `v=spf1 include:spf.brevo.com ~all`
     - ⚠️ Si ya tienes SPF para Zoho, combínalo: `v=spf1 include:zoho.com include:spf.brevo.com ~all`

4. **Verificar en Brevo:**
   - Espera 5-10 minutos
   - En Brevo, haz clic en **"Verify"**
   - Deberías ver un check verde ✅

5. **Crear remitente:**
   - Ve a **Senders & IP** > **Senders**
   - Haz clic en **"Add a sender"**
   - **Email:** `noreply@zinergiamarketing.info`
   - **Name:** `Zinergia Marketing`
   - Verifica el email (Brevo enviará un código de verificación)

---

## 🧪 Paso 3: Probar el Formulario

### Prueba Local (Opcional):

1. **Crea archivo `.env.local`** en la raíz del proyecto:
   ```env
   BREVO_API_KEY=xkeysib-tu_api_key_aqui
   ZINERGIA_TEAM_EMAIL=hola@zinergiamarketing.info
   BREVO_LIST_ID=123  # Opcional
   ```

2. **Ejecuta el proyecto:**
   ```bash
   npm run dev
   ```

3. **Prueba el formulario:**
   - Ve a `http://localhost:3000`
   - Llena el formulario de contacto
   - Envía el formulario
   - Verifica que:
     - ✅ Aparezca el mensaje de éxito
     - ✅ Recibas el email de confirmación
     - ✅ El equipo reciba la notificación

### Prueba en Producción (Vercel):

1. **Ve a tu sitio en Vercel:**
   - `https://zinergiamarketing.info` (o tu URL de Vercel)

2. **Llena el formulario:**
   - Usa datos reales o de prueba
   - Envía el formulario

3. **Verifica:**
   - ✅ Mensaje de éxito en la página
   - ✅ Email de confirmación recibido
   - ✅ Notificación al equipo recibida
   - ✅ Contacto agregado en Brevo (ve a **Contacts** en Brevo)

---

## 📋 Funcionalidades del Formulario

### ✅ Lo que hace actualmente:

1. **Validación completa:**
   - Nombre (mínimo 2 caracteres)
   - Email (formato válido)
   - Teléfono (formato colombiano opcional)
   - Servicio (requerido)
   - Presupuesto (requerido)
   - Mensaje (mínimo 10 caracteres)

2. **Al enviar:**
   - ✅ Agrega el contacto a Brevo
   - ✅ Envía email de confirmación al cliente
   - ✅ Envía notificación al equipo de Zinergia
   - ✅ Registra evento en Google Analytics
   - ✅ Muestra mensaje de éxito

3. **Emails enviados:**
   - **Al cliente:** Confirmación de recepción
   - **Al equipo:** Notificación con todos los datos del contacto

---

## 🔍 Verificar que Todo Funciona

### Checklist:

- [ ] Variable `BREVO_API_KEY` configurada en Vercel
- [ ] Variable `ZINERGIA_TEAM_EMAIL` configurada (o usando el valor por defecto)
- [ ] Dominio `zinergiamarketing.info` verificado en Brevo
- [ ] Remitente `noreply@zinergiamarketing.info` creado y verificado en Brevo
- [ ] Registros DNS de Brevo agregados en Porkbun
- [ ] Formulario probado localmente (opcional)
- [ ] Formulario probado en producción
- [ ] Email de confirmación recibido
- [ ] Notificación al equipo recibida
- [ ] Contacto aparece en Brevo

---

## 🆘 Solución de Problemas

### ❌ "Error al enviar el formulario"

**Posibles causas:**
1. **API Key no configurada:**
   - Verifica que `BREVO_API_KEY` esté en Vercel
   - Verifica que no tenga espacios extra
   - Verifica que esté en los 3 entornos (Production, Preview, Development)

2. **API Key inválida:**
   - Verifica que la API key sea correcta en Brevo
   - Genera una nueva si es necesario

3. **Dominio no verificado:**
   - Verifica que el dominio esté verificado en Brevo
   - Verifica los registros DNS en Porkbun

**Solución:**
- Revisa los logs de Vercel: **Deployments** > Selecciona el deployment > **Functions** > Busca errores
- Revisa la consola del navegador (F12) para ver errores del cliente

### ❌ "Emails no se envían"

**Posibles causas:**
1. **Remitente no verificado:**
   - Verifica que `noreply@zinergiamarketing.info` esté verificado en Brevo
   - Revisa tu email para el código de verificación

2. **Dominio no verificado:**
   - Verifica que el dominio esté verificado en Brevo
   - Verifica los registros DNS

3. **Límite de emails alcanzado:**
   - Brevo free tier tiene límites
   - Verifica tu plan en Brevo

**Solución:**
- Revisa en Brevo: **Settings** > **Senders & IP** > Verifica el estado de tu dominio y remitente
- Revisa los logs de Brevo: **Statistics** > **Email Logs**

### ❌ "Contacto no se agrega a Brevo"

**Posibles causas:**
1. **API Key incorrecta:**
   - Verifica que la API key sea correcta

2. **Error en la API:**
   - Revisa los logs de Vercel para ver el error específico

**Solución:**
- Revisa los logs de Vercel
- Verifica en Brevo que el contacto no se haya creado (puede que el email ya exista)

### ❌ "Emails van a spam"

**Solución:**
1. **Configura SPF correctamente:**
   - Debe incluir tanto Zoho como Brevo: `v=spf1 include:zoho.com include:spf.brevo.com ~all`

2. **Configura DKIM:**
   - Verifica que DKIM esté configurado en Brevo
   - Agrega los registros DNS que Brevo te dé

3. **Calienta el dominio:**
   - Envía algunos emails de prueba
   - No envíes muchos emails al principio

---

## 📊 Monitoreo

### En Brevo:

1. **Ver contactos:**
   - Ve a **Contacts** para ver todos los contactos agregados

2. **Ver estadísticas:**
   - Ve a **Statistics** > **Email Logs** para ver emails enviados
   - Ve a **Statistics** > **Campaigns** para ver campañas

3. **Ver límites:**
   - Ve a **Settings** > **Account** para ver tu plan y límites

### En Vercel:

1. **Ver logs:**
   - Ve a **Deployments** > Selecciona un deployment > **Functions**
   - Busca errores en las funciones API

2. **Ver métricas:**
   - Ve a **Analytics** para ver tráfico y conversiones

---

## 🎉 ¡Listo!

Una vez que todo esté configurado:
- ✅ El formulario funcionará correctamente
- ✅ Los clientes recibirán confirmación automática
- ✅ El equipo recibirá notificaciones
- ✅ Los contactos se guardarán en Brevo
- ✅ Podrás hacer seguimiento desde Brevo

**Siguiente paso:** Configurar Zoho Mail para recibir las notificaciones del equipo (ver `ZOHO_EMAIL_SETUP.md`).

