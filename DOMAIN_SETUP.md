# Guía de Configuración del Dominio zinergiamarketing.info

## 📧 Opciones de Email Gratis con Dominio Personalizado

### ✅ Opción 1: Zoho Mail (RECOMENDADA - GRATIS)
**Ventajas:**
- ✅ **100% Gratis** hasta 5 usuarios
- ✅ 5GB de almacenamiento por usuario
- ✅ Interfaz web y apps móviles
- ✅ Fácil de configurar
- ✅ Sin límite de tiempo

**Pasos:**
1. Ve a [https://www.zoho.com/mail/](https://www.zoho.com/mail/)
2. Crea una cuenta gratuita
3. Selecciona "Add Domain" y agrega `zinergiamarketing.info`
4. Verifica el dominio siguiendo las instrucciones
5. Configura los registros MX en tu proveedor de dominio
6. ¡Listo! Puedes crear emails como `hola@zinergiamarketing.info`

**Registros MX para Zoho:**
```
mx.zoho.com (prioridad 10)
mx2.zoho.com (prioridad 20)
```

### ⚠️ Opción 2: Brevo (Solo para emails transaccionales)
- Brevo puede enviar emails desde tu dominio
- NO es un servicio de correo completo (no puedes recibir emails)
- Solo para emails de marketing/transaccionales

### ❌ Otras opciones
- Google Workspace: Ya no tiene plan gratuito (desde $6/usuario/mes)
- Microsoft 365: Desde $6/usuario/mes
- ProtonMail: No gratis para dominio personalizado

---

## 🔗 Conectar Dominio a Vercel

### Paso 1: Agregar Dominio en Vercel

1. Ve a [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto `web`
3. Ve a **Settings** > **Domains**
4. Haz clic en **Add Domain**
5. Ingresa: `zinergiamarketing.info`
6. También agrega: `www.zinergiamarketing.info` (opcional pero recomendado)

### Paso 2: Configurar DNS en tu Proveedor de Dominio

Vercel te dará los registros DNS que necesitas. Ejemplo:

**Registros A (si tu proveedor no soporta CNAME en raíz):**
```
@  A  76.76.21.21
@  A  76.76.21.21
```

**O Registro CNAME (recomendado):**
```
@  CNAME  cname.vercel-dns.com
www  CNAME  cname.vercel-dns.com
```

**Configuración en tu proveedor de dominio:**
1. Accede al panel de control de tu proveedor de dominio
2. Ve a la sección de DNS o "Manage DNS"
3. Agrega los registros que Vercel te proporciona
4. Espera 24-48 horas para que se propague (aunque suele ser más rápido)

### Paso 3: Actualizar Variable de Entorno en Vercel

1. En Vercel, ve a **Settings** > **Environment Variables**
2. Busca o crea: `NEXT_PUBLIC_DOMAIN`
3. Cambia el valor a: `zinergiamarketing.info`
4. Guarda los cambios
5. Vercel desplegará automáticamente con el nuevo dominio

---

## 📧 Configurar Email con Zoho Mail

### Paso 1: Crear Cuenta en Zoho

1. Ve a [https://www.zoho.com/mail/](https://www.zoho.com/mail/)
2. Haz clic en **Sign Up Now** (gratis)
3. Completa el registro

### Paso 2: Agregar tu Dominio

1. En el panel de Zoho, ve a **Control Panel** > **Domains**
2. Haz clic en **Add Domain**
3. Ingresa: `zinergiamarketing.info`
4. Selecciona el plan **Free** (5 usuarios gratis)

### Paso 3: Verificar el Dominio

Zoho te dará dos opciones:

**Opción A: Verificación por TXT Record (Recomendada)**
1. Zoho te dará un registro TXT
2. Agrega este registro en tu proveedor de dominio:
   ```
   Tipo: TXT
   Nombre: @ (o raíz)
   Valor: [el valor que Zoho te da]
   ```

**Opción B: Verificación por CNAME**
1. Zoho te dará un registro CNAME
2. Agrega este registro en tu proveedor de dominio

### Paso 4: Configurar Registros MX

Una vez verificado el dominio, Zoho te dará los registros MX:

1. En tu proveedor de dominio, agrega estos registros MX:
   ```
   Tipo: MX
   Nombre: @ (o raíz)
   Prioridad: 10
   Valor: mx.zoho.com
   
   Tipo: MX
   Nombre: @ (o raíz)
   Prioridad: 20
   Valor: mx2.zoho.com
   ```

2. Elimina cualquier otro registro MX que exista

### Paso 5: Crear Cuentas de Email

1. En Zoho Mail, ve a **Users**
2. Haz clic en **Add User**
3. Crea las cuentas que necesites:
   - `hola@zinergiamarketing.info` (principal)
   - `noreply@zinergiamarketing.info` (para emails automáticos)
   - Otras que necesites

### Paso 6: Configurar SPF y DKIM (Importante para deliverability)

**SPF Record:**
Agrega este registro TXT en tu proveedor de dominio:
```
Tipo: TXT
Nombre: @
Valor: v=spf1 include:zoho.com ~all
```

**DKIM:**
1. En Zoho, ve a **Control Panel** > **Domains** > **Authentication**
2. Zoho te dará un registro DKIM
3. Agrega ese registro TXT en tu proveedor de dominio

---

## 🔧 Actualizar Código para el Nuevo Dominio

Una vez que tengas el dominio configurado, actualiza:

1. **Variable de entorno en Vercel:**
   - `NEXT_PUBLIC_DOMAIN` = `zinergiamarketing.info`

2. **Emails en el código:**
   - Cambiar `hola@zinergiamarketing.com` → `hola@zinergiamarketing.info`
   - Cambiar `noreply@zinergiamarketing.com` → `noreply@zinergiamarketing.info`

---

## ⏱️ Tiempos de Propagación

- **DNS básico:** 1-4 horas
- **Registros MX (email):** 4-24 horas
- **Propagación completa:** Hasta 48 horas

---

## ✅ Checklist de Configuración

- [ ] Dominio agregado en Vercel
- [ ] Registros DNS configurados en proveedor de dominio
- [ ] Variable `NEXT_PUBLIC_DOMAIN` actualizada en Vercel
- [ ] Cuenta de Zoho Mail creada
- [ ] Dominio verificado en Zoho
- [ ] Registros MX configurados
- [ ] Registros SPF configurados
- [ ] Registros DKIM configurados
- [ ] Cuentas de email creadas en Zoho
- [ ] Código actualizado con nuevo dominio
- [ ] Prueba de envío/recepción de emails

---

## 🆘 Soporte

Si tienes problemas:
- **Vercel:** [https://vercel.com/docs](https://vercel.com/docs)
- **Zoho Mail:** [https://help.zoho.com/portal/en/kb/mail](https://help.zoho.com/portal/en/kb/mail)
- **DNS Checker:** [https://dnschecker.org](https://dnschecker.org) (para verificar propagación)

