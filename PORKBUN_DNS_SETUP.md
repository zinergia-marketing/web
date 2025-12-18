# Configuración DNS en Porkbun para Vercel

## ⚠️ Problema Común: Error "A CNAME or ALIAS record already exists"

Este error ocurre porque **no puedes tener un registro A y un CNAME en la raíz (@) al mismo tiempo**.

## 🔧 Solución Paso a Paso

### Paso 1: Verificar Registros DNS Actuales

1. Inicia sesión en [Porkbun](https://porkbun.com)
2. Ve a **My Domains** > Selecciona `zinergiamarketing.info`
3. Haz clic en **DNS** o **DNS Records**
4. **Revisa todos los registros existentes**

### Paso 2: Eliminar Registros Conflictivos

**IMPORTANTE:** Antes de agregar los registros de Vercel, debes:

1. **Eliminar cualquier CNAME en la raíz (@)**
   - Busca registros tipo CNAME con nombre `@` o vacío
   - Elimínalos

2. **Eliminar cualquier ALIAS en la raíz (@)**
   - Busca registros tipo ALIAS con nombre `@`
   - Elimínalos

3. **Eliminar registros A antiguos** (si existen y no son de Vercel)
   - Solo mantén los que Vercel te indique

### Paso 3: Obtener Registros DNS de Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto `web`
3. Ve a **Settings** > **Domains**
4. Haz clic en `zinergiamarketing.info`
5. Vercel te mostrará los registros DNS que necesitas

**Registros típicos de Vercel para dominio raíz:**

**Opción 1: Registros A (Recomendado para Porkbun)**
```
Tipo: A
Nombre: @ (o deja vacío)
Valor: 76.76.21.21
TTL: 3600 (o Auto)

Tipo: A
Nombre: @ (o deja vacío)
Valor: 76.76.21.21
TTL: 3600 (o Auto)
```

**Opción 2: Si Vercel te da un CNAME (menos común para raíz)**
```
Tipo: ALIAS (Porkbun usa ALIAS en lugar de CNAME para raíz)
Nombre: @
Valor: cname.vercel-dns.com
TTL: 3600
```

### Paso 4: Configurar en Porkbun

**Para el dominio raíz (@):**

1. En Porkbun, ve a la sección de DNS
2. Si hay un CNAME o ALIAS en `@`, **ELIMÍNALO primero**
3. Agrega los registros A que Vercel te dio:
   - **Tipo:** A
   - **Host:** @ (o deja vacío)
   - **Answer:** `76.76.21.21` (o el IP que Vercel te dé)
   - **TTL:** 3600 (o Auto)

**Para www (opcional pero recomendado):**

1. Agrega un registro CNAME:
   - **Tipo:** CNAME
   - **Host:** www
   - **Answer:** `cname.vercel-dns.com` (o el que Vercel te dé)
   - **TTL:** 3600

### Paso 5: Verificar en Vercel

1. Espera 5-10 minutos después de agregar los registros
2. En Vercel, haz clic en **Refresh** o **Verify**
3. Vercel verificará automáticamente los registros

## 📋 Checklist de Registros DNS en Porkbun

Después de configurar, deberías tener:

**Para Vercel:**
- [ ] Registro A en `@` → IP de Vercel (ej: 76.76.21.21)
- [ ] Registro CNAME en `www` → cname.vercel-dns.com (opcional)

**Para Email (Zoho Mail) - Después de configurar:**
- [ ] Registro MX en `@` → mx.zoho.com (prioridad 10)
- [ ] Registro MX en `@` → mx2.zoho.com (prioridad 20)
- [ ] Registro TXT en `@` → Para verificación de Zoho
- [ ] Registro TXT en `@` → SPF: `v=spf1 include:zoho.com ~all`
- [ ] Registro TXT en `@` → DKIM (lo da Zoho)

## ⚠️ Notas Importantes

1. **No mezcles A y CNAME en la raíz:** Solo usa registros A para `@`
2. **TTL:** Usa 3600 (1 hora) o Auto
3. **Propagación:** Puede tardar 1-4 horas, aunque suele ser más rápido
4. **Verificación:** Usa [dnschecker.org](https://dnschecker.org) para verificar propagación

## 🆘 Si Sigue Sin Funcionar

1. **Espera 10-15 minutos** después de eliminar el CNAME
2. **Verifica que no haya otros registros** en la raíz
3. **Contacta a Porkbun** si el error persiste
4. **Usa ALIAS en lugar de CNAME** si Porkbun lo permite para la raíz

## 🔍 Verificar Propagación DNS

Usa estas herramientas:
- [DNS Checker](https://dnschecker.org) - Verifica propagación global
- [MXToolbox](https://mxtoolbox.com) - Verifica registros DNS
- Comando: `nslookup zinergiamarketing.info` (en terminal)

