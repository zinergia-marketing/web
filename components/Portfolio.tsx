'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import OptimizedImage from './OptimizedImage'
import Carousel from './Carousel'

const portfolioItems = [
  {
    id: 1,
    title: 'TuColpagos SAS',
    category: 'Branding + Página Web',
    description: 'Desarrollo de identidad visual completa y página web para ecosistema de servicios financieros. Creamos un branding moderno que refleja agilidad y seguridad, con presencia digital integrada en web e Instagram que posiciona a Tu Colpagos como corresponsal aliado para franquicias.',
    result: '200% crecimiento de engagement',
    image: '/images/portfolio/imagen-portafolio-tucolpagos.jpg',
    industry: 'Fintech',
    instagram: 'tucolpagos',
  },
  {
    id: 2,
    title: 'Boutique La Guaca',
    category: 'Edición de Video + Asesoría',
    description: 'Estrategia integral de video marketing y asesoría personalizada para boutique de moda. Desarrollamos contenido visual atractivo que muestra las tendencias de moda y conecta con el público objetivo, combinado con asesoría estratégica para maximizar el impacto en redes sociales y aumentar las conversiones.',
    result: 'Aumentó 150% conversión',
    image: '/images/portfolio/imagen-portafolio-laguaca.jpg',
    industry: 'Moda',
    instagram: 'boutiquelaguaca1',
  },
  {
    id: 3,
    title: 'Tecnomas Colombia',
    category: 'Redes + Página Web',
    description: 'Estrategia integral de gestión de redes sociales y desarrollo de página web para empresa de tecnología. Implementamos una presencia digital coherente que conecta la estrategia de redes sociales con una página web optimizada, creando un ecosistema digital que potencia el engagement y la conversión.',
    result: '200% crecimiento de engagement',
    image: '/images/portfolio/imagen-portafolio-tecnomas.jpg',
    industry: 'Tecnología',
    instagram: 'tecnomascolombia',
  },
  {
    id: 4,
    title: 'Terrasana SAS',
    category: 'Redes + Asesoría',
    description: 'Estrategia integral de gestión de redes sociales y asesoría personalizada para empresa de psicultura. Implementamos una presencia digital coherente que conecta la estrategia de redes sociales con asesoría estratégica especializada, creando un ecosistema digital que potencia el engagement y posiciona a Terrasana como referente en la industria acuícola.',
    result: '250% crecimiento de engagement',
    image: '/images/portfolio/imagen-portafolio-terrasana.jpg',
    industry: 'Psicultura',
    instagram: 'terrasanasas',
  },
  {
    id: 5,
    title: 'Kovak Boutique',
    category: 'Edición de Video + Diseño',
    description: 'Estrategia integral de video marketing y diseño gráfico para boutique de moda. Desarrollamos contenido visual dinámico que combina videos atractivos con diseño gráfico profesional, destacando las colecciones y tendencias de moda para generar un engagement significativo y una conexión sólida con la audiencia objetivo en redes sociales.',
    result: '250% crecimiento de engagement',
    image: '/images/portfolio/imagen-portafolio-kovak.jpg',
    industry: 'Moda',
    instagram: 'boutique_lujo.mtr',
  },
  {
    id: 6,
    title: 'Épica Joyería',
    category: 'Manejo de Pautas',
    description: 'Estrategia integral de manejo de pautas publicitarias para joyería. Desarrollamos campañas optimizadas con targeting preciso que conectan con el público objetivo interesado en joyería fina, maximizando el retorno de inversión publicitaria y generando conversiones significativas que se reflejan directamente en el aumento de ventas.',
    result: 'Aumentó 200% en ventas',
    image: '/images/portfolio/imagen-portafolio-epica.jpg',
    industry: 'Joyería',
    instagram: 'epicajoyeria_sas',
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
               item.category.includes('Redes') || item.category.includes('Gestión de Redes') ? (item.industry === 'Psicultura' ? '🐟' : '📱') :
               item.category.includes('Branding') ? '🎨' : 
               item.category.includes('Pautas') || item.category.includes('Manejo de Pautas') ? '📊' : '🎨'}
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

                {selectedItem.instagram && (
                  <div>
                    <a
                      href={`https://instagram.com/${selectedItem.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        if (typeof window !== 'undefined' && window.gtag) {
                          window.gtag('event', 'click', {
                            event_category: 'Portfolio',
                            event_label: `Instagram - ${selectedItem.title}`,
                          })
                        }
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Ver en Instagram
                      <span className="text-sm opacity-90">@{selectedItem.instagram.replace('@', '')}</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

