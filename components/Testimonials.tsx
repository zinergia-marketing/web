'use client'

import { motion } from 'framer-motion'
import OptimizedImage from './OptimizedImage'
import Carousel from './Carousel'

const testimonials = [
  {
    id: 1,
    name: 'María González',
    company: 'Tucolpagos',
    role: 'CEO',
    image: '/images/testimonials/maria-gonzalez.jpg', // Reemplaza con foto del cliente
    quote: 'Zinergia transformó nuestra presencia digital. En 30 días vimos un aumento del 150% en conversiones. Su equipo es profesional y los resultados hablan por sí solos.',
    result: '150% aumento en conversiones',
  },
  {
    id: 2,
    name: 'Carlos Ramírez',
    company: 'Ecommerce Store',
    role: 'Fundador',
    image: '/images/testimonials/carlos-ramirez.jpg', // Reemplaza con foto del cliente
    quote: 'El diseño de nuestra landing page superó todas las expectativas. Pasamos de 50 leads mensuales a más de 150. La inversión se pagó sola en el primer mes.',
    result: '3x leads mensuales',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    company: 'Startup Tech',
    role: 'CMO',
    image: '/images/testimonials/ana-martinez.jpg', // Reemplaza con foto del cliente
    quote: 'La estrategia de redes sociales que desarrollaron nos ayudó a construir una comunidad real. El engagement creció 200% y ahora tenemos una marca reconocida.',
    result: '200% crecimiento en engagement',
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
        <span className={`inline-block px-4 py-2 bg-gradient-primary text-white rounded-full ${isMobile ? 'text-xs' : 'text-sm'} font-semibold`}>
          {testimonial.result}
        </span>
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
          {/* Fallback inicial */}
          <div className="absolute inset-0 bg-gradient-primary flex items-center justify-center text-white font-bold" style={{ fontSize: isMobile ? '1.125rem' : '1.25rem' }}>
            {testimonial.name.charAt(0)}
          </div>
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
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary-purple mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Resultados reales de empresas que confiaron en nosotros
          </p>
        </motion.div>

        {/* Testimonials - Carousel on mobile, Grid on desktop */}
        <div className="md:hidden -mx-4 sm:-mx-6">
          <div className="px-4 sm:px-6">
            <Carousel autoPlay={true} autoPlayInterval={5000} showIndicators={true}>
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} isMobile={true} />
              ))}
            </Carousel>
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

