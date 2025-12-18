# 🔧 Configurar Brevo - Pasos Rápidos

## ❌ Problema Detectado

Tu archivo `.env.local` tiene:
- ❌ `NEXT_PUBLIC_BREVO_API_KEY=xkeysib-xxxxx` (placeholder, no es real)
- ❌ Variable incorrecta (debe ser `BREVO_API_KEY` sin `NEXT_PUBLIC_`)

## ✅ Solución Paso a Paso

### Paso 1: Obtener tu API Key Real de Brevo

1. **Ve a Brevo:**
   - [https://app.brevo.com](https://app.brevo.com)
   - Inicia sesión

2. **Obtener API Key:**
   - Ve a **Settings** (⚙️) > **SMTP & API** > **API Keys**
   - Si no tienes una, haz clic en **"Generate a new API key"**
   - **Name:** Zinergia Website
   - **Permissions:** Marca "Manage account" y "Send emails"
   - **Copia la API key** (formato: `xkeysib-...`)
   - ⚠️ **IMPORTANTE:** Solo se muestra una vez, guárdala bien

### Paso 2: Actualizar .env.local

Abre tu archivo `.env.local` y reemplázalo con:

```env
# Brevo Email API (IMPORTANTE: Sin NEXT_PUBLIC_ para seguridad)
BREVO_API_KEY=xkeysib-TU_API_KEY_REAL_AQUI
BREVO_LIST_ID=2
ZINERGIA_TEAM_EMAIL=hola@zinergiamarketing.info

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXX

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=57XXXXXXXXX

# Domain
NEXT_PUBLIC_DOMAIN=zinergiamarketing.info
```

**⚠️ IMPORTANTE:**
- Reemplaza `xkeysib-TU_API_KEY_REAL_AQUI` con tu API key real
- Usa `BREVO_API_KEY` (sin `NEXT_PUBLIC_`)
- No dejes espacios antes o después del `=`

### Paso 3: Verificar Localmente

Ejecuta el script de prueba:

```bash
node test-brevo.js
```

**Deberías ver:**
- ✅ Cuenta verificada correctamente
- ✅ Acceso a contactos OK
- ✅ Contacto de prueba creado
- ✅ Remitentes encontrados

### Paso 4: Configurar en Vercel

1. **Ve a Vercel Dashboard:**
   - [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - Selecciona tu proyecto `web`
   - Ve a **Settings** > **Environment Variables**

2. **Agregar/Buscar `BREVO_API_KEY`:**
   - Si existe, edítala
   - Si no existe, haz clic en **"Add New"**
   - **Key:** `BREVO_API_KEY`
   - **Value:** Tu API key real (la misma que en .env.local)
   - **Marca los 3 entornos:** Production, Preview, Development
   - Haz clic en **"Save"**

3. **Eliminar `NEXT_PUBLIC_BREVO_API_KEY` (si existe):**
   - Busca esta variable
   - Elimínala (no la necesitas)

4. **Verificar otras variables:**
   - `ZINERGIA_TEAM_EMAIL` = `hola@zinergiamarketing.info`
   - `BREVO_LIST_ID` = `2` (opcional)

5. **Vercel desplegará automáticamente** con los nuevos valores

### Paso 5: Verificar Remitente en Brevo

Para enviar emails, necesitas un remitente verificado:

1. **Ve a Brevo:**
   - **Settings** > **Senders & IP** > **Senders**

2. **Verificar que exista:**
   - `noreply@zinergiamarketing.info`
   - O el email que quieras usar

3. **Si NO existe:**
   - Haz clic en **"Add a sender"**
   - **Email:** `noreply@zinergiamarketing.info`
   - **Name:** `Zinergia Marketing`
   - Verifica el email (Brevo enviará un código)

### Paso 6: Probar en Producción

1. **Espera a que Vercel termine de desplegar** (1-2 minutos)

2. **Ve a tu sitio:**
   - `https://zinergiamarketing.info`

3. **Llena el formulario de contacto**

4. **Verifica:**
   - ✅ Mensaje de éxito aparece
   - ✅ Recibes email de confirmación
   - ✅ El equipo recibe notificación
   - ✅ Contacto aparece en Brevo

---

## ✅ Checklist Final

- [ ] API key real obtenida de Brevo
- [ ] `.env.local` actualizado con `BREVO_API_KEY` (sin NEXT_PUBLIC_)
- [ ] Script de prueba (`node test-brevo.js`) pasa todos los tests
- [ ] `BREVO_API_KEY` configurada en Vercel
- [ ] `NEXT_PUBLIC_BREVO_API_KEY` eliminada de Vercel (si existía)
- [ ] Remitente verificado en Brevo
- [ ] Formulario probado en producción
- [ ] Emails recibidos correctamente

---

## 🆘 Si Sigue Sin Funcionar

1. **Revisa los logs de Vercel:**
   - Ve a **Deployments** > Último deployment > **Functions**
   - Busca errores relacionados con Brevo

2. **Verifica que la API key sea correcta:**
   - No debe tener espacios
   - Debe empezar con `xkeysib-`
   - Debe ser la misma en `.env.local` y Vercel

3. **Ejecuta el script de prueba nuevamente:**
   ```bash
   node test-brevo.js
   ```
   - Si falla localmente, no funcionará en producción

---

## 📞 Resumen

**El problema principal es que tu API key es un placeholder (`xkeysib-xxxxx`).**

**Solución:**
1. Obtén tu API key real de Brevo
2. Actualiza `.env.local` con `BREVO_API_KEY=tu_key_real`
3. Configura la misma key en Vercel
4. Verifica el remitente en Brevo

¡Una vez hecho esto, todo debería funcionar! 🎉

