# 📧 Guía Completa: Configurar Email con Zoho Mail

## 🎯 Objetivo
Configurar emails profesionales con tu dominio `zinergiamarketing.info` usando Zoho Mail (gratis hasta 5 usuarios).

---

## 📋 Paso 1: Crear Cuenta en Zoho Mail

1. **Ve a Zoho Mail:**
   - Abre: [https://www.zoho.com/mail/](https://www.zoho.com/mail/)
   - Haz clic en **"Sign Up Now"** o **"Get Started"**

2. **Completa el registro:**
   - Ingresa tu email personal (ej: tu email de Gmail)
   - Crea una contraseña
   - Completa la verificación de email

3. **Inicia sesión:**
   - Una vez verificado, inicia sesión en [https://mail.zoho.com](https://mail.zoho.com)

---

## 📋 Paso 2: Agregar tu Dominio

1. **Accede al Control Panel:**
   - En Zoho Mail, haz clic en el **menú (☰)** en la esquina superior izquierda
   - Selecciona **"Control Panel"** o ve a: [https://mailadmin.zoho.com](https://mailadmin.zoho.com)

2. **Agregar dominio:**
   - En el menú lateral, haz clic en **"Domains"**
   - Haz clic en **"Add Domain"** o **"Add New Domain"**
   - Ingresa: `zinergiamarketing.info`
   - Haz clic en **"Add"**

3. **Seleccionar plan:**
   - Selecciona el plan **"Free"** (5 usuarios gratis)
   - Haz clic en **"Continue"**

---

## 📋 Paso 3: Verificar el Dominio

Zoho necesita verificar que eres el dueño del dominio. Te dará dos opciones:

### ✅ Opción A: Verificación por TXT Record (RECOMENDADA)

1. **Obtener el registro TXT:**
   - Zoho te mostrará un registro TXT que debes agregar
   - Se verá algo como:
     ```
     zoho-verification=zb1234567890abcdef
     ```

2. **Agregar en Porkbun:**
   - Ve a [Porkbun](https://porkbun.com) > **My Domains** > `zinergiamarketing.info` > **DNS**
   - Haz clic en **"Add Record"** o **"Add"**
   - Configura:
     - **Tipo:** TXT
     - **Host:** @ (o deja vacío para raíz)
     - **Answer:** `zoho-verification=zb1234567890abcdef` (el valor que Zoho te dio)
     - **TTL:** 3600 (o Auto)
   - Haz clic en **"Add"**

3. **Verificar en Zoho:**
   - Espera 2-5 minutos
   - En Zoho, haz clic en **"Verify"** o **"Check Verification"**
   - Si todo está bien, verás un check verde ✅

### ⚠️ Opción B: Verificación por CNAME (Alternativa)

Si la opción TXT no funciona, Zoho te dará un CNAME:
- **Tipo:** CNAME
- **Host:** `zb1234567890` (lo que Zoho te dé)
- **Answer:** `zb1234567890.zoho.com` (lo que Zoho te dé)

---

## 📋 Paso 4: Configurar Registros MX (Para Recibir Emails)

**IMPORTANTE:** Los registros MX son los que permiten recibir emails.

1. **Obtener registros MX de Zoho:**
   - En Zoho, después de verificar el dominio, verás los registros MX
   - Son estos dos:
     ```
     mx.zoho.com (prioridad 10)
     mx2.zoho.com (prioridad 20)
     ```

2. **Agregar en Porkbun:**
   
   **Registro MX 1:**
   - **Tipo:** MX
   - **Host:** @ (o deja vacío)
   - **Priority:** 10
   - **Answer:** `mx.zoho.com`
   - **TTL:** 3600
   - Haz clic en **"Add"**

   **Registro MX 2:**
   - **Tipo:** MX
   - **Host:** @ (o deja vacío)
   - **Priority:** 20
   - **Answer:** `mx2.zoho.com`
   - **TTL:** 3600
   - Haz clic en **"Add"**

3. **Eliminar registros MX antiguos:**
   - Si tienes otros registros MX (de otros servicios), **elimínalos**
   - Solo deben quedar los dos de Zoho

4. **Verificar en Zoho:**
   - Espera 5-10 minutos
   - En Zoho, haz clic en **"Check MX Records"**
   - Deberías ver un check verde ✅

---

## 📋 Paso 5: Configurar SPF (Para Enviar Emails)

SPF ayuda a que tus emails no sean marcados como spam.

1. **Agregar registro SPF en Porkbun:**
   - Ve a Porkbun > DNS
   - Haz clic en **"Add Record"**
   - Configura:
     - **Tipo:** TXT
     - **Host:** @ (o deja vacío)
     - **Answer:** `v=spf1 include:zoho.com ~all`
     - **TTL:** 3600
   - Haz clic en **"Add"**

2. **Verificar en Zoho:**
   - En Zoho, ve a **Domains** > `zinergiamarketing.info` > **Authentication**
   - Verifica que el SPF esté configurado correctamente

---

## 📋 Paso 6: Configurar DKIM (Para Autenticación de Email)

DKIM firma tus emails para mejorar la deliverability.

1. **Obtener registro DKIM de Zoho:**
   - En Zoho, ve a **Domains** > `zinergiamarketing.info` > **Authentication**
   - Haz clic en **"DKIM"** o **"Enable DKIM"**
   - Zoho te dará un registro TXT largo, algo como:
     ```
     zoho._domainkey.zinergiamarketing.info
     v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...
     ```

2. **Agregar en Porkbun:**
   - Ve a Porkbun > DNS
   - Haz clic en **"Add Record"**
   - Configura:
     - **Tipo:** TXT
     - **Host:** `zoho._domainkey` (o el que Zoho te dé)
     - **Answer:** `v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...` (el valor completo que Zoho te dio)
     - **TTL:** 3600
   - Haz clic en **"Add"**

3. **Verificar en Zoho:**
   - Espera 5-10 minutos
   - En Zoho, haz clic en **"Verify DKIM"**
   - Deberías ver un check verde ✅

---

## 📋 Paso 7: Crear Cuentas de Email

Ahora puedes crear las cuentas de email que necesites.

1. **Crear cuenta principal:**
   - En Zoho, ve a **Users** o **User Management**
   - Haz clic en **"Add User"** o **"Create User"**
   - Completa:
     - **First Name:** Tu nombre
     - **Last Name:** Tu apellido
     - **Email Address:** `hola@zinergiamarketing.info`
     - **Password:** Crea una contraseña segura
     - **Storage:** 5GB (gratis)
   - Haz clic en **"Add"** o **"Create"**

2. **Crear cuenta para emails automáticos (opcional):**
   - Repite el proceso para crear:
     - `noreply@zinergiamarketing.info` (para emails automáticos)
     - O cualquier otra que necesites

3. **Acceder a tu email:**
   - Ve a [https://mail.zoho.com](https://mail.zoho.com)
   - Inicia sesión con: `hola@zinergiamarketing.info`
   - ¡Ya puedes enviar y recibir emails!

---

## 📋 Paso 8: Configurar Email en Aplicaciones (Opcional)

### Para Gmail / Outlook / Apple Mail:

1. **Obtener configuración IMAP/POP3:**
   - En Zoho, ve a **Settings** > **Mail Accounts** > **IMAP Access**
   - Anota estos datos:
     - **IMAP Server:** `imap.zoho.com`
     - **Puerto:** 993 (SSL)
     - **SMTP Server:** `smtp.zoho.com`
     - **Puerto:** 465 (SSL) o 587 (TLS)

2. **Configurar en tu cliente de email:**
   - Usa estos datos para configurar tu aplicación de email favorita

---

## ✅ Checklist de Configuración

Marca cada paso cuando lo completes:

- [ ] Cuenta de Zoho Mail creada
- [ ] Dominio `zinergiamarketing.info` agregado en Zoho
- [ ] Registro TXT de verificación agregado en Porkbun
- [ ] Dominio verificado en Zoho ✅
- [ ] Registro MX 1 (mx.zoho.com, prioridad 10) agregado
- [ ] Registro MX 2 (mx2.zoho.com, prioridad 20) agregado
- [ ] Registros MX verificados en Zoho ✅
- [ ] Registro SPF agregado en Porkbun
- [ ] Registro DKIM agregado en Porkbun
- [ ] DKIM verificado en Zoho ✅
- [ ] Cuenta `hola@zinergiamarketing.info` creada
- [ ] Prueba de recepción de email exitosa
- [ ] Prueba de envío de email exitosa

---

## 🔍 Verificar Propagación DNS

Usa estas herramientas para verificar que los registros estén propagados:

1. **DNS Checker:**
   - [https://dnschecker.org](https://dnschecker.org)
   - Busca: `zinergiamarketing.info`
   - Verifica que los registros MX aparezcan

2. **MXToolbox:**
   - [https://mxtoolbox.com](https://mxtoolbox.com)
   - Busca: `zinergiamarketing.info`
   - Verifica registros MX, SPF, DKIM

3. **Desde terminal (PowerShell):**
   ```powershell
   nslookup -type=MX zinergiamarketing.info
   ```

---

## ⏱️ Tiempos de Propagación

- **TXT (verificación):** 2-10 minutos
- **MX (email):** 4-24 horas (normalmente 1-2 horas)
- **SPF/DKIM:** 1-4 horas

**Nota:** La propagación puede variar. Si después de 24 horas no funciona, verifica que los registros estén correctos.

---

## 🆘 Problemas Comunes

### ❌ "Domain verification failed"
- **Solución:** Verifica que el registro TXT esté exactamente como Zoho lo dio (sin espacios extra)
- Espera 5-10 minutos antes de verificar

### ❌ "MX records not found"
- **Solución:** Verifica que los registros MX estén en la raíz (@), no en un subdominio
- Elimina cualquier otro registro MX que no sea de Zoho

### ❌ "Emails going to spam"
- **Solución:** Asegúrate de tener SPF y DKIM configurados correctamente
- Verifica en [MXToolbox](https://mxtoolbox.com) que todo esté bien

### ❌ "Cannot send emails"
- **Solución:** Verifica que el SPF esté configurado
- Usa el puerto correcto (465 SSL o 587 TLS) en tu cliente de email

---

## 📞 Soporte

- **Zoho Mail Help:** [https://help.zoho.com/portal/en/kb/mail](https://help.zoho.com/portal/en/kb/mail)
- **Zoho Community:** [https://help.zoho.com/portal/community](https://help.zoho.com/portal/community)

---

## 🎉 ¡Listo!

Una vez completado todo, podrás:
- ✅ Recibir emails en `hola@zinergiamarketing.info`
- ✅ Enviar emails desde tu dominio
- ✅ Usar hasta 5 cuentas de email gratis
- ✅ Acceder desde web, móvil o cliente de email

**Siguiente paso:** Configurar el formulario de contacto para que use Brevo para enviar emails transaccionales.

