# Zinergia Landing Page

Landing page profesional para Zinergia Marketing Agency construida con Next.js 14+, TypeScript y Tailwind CSS.

## 🚀 Características

- **Framework**: Next.js 14+ con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS con paleta personalizada
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form + Zod
- **Email**: Integración con Brevo (Sendinblue)
- **WhatsApp**: Botón flotante con enlaces directos
- **Analytics**: Google Analytics 4
- **SEO**: Optimizado con metadata, sitemap y robots.txt

## 📦 Instalación

1. Instala las dependencias:

```bash
npm install
```

2. Configura las variables de entorno:

Copia `.env.local.example` a `.env.local` y completa los valores:

```env
NEXT_PUBLIC_BREVO_API_KEY=tu_api_key_aqui
BREVO_LIST_ID=tu_list_id
NEXT_PUBLIC_GA_ID=G-XXXXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=57XXXXXXXXX
NEXT_PUBLIC_DOMAIN=zinergiamarketing.com
```

3. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🎨 Paleta de Colores

- **Morado Principal**: `#3b0b5b`
- **Coral/Rosa**: `#f97373`
- **Neutral**: `#e7d5c4`
- **Blanco**: `#ffffff`
- **Gris Oscuro**: `#1a1a1a`

## 📁 Estructura del Proyecto

```
├── app/
│   ├── api/          # Rutas API (contact, email)
│   ├── layout.tsx    # Layout principal con metadata
│   ├── page.tsx       # Página principal
│   ├── globals.css   # Estilos globales
│   ├── sitemap.ts    # Sitemap dinámico
│   └── robots.ts     # Robots.txt
├── components/       # Componentes React
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Portfolio.tsx
│   ├── CTASection.tsx
│   ├── Testimonials.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   └── WhatsAppButton.tsx
├── lib/              # Utilidades
│   ├── brevo.ts      # Integración Brevo
│   └── analytics.ts  # Google Analytics
└── public/           # Archivos estáticos
```

## 🔧 Configuración de APIs

### Brevo (Sendinblue)

1. Crea una cuenta en [Brevo](https://www.brevo.com/)
2. Obtén tu API Key desde la configuración
3. Crea una lista de contactos y copia el ID
4. Agrega las credenciales en `.env.local`

### Google Analytics 4

1. Crea una propiedad en [Google Analytics](https://analytics.google.com/)
2. Obtén tu Measurement ID (formato: G-XXXXXXXXX)
3. Agrega el ID en `.env.local`

### WhatsApp

1. Configura tu número de WhatsApp Business
2. Agrega el número en formato internacional (ej: 573001234567)
3. El número se usará para todos los enlaces de WhatsApp

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter
- `npm run deploy` - Despliega cambios a producción (ver abajo)
- `npm run setup-git` - Configura Git y GitHub (primera vez)

## ☁️ Deploy en la Nube (Sincronización Automática)

Para trabajar desde Cursor y que los cambios se reflejen automáticamente online:

### Opción Rápida: Vercel + GitHub (Recomendada)

1. **Instala Git**: https://git-scm.com/download/win
2. **Configura Git**: Ejecuta `npm run setup-git`
3. **Crea cuenta en GitHub**: https://github.com
4. **Crea cuenta en Vercel**: https://vercel.com (conecta con GitHub)
5. **Conecta tu repositorio** en Vercel
6. **¡Listo!** Cada vez que hagas `git push`, Vercel desplegará automáticamente

**Flujo de trabajo:**
```bash
# 1. Haces cambios en Cursor (como siempre)
# 2. Guardas los archivos
# 3. Ejecutas:
npm run deploy
# O manualmente:
git add .
git commit -m "Descripción de cambios"
git push
```

📖 **Guía completa**: Ver `SETUP_CLOUD.md` para instrucciones detalladas paso a paso.

## 🎯 Funcionalidades

- ✅ Navegación suave entre secciones
- ✅ Formularios con validación
- ✅ Integración con Brevo para captura de leads
- ✅ Botón flotante de WhatsApp
- ✅ Tracking de eventos con Google Analytics
- ✅ SEO optimizado
- ✅ Diseño responsive (mobile-first)
- ✅ Animaciones con Framer Motion
- ✅ Accesibilidad WCAG 2.1 AA

## 📄 Licencia

Este proyecto es propiedad de Zinergia Marketing Agency.

