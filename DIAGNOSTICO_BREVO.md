# 🔍 Diagnóstico de Problemas con Brevo

## Problema: "Ya tengo la API key pero nada funciona"

Sigue estos pasos para diagnosticar el problema:

---

## 📋 Paso 1: Verificar la API Key Localmente

### Opción A: Usar el Script de Prueba

1. **Crea un archivo `.env.local`** en la raíz del proyecto:
   ```env
   BREVO_API_KEY=xkeysib-tu_api_key_aqui
   ```

2. **Ejecuta el script de prueba:**
   ```bash
   node test-brevo.js
   ```

3. **Revisa los resultados:**
   - ✅ Si todos los tests pasan: El problema está en Vercel
   - ❌ Si hay errores: Sigue las instrucciones del error

### Opción B: Probar Manualmente

1. **Inicia el servidor local:**
   ```bash
   npm run dev
   ```

2. **Abre:** `http://localhost:3000`

3. **Llena el formulario de contacto**

4. **Revisa la consola del servidor** (donde ejecutaste `npm run dev`)
   - Busca errores relacionados con Brevo
   - Busca mensajes como "Brevo API key no configurada"

---

## 📋 Paso 2: Verificar la API Key en Vercel

### Verificar que esté configurada:

1. **Ve a Vercel Dashboard:**
   - [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - Selecciona tu proyecto `web`
   - Ve a **Settings** > **Environment Variables**

2. **Busca `BREVO_API_KEY`:**
   - ✅ Debe existir
   - ✅ Debe tener el valor correcto (formato: `xkeysib-...`)
   - ✅ Debe estar marcada para **Production**, **Preview** y **Development**

3. **Si NO existe o está mal:**
   - Haz clic en **"Add New"**
   - **Key:** `BREVO_API_KEY`
   - **Value:** Tu API key de Brevo
   - **Marca los 3 entornos:** Production, Preview, Development
   - Haz clic en **"Save"**
   - **IMPORTANTE:** Vercel desplegará automáticamente

### Verificar que no tenga espacios:

- La API key NO debe tener espacios al inicio o final
- Copia y pega directamente desde Brevo
- No agregues comillas

---

## 📋 Paso 3: Verificar la API Key en Brevo

1. **Ve a Brevo:**
   - [https://app.brevo.com](https://app.brevo.com)
   - Inicia sesión

2. **Verifica tu API Key:**
   - Ve a **Settings** (⚙️) > **SMTP & API** > **API Keys**
   - Verifica que la API key que estás usando esté activa
   - Si no está activa o no existe, crea una nueva:
     - Haz clic en **"Generate a new API key"**
     - **Name:** Zinergia Website
     - **Permissions:** Marca "Manage account" y "Send emails"
     - Copia la nueva API key
     - Actualiza en Vercel

---

## 📋 Paso 4: Verificar los Logs de Vercel

Los logs te dirán exactamente qué está fallando:

1. **Ve a Vercel Dashboard:**
   - Selecciona tu proyecto
   - Ve a **Deployments**
   - Haz clic en el deployment más reciente

2. **Revisa los logs:**
   - Haz clic en **"Functions"** o **"Logs"**
   - Busca errores relacionados con:
     - "Brevo API key no configurada"
     - "401 Unauthorized"
     - "Error al agregar contacto a Brevo"
     - "Error al enviar email transaccional"

3. **Errores comunes y soluciones:**

   **❌ "Brevo API key no configurada"**
   - **Solución:** Agrega `BREVO_API_KEY` en Vercel (ver Paso 2)

   **❌ "401 Unauthorized"**
   - **Solución:** La API key es inválida o expiró
   - Genera una nueva en Brevo y actualiza en Vercel

   **❌ "Invalid API key"**
   - **Solución:** Verifica que la API key esté correcta
   - No debe tener espacios
   - Debe empezar con `xkeysib-`

   **❌ "Sender email not verified"**
   - **Solución:** Verifica el remitente en Brevo (ver Paso 5)

---

## 📋 Paso 5: Verificar Remitente en Brevo

Para enviar emails, necesitas un remitente verificado:

1. **Ve a Brevo:**
   - **Settings** > **Senders & IP** > **Senders**

2. **Verifica que exista:**
   - `noreply@zinergiamarketing.info`
   - O el email que estés usando

3. **Si NO existe:**
   - Haz clic en **"Add a sender"**
   - **Email:** `noreply@zinergiamarketing.info`
   - **Name:** `Zinergia Marketing`
   - Haz clic en **"Save"**
   - Brevo enviará un email de verificación
   - Verifica el email y confirma

4. **Si existe pero NO está verificado:**
   - Haz clic en el remitente
   - Revisa tu email para el código de verificación
   - Ingresa el código en Brevo

---

## 📋 Paso 6: Probar el Formulario en Producción

1. **Ve a tu sitio:**
   - `https://zinergiamarketing.info` (o tu URL de Vercel)

2. **Abre las herramientas de desarrollador:**
   - Presiona `F12` o clic derecho > **Inspeccionar**
   - Ve a la pestaña **Console**

3. **Llena el formulario:**
   - Usa datos de prueba
   - Envía el formulario

4. **Revisa la consola:**
   - Busca errores en rojo
   - Busca mensajes de éxito

5. **Revisa la pestaña Network:**
   - Busca la petición a `/api/contact`
   - Haz clic en ella
   - Revisa la respuesta:
     - ✅ **200 OK:** Todo bien
     - ❌ **500 Error:** Revisa los logs de Vercel
     - ❌ **400 Bad Request:** Error de validación

---

## 📋 Paso 7: Verificar en Brevo

Después de enviar el formulario:

1. **Ve a Brevo:**
   - **Contacts** > **All contacts**
   - Busca el contacto que acabas de crear

2. **Si el contacto NO aparece:**
   - Revisa los logs de Vercel (Paso 4)
   - Verifica que la API key sea correcta

3. **Ve a Statistics:**
   - **Statistics** > **Email Logs**
   - Busca los emails enviados

---

## 🆘 Problemas Comunes y Soluciones

### ❌ "El formulario se envía pero no recibo emails"

**Causas posibles:**
1. Remitente no verificado
2. Emails van a spam
3. Error silencioso en el envío

**Solución:**
- Verifica el remitente en Brevo (Paso 5)
- Revisa la carpeta de spam
- Revisa los logs de Vercel para errores de envío

### ❌ "Error 500 al enviar el formulario"

**Causas posibles:**
1. API key no configurada
2. API key inválida
3. Error en la API de Brevo

**Solución:**
- Revisa los logs de Vercel (Paso 4)
- Verifica la API key (Paso 2 y 3)
- Prueba localmente primero (Paso 1)

### ❌ "El contacto se crea pero no se envía el email"

**Causas posibles:**
1. Remitente no verificado
2. Sin créditos en Brevo
3. Error en la función de envío

**Solución:**
- Verifica el remitente (Paso 5)
- Revisa tu plan en Brevo (Settings > Account)
- Revisa los logs de Vercel para errores específicos

---

## ✅ Checklist de Verificación

Marca cada paso cuando lo completes:

- [ ] API key configurada en `.env.local` (local)
- [ ] Script de prueba (`node test-brevo.js`) pasa todos los tests
- [ ] API key configurada en Vercel como `BREVO_API_KEY`
- [ ] API key marcada para Production, Preview y Development
- [ ] API key verificada en Brevo (está activa)
- [ ] Remitente `noreply@zinergiamarketing.info` creado en Brevo
- [ ] Remitente verificado en Brevo
- [ ] Logs de Vercel revisados (sin errores)
- [ ] Formulario probado en producción
- [ ] Contacto aparece en Brevo después de enviar
- [ ] Emails recibidos correctamente

---

## 📞 Si Nada Funciona

1. **Revisa los logs de Vercel** (lo más importante)
2. **Prueba localmente primero** con el script de prueba
3. **Verifica que la API key sea correcta** (sin espacios, formato correcto)
4. **Contacta a Brevo** si el problema persiste:
   - [https://help.brevo.com](https://help.brevo.com)
   - O desde Brevo: **Help** > **Contact Support**

---

## 🎯 Resumen Rápido

**Si "nada funciona", verifica en este orden:**

1. ✅ API key configurada en Vercel como `BREVO_API_KEY`
2. ✅ API key correcta (sin espacios, formato `xkeysib-...`)
3. ✅ Remitente verificado en Brevo
4. ✅ Logs de Vercel sin errores
5. ✅ Formulario probado en producción

**El 90% de los problemas se resuelven verificando estos 5 puntos.**

