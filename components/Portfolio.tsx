'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import OptimizedImage from './OptimizedImage'
import Carousel from './Carousel'

const portfolioItems = [
  {
    id: 1,
    title: 'Tucolpagos',
    category: 'Branding + Página Web',
    description: 'Desarrollo de identidad visual completa y página web para ecosistema de servicios financieros. Creamos un branding moderno que refleja agilidad y seguridad, con presencia digital integrada en web e Instagram que posiciona a Tu Colpagos como corresponsal aliado para franquicias.',
    result: '200% crecimiento de engagement',
    image: '/images/portfolio/imagen-portafolio-tucolpagos.jpg',
    industry: 'Fintech',
  },
  {
    id: 2,
    title: 'Boutique La Guaca',
    category: 'Edición de Video + Asesoría',
    description: 'Estrategia integral de video marketing y asesoría personalizada para boutique de moda. Desarrollamos contenido visual atractivo que muestra las tendencias de moda y conecta con el público objetivo, combinado con asesoría estratégica para maximizar el impacto en redes sociales y aumentar las conversiones.',
    result: 'Aumentó 150% conversión',
    image: '/images/portfolio/imagen-portafolio-laguaca.jpg',
    industry: 'Moda',
  },
  {
    id: 3,
    title: 'Tecnomas Colombia',
    category: 'Redes + Página Web',
    description: 'Estrategia integral de gestión de redes sociales y desarrollo de página web para empresa de tecnología. Implementamos una presencia digital coherente que conecta la estrategia de redes sociales con una página web optimizada, creando un ecosistema digital que potencia el engagement y la conversión.',
    result: '200% crecimiento de engagement',
    image: '/images/portfolio/imagen-portafolio-tecnomas.jpg',
    industry: 'Tecnología',
  },
  {
    id: 4,
    title: 'Invicta Store',
    category: 'Edición de Video',
    description: 'Estrategia de video marketing para tienda de moda. Desarrollamos contenido visual atractivo que muestra las tendencias de moda y productos de manera dinámica, creando videos que conectan con el público objetivo y generan conversiones significativas en redes sociales.',
    result: 'Aumentó 200% conversión',
    image: '/images/portfolio/imagen-portafolio-invictastore.jpg',
    industry: 'Moda',
  },
  {
    id: 5,
    title: 'Kovak Boutique',
    category: 'Edición de Video + Diseño',
    description: 'Estrategia integral de video marketing y diseño gráfico para boutique de moda. Desarrollamos contenido visual dinámico que combina videos atractivos con diseño gráfico profesional, destacando las colecciones y tendencias de moda para generar un engagement significativo y una conexión sólida con la audiencia objetivo en redes sociales.',
    result: '250% crecimiento de engagement',
    image: '/images/portfolio/imagen-portafolio-kovak.jpg',
    industry: 'Moda',
  },
  {
    id: 6,
    title: 'SaaS Platform',
    category: 'Landing + Pautas',
    description: 'Landing page optimizada con campañas',
    result: 'ROAS 4:1 en primeros 30 días',
    image: '/images/portfolio/saas-platform.jpg', // Reemplaza con tu imagen
    industry: 'SaaS',
  },
]

interface PortfolioCardProps {
  item: typeof portfolioItems[0]
  onSelect: () => void
  index?: number
  isMobile?: boolean
}

function PortfolioCard({ item, onSelect, index, isMobile = false }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index ?? 0) * 0.1 }}
      whileHover={!isMobile ? { scale: 1.02 } : {}}
      className="relative group cursor-pointer overflow-hidden rounded-xl w-full"
      onClick={onSelect}
    >
      {/* Image */}
      <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary-purple to-primary-coral">
        <OptimizedImage
          src={item.image}
          alt={`${item.title} - ${item.category}`}
          fill
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        {/* Fallback si no hay imagen */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="text-white text-center p-4">
            <div className="text-4xl mb-2">
              {item.category === 'Video Editing' || item.category.includes('Edición de Video') ? '📹' : 
               item.category === 'Landing Page' ? '🚀' : 
               item.category.includes('Redes') || item.category.includes('Gestión de Redes') ? '📱' :
               item.category.includes('Branding') ? '🎨' : '🎨'}
            </div>
            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
            <p className="text-sm opacity-90">{item.category}</p>
          </div>
        </div>
      </div>

      {/* Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-purple/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <div className="text-white">
          <p className="text-sm font-medium mb-2">{item.industry}</p>
          <p className="text-lg font-bold">{item.result}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null)

  return (
    <section
      id="portfolio"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-primary-neutral/30 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary-purple mb-4">
            Mira cómo hemos escalado marcas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Casos de éxito que demuestran resultados reales
          </p>
        </motion.div>

        {/* Portfolio - Carousel on mobile, Grid on desktop */}
        <div className="md:hidden overflow-x-hidden">
          <div className="-mx-4 sm:-mx-6">
            <div className="px-4 sm:px-6">
              <Carousel autoPlay={true} autoPlayInterval={5000} showIndicators={true}>
                {portfolioItems.map((item) => (
                  <PortfolioCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} isMobile={true} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <PortfolioCard
              key={item.id}
              item={item}
              onSelect={() => setSelectedItem(item)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90dvh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-primary-purple mb-2">
                    {selectedItem.title}
                  </h3>
                  <p className="text-gray-600">{selectedItem.category} • {selectedItem.industry}</p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="aspect-video relative bg-gradient-to-br from-primary-purple to-primary-coral rounded-xl mb-6 overflow-hidden">
                <OptimizedImage
                  src={selectedItem.image}
                  alt={`${selectedItem.title} - ${selectedItem.category}`}
                  fill
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-lg text-primary-purple mb-2">
                    Descripción del Proyecto
                  </h4>
                  <p className="text-gray-700">{selectedItem.description}</p>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-primary-purple mb-2">
                    Resultado
                  </h4>
                  <p className="text-2xl font-bold text-primary-coral">
                    {selectedItem.result}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

