# ✅ Guía Paso a Paso: Verificar Remitente en Brevo

## 🎯 Objetivo
Verificar que el remitente `reactivomarketingcol@gmail.com` esté verificado en Brevo para que los emails lleguen correctamente.

---

## 📋 Paso 1: Iniciar Sesión en Brevo

1. **Ve a:** [https://app.brevo.com](https://app.brevo.com)
2. **Inicia sesión** con tus credenciales
3. Espera a que cargue el dashboard

---

## 📋 Paso 2: Ir a la Sección de Senders

1. **En el menú lateral izquierdo**, busca **"Settings"** (⚙️ Configuración)
2. **Haz clic en "Settings"**
3. **En el submenú**, busca **"Senders & IP"**
4. **Haz clic en "Senders & IP"**
5. **Haz clic en "Senders"** (o "Remitentes")

**URL directa:** [https://app.brevo.com/settings/senders](https://app.brevo.com/settings/senders)

---

## 📋 Paso 3: Verificar el Remitente

1. **Busca en la lista** el remitente: `reactivomarketingcol@gmail.com`
2. **Revisa la columna "Status"** o "Estado":
   - ✅ **"Verified"** o **"Verificado"** = Todo bien
   - ❌ **"Pending"** o **"Pendiente"** = Necesita verificación
   - ❌ **"Unverified"** o **"No verificado"** = Necesita verificación

---

## 📋 Paso 4: Verificar el Remitente (Si NO está verificado)

### Si el remitente NO está verificado:

1. **Haz clic en el remitente** `reactivomarketingcol@gmail.com`
2. **Busca un botón** que diga:
   - "Verify" (Verificar)
   - "Send verification email" (Enviar email de verificación)
   - "Resend verification" (Reenviar verificación)

3. **Haz clic en ese botón**

4. **Revisa tu email:**
   - Ve a la bandeja de entrada de `reactivomarketingcol@gmail.com`
   - Busca un email de Brevo con el asunto "Verify your sender email" o similar
   - Abre el email y haz clic en el enlace de verificación
   - O copia el código de verificación

5. **Si te pide un código:**
   - Copia el código del email
   - Regresa a Brevo
   - Pega el código en el campo correspondiente
   - Haz clic en "Verify" o "Verificar"

---

## 📋 Paso 5: Verificar que Está Verificado

1. **Regresa a la lista de Senders**
2. **Verifica que el remitente** `reactivomarketingcol@gmail.com` muestre:
   - ✅ Estado: **"Verified"** o **"Verificado"**
   - ✅ Un check verde o ícono de verificación

---

## 📋 Paso 6: Revisar los Logs de Emails (Opcional)

Para ver si los emails se están enviando correctamente:

1. **En el menú lateral**, busca **"Statistics"** (📊 Estadísticas)
2. **Haz clic en "Statistics"**
3. **Haz clic en "Email Logs"** (Logs de emails)
4. **Revisa los emails enviados recientemente:**
   - Busca emails enviados desde `reactivomarketingcol@gmail.com`
   - Revisa el estado:
     - ✅ **"Delivered"** = Email entregado
     - ⚠️ **"Bounced"** = Email rebotó
     - ⚠️ **"Spam"** = Marcado como spam
     - ❌ **"Blocked"** = Bloqueado

---

## ✅ Checklist de Verificación

Marca cada paso cuando lo completes:

- [ ] Inicié sesión en Brevo
- [ ] Fui a Settings > Senders & IP > Senders
- [ ] Encontré el remitente `reactivomarketingcol@gmail.com`
- [ ] Verifiqué el estado del remitente
- [ ] Si no estaba verificado, lo verifiqué
- [ ] Confirmé que ahora está verificado (✅)
- [ ] Revisé los logs de emails (opcional)

---

## 🆘 Problemas Comunes

### ❌ "No encuentro el remitente"

**Solución:**
- Haz clic en **"Add a sender"** o **"Agregar remitente"**
- Ingresa: `reactivomarketingcol@gmail.com`
- Name: `Zinergia Marketing`
- Haz clic en **"Save"** o **"Guardar"**
- Sigue el Paso 4 para verificar

### ❌ "No recibí el email de verificación"

**Solución:**
1. Revisa la carpeta de spam
2. Espera 5-10 minutos
3. Haz clic en **"Resend verification"** o **"Reenviar verificación"**
4. Si aún no llega, verifica que el email sea correcto

### ❌ "El remitente está verificado pero los emails no llegan"

**Solución:**
1. Revisa los logs de emails (Paso 6)
2. Verifica la carpeta de spam del destinatario
3. Revisa los logs de Vercel para ver si hay errores
4. Verifica que la API key esté correcta en Vercel

---

## 📞 Después de Verificar

Una vez que el remitente esté verificado:

1. **Prueba el formulario nuevamente** en tu sitio
2. **Revisa si recibes los emails** (tanto el de confirmación como el de notificación)
3. **Si aún no llegan**, revisa:
   - Los logs de Brevo (Statistics > Email Logs)
   - Los logs de Vercel (para ver Message IDs)
   - La carpeta de spam

---

## 🎉 ¡Listo!

Una vez que el remitente esté verificado, los emails deberían llegar correctamente. Si después de verificar el remitente los emails aún no llegan, avísame y revisamos los logs juntos.

