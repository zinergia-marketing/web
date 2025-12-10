# Guía de Despliegue - Zinergia Landing Page

## Pre-requisitos

1. Node.js 18+ instalado
2. Cuenta en Brevo (Sendinblue) para emails
3. Cuenta en Google Analytics 4
4. Número de WhatsApp Business

## Pasos para Despliegue

### 1. Instalación de Dependencias

```bash
npm install
```

### 2. Configuración de Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
# Brevo Email API
NEXT_PUBLIC_BREVO_API_KEY=xkeysib-tu_api_key_aqui
BREVO_LIST_ID=tu_list_id_aqui

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXX

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=57XXXXXXXXX

# Domain
NEXT_PUBLIC_DOMAIN=zinergiamarketing.com
```

### 3. Obtener Credenciales de Brevo

1. Ve a [Brevo](https://www.brevo.com/) y crea una cuenta
2. Ve a Settings > API Keys
3. Crea una nueva API Key
4. Copia la API Key (formato: `xkeysib-...`)
5. Ve a Contacts > Lists
6. Crea una lista llamada "Leads Zinergia"
7. Copia el ID de la lista

### 4. Configurar Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una nueva propiedad GA4
3. Copia el Measurement ID (formato: `G-XXXXXXXXX`)
4. Agrega el ID en `.env.local`

### 5. Build y Test Local

```bash
npm run build
npm run start
```

Verifica que todo funcione correctamente en `http://localhost:3000`

### 6. Despliegue en Vercel (Recomendado)

1. Instala Vercel CLI: `npm i -g vercel`
2. Ejecuta: `vercel`
3. Sigue las instrucciones
4. Agrega las variables de entorno en el dashboard de Vercel
5. El sitio se desplegará automáticamente

### 7. Despliegue en Otros Servicios

#### Netlify

1. Conecta tu repositorio Git
2. Configura:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Agrega las variables de entorno en Netlify Dashboard

#### Servidor Propio

1. Ejecuta `npm run build`
2. Ejecuta `npm run start`
3. Configura un reverse proxy (nginx) apuntando al puerto 3000

## Verificación Post-Despliegue

- [ ] Formulario de contacto funciona
- [ ] Formulario de newsletter funciona
- [ ] Botón de WhatsApp funciona
- [ ] Google Analytics está rastreando eventos
- [ ] Emails se están enviando correctamente
- [ ] Contactos se están agregando a Brevo
- [ ] SEO: Verifica sitemap.xml y robots.txt
- [ ] Responsive design funciona en móviles

## Troubleshooting

### Emails no se envían

- Verifica que `NEXT_PUBLIC_BREVO_API_KEY` esté correctamente configurada
- Verifica que el dominio esté verificado en Brevo
- Revisa los logs del servidor para errores

### Google Analytics no funciona

- Verifica que `NEXT_PUBLIC_GA_ID` esté correctamente configurada
- Usa la extensión Google Tag Assistant para debuggear
- Verifica la consola del navegador para errores

### WhatsApp no funciona

- Verifica que el número esté en formato internacional sin el signo +
- Ejemplo correcto: `573001234567`
- Prueba el link manualmente: `https://wa.me/573001234567?text=Hola`

## Soporte

Para problemas técnicos, contacta al equipo de desarrollo.

