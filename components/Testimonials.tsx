'use client'

import { motion } from 'framer-motion'
import OptimizedImage from './OptimizedImage'

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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-primary-neutral/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="text-4xl text-primary-coral mb-4">&ldquo;</div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {testimonial.quote}
              </p>

              {/* Result Badge */}
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-semibold">
                  {testimonial.result}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gradient-primary">
                  <OptimizedImage
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    objectFit="cover"
                    sizes="64px"
                  />
                  {/* Fallback inicial */}
                  <div className="absolute inset-0 bg-gradient-primary flex items-center justify-center text-white text-xl font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-primary-purple">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

