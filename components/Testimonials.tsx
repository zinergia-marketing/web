'use client'

import { motion } from 'framer-motion'
import OptimizedImage from './OptimizedImage'
import Carousel from './Carousel'

const testimonials = [
  {
    id: 1,
    name: 'Joan Ensuncho',
    company: 'Tucolpagos',
    role: 'CEO',
    image: '/images/testimonials/ceo-tucolpagos.jpg',
    quote: 'Zinergia entendió muy bien lo que necesitábamos como fintech y transformó TuColpagos en una marca moderna y confiable. Gracias al nuevo branding y la página web, hoy comunicamos mejor nuestra propuesta a franquiciados y emprendedores en Colombia.',
    result: '200% crecimiento de engagement',
  },
  {
    id: 2,
    name: 'Ronald Morales',
    company: 'La Guaca Boutique',
    role: 'Cofundador',
    image: '/images/testimonials/fundador-laguaca.jpg',
    quote: 'Trabajar con Zinergia ha sido clave para escalar la presencia digital de La Guaca. Su estrategia de video marketing conecta de forma auténtica con nuestro público en redes sociales y ya vemos el resultado en mayor interacción y más ventas en la boutique',
    result: 'Aumentó 150% conversión',
  },
  {
    id: 3,
    name: 'Jairo Corena',
    company: 'Tecnomas Colombia',
    role: 'CEO',
    image: '/images/testimonials/ceo-tecnomas.jpg',
    quote: 'Tener una estrategia unificada para redes sociales y página web ha sido un punto de inflexión para Tecnomas. Hoy contamos con una presencia digital coherente que refuerza nuestra marca, genera más engagement y convierte mejor el tráfico en clientes reales',
    result: '200% crecimiento de engagement',
  },
]

interface TestimonialCardProps {
  testimonial: typeof testimonials[0]
  index?: number
  isMobile?: boolean
}

function TestimonialCard({ testimonial, index, isMobile = false }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index ?? 0) * 0.1 }}
      className={`bg-gradient-to-br from-white to-primary-neutral/20 rounded-2xl ${isMobile ? 'p-5' : 'p-8'} shadow-lg hover:shadow-xl transition-shadow duration-300 w-full`}
    >
      {/* Quote Icon */}
      <div className={`${isMobile ? 'text-3xl mb-3' : 'text-4xl mb-4'} text-primary-coral`}>&ldquo;</div>

      {/* Quote */}
      <p className={`text-gray-700 ${isMobile ? 'mb-4 text-base' : 'mb-6 text-lg'} leading-relaxed`}>
        {testimonial.quote}
      </p>

      {/* Result Badge */}
      <div className={isMobile ? 'mb-4' : 'mb-6'}>
        <div className="bg-gradient-to-r from-primary-purple/10 to-primary-coral/10 rounded-lg p-3 sm:p-4 border-l-4 border-primary-coral">
          <p className={`text-xs sm:text-sm text-gray-600 mb-1 ${isMobile ? '' : ''}`}>
            Resultado:
          </p>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-primary-coral`}>
            {testimonial.result}
          </p>
        </div>
      </div>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className={`${isMobile ? 'w-14 h-14' : 'w-16 h-16'} rounded-full overflow-hidden flex-shrink-0 bg-gradient-primary relative`}>
          <OptimizedImage
            src={testimonial.image}
            alt={testimonial.name}
            fill
            objectFit="cover"
            sizes={isMobile ? "56px" : "64px"}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className={`font-bold text-primary-purple ${isMobile ? 'text-sm' : ''} truncate`}>
            {testimonial.name}
          </h4>
          <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'} truncate`}>
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-purple mb-2 sm:mb-4 px-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Resultados reales de empresas que confiaron en nosotros
          </p>
        </motion.div>

        {/* Testimonials - Carousel on mobile, Grid on desktop */}
        <div className="md:hidden overflow-hidden">
          <div className="-mx-4 sm:-mx-6">
            <div className="px-4 sm:px-6">
              <Carousel autoPlay={true} autoPlayInterval={4500} showIndicators={true}>
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} isMobile={true} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

