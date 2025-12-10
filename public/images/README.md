# Guía de Imágenes - Zinergia Web

## 📁 Estructura de Carpetas

```
public/
└── images/
    ├── portfolio/          # Imágenes de proyectos del portfolio
    ├── testimonials/      # Fotos de clientes para testimonios
    ├── services/          # Imágenes para servicios (opcional)
    └── general/          # Imágenes generales (logos, banners, etc.)
```

## 🖼️ Cómo Agregar Imágenes

### 1. Imágenes del Portfolio

1. Coloca tus imágenes en `public/images/portfolio/`
2. Nombra los archivos de forma descriptiva (ej: `tucolpagos.jpg`, `ecommerce-store.jpg`)
3. Actualiza la ruta en `components/Portfolio.tsx`:

```typescript
{
  id: 1,
  title: 'Tucolpagos',
  image: '/images/portfolio/tucolpagos.jpg', // ← Actualiza esta ruta
  // ...
}
```

### 2. Fotos de Testimonios

1. Coloca las fotos en `public/images/testimonials/`
2. Nombra los archivos con el nombre del cliente (ej: `maria-gonzalez.jpg`)
3. Actualiza la ruta en `components/Testimonials.tsx`:

```typescript
{
  id: 1,
  name: 'María González',
  image: '/images/testimonials/maria-gonzalez.jpg', // ← Actualiza esta ruta
  // ...
}
```

## 📐 Tamaños Recomendados

### Portfolio
- **Tamaño ideal**: 1200x800px (ratio 3:2)
- **Formato**: JPG (calidad 85%) o WebP
- **Peso máximo**: 300KB por imagen
- **Aspecto**: 16:9 o 3:2

### Testimonials (Fotos de perfil)
- **Tamaño ideal**: 400x400px (cuadrado)
- **Formato**: JPG o WebP
- **Peso máximo**: 100KB por imagen
- **Aspecto**: 1:1 (cuadrado)

## 🚀 Optimización de Imágenes

### Antes de Subir

1. **Comprime las imágenes** usando herramientas como:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
   - [ImageOptim](https://imageoptim.com/)

2. **Convierte a WebP** (opcional pero recomendado):
   - WebP reduce el tamaño en ~30% manteniendo calidad
   - Next.js convierte automáticamente a WebP cuando es posible

3. **Redimensiona** antes de subir:
   - Portfolio: máximo 1920px de ancho
   - Testimonials: máximo 400px

### Herramientas Recomendadas

- **Online**: [Squoosh](https://squoosh.app/) - Compresión y conversión
- **Desktop**: [ImageOptim](https://imageoptim.com/) - Mac
- **Photoshop**: Exportar para Web (JPG calidad 85%)

## 💡 Buenas Prácticas

1. **Nombres descriptivos**: Usa nombres claros como `tucolpagos-hero.jpg` en lugar de `IMG_1234.jpg`

2. **Consistencia**: Mantén el mismo formato para imágenes similares (todas JPG o todas WebP)

3. **Alt text**: Las imágenes ya tienen alt text automático, pero puedes personalizarlo en los componentes

4. **Lazy loading**: Las imágenes se cargan automáticamente cuando son visibles (lazy loading)

5. **Prioridad**: Para imágenes "above the fold" (visibles al cargar), agrega `priority={true}` en el componente

## 🔧 Uso del Componente OptimizedImage

El componente `OptimizedImage` maneja automáticamente:
- ✅ Conversión a WebP/AVIF
- ✅ Lazy loading
- ✅ Responsive images
- ✅ Placeholder mientras carga
- ✅ Fallback si la imagen no existe

### Ejemplo Básico

```tsx
import OptimizedImage from '@/components/OptimizedImage'

<OptimizedImage
  src="/images/portfolio/proyecto-1.jpg"
  alt="Descripción del proyecto"
  width={600}
  height={400}
/>
```

### Ejemplo con Fill (para contenedores)

```tsx
<div className="relative w-full h-64">
  <OptimizedImage
    src="/images/portfolio/proyecto-1.jpg"
    alt="Descripción"
    fill
    objectFit="cover"
  />
</div>
```

## ⚠️ Notas Importantes

- Las imágenes deben estar en la carpeta `public/` para ser accesibles
- Las rutas siempre empiezan con `/` (ej: `/images/portfolio/...`)
- Si una imagen no existe, se mostrará un placeholder con gradiente
- Las imágenes se optimizan automáticamente en build time

## 🐛 Troubleshooting

**Problema**: La imagen no se muestra
- Verifica que la ruta sea correcta (empieza con `/images/...`)
- Verifica que el archivo exista en `public/images/...`
- Revisa la consola del navegador para errores

**Problema**: La imagen es muy pesada
- Comprime la imagen antes de subirla
- Convierte a WebP
- Reduce las dimensiones si es necesario

**Problema**: La imagen se ve distorsionada
- Verifica el aspect ratio (16:9 para portfolio, 1:1 para testimonials)
- Ajusta `objectFit` en el componente si es necesario


