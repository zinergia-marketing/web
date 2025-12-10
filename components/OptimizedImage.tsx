'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  sizes?: string
}

/**
 * Componente optimizado para imágenes usando Next.js Image
 * 
 * Uso:
 * <OptimizedImage 
 *   src="/images/portfolio/proyecto-1.jpg" 
 *   alt="Descripción"
 *   width={600}
 *   height={400}
 * />
 * 
 * Para imágenes de fondo que llenan el contenedor:
 * <div className="relative w-full h-64">
 *   <OptimizedImage 
 *     src="/images/portfolio/proyecto-1.jpg" 
 *     alt="Descripción"
 *     fill
 *     objectFit="cover"
 *   />
 * </div>
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  objectFit = 'cover',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Si hay error, mostrar placeholder
  if (hasError) {
    return (
      <div 
        className={`bg-gradient-to-br from-primary-purple to-primary-coral flex items-center justify-center ${className}`}
        style={fill ? {} : { width, height }}
      >
        <span className="text-white text-sm">Imagen no disponible</span>
      </div>
    )
  }

  const imageProps = fill
    ? {
        fill: true,
        className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
        style: { objectFit },
        sizes,
      }
    : {
        width,
        height,
        className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
      }

  return (
    <>
      {isLoading && (
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-primary-purple/20 to-primary-coral/20 animate-pulse ${className}`}
          style={fill ? {} : { width, height }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        {...imageProps}
        priority={priority}
        quality={85}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
      />
    </>
  )
}

