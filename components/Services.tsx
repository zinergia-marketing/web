'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Carousel from './Carousel'

const services = [
  {
    id: 1,
    title: 'Diseño Gráfico',
    icon: '🎨',
    description: 'Posts, carruseles, flyers profesionales para tus redes',
    features: [
      'Diseño trendy',
      '2 rondas de revisión',
      'Entrega 2-3 días',
    ],
    price: 'Desde $50k',
    color: 'from-primary-purple to-primary-coral',
  },
  {
    id: 2,
    title: 'Edición de Video',
    icon: '🎬',
    description: 'Reels, TikToks, videos publicitarios que impactan',
    features: [
      'Edición profesional',
      'Efectos trendy',
      'Optimizado por plataforma',
    ],
    price: 'Desde $80k',
    color: 'from-primary-coral to-primary-purple',
  },
  {
    id: 3,
    title: 'Landing Pages',
    icon: '🚀',
    description: 'Sitios web que convierten visitantes en clientes',
    features: [
      'Responsive',
      'SEO optimizado',
      'Integración con CRM',
    ],
    price: 'Desde $800k',
    color: 'from-primary-purple to-primary-coral',
  },
  {
    id: 4,
    title: 'Manejo de Pautas',
    icon: '📊',
    description: 'Gestión profesional de campañas publicitarias en redes sociales',
    features: [
      'Optimización continua',
      'ROAS mejorado',
      'Reportes detallados',
    ],
    price: 'Desde $200k',
    color: 'from-primary-coral to-primary-purple',
  },
  {
    id: 5,
    title: 'Manejo de Redes Sociales',
    icon: '📱',
    description: 'Gestión completa de tus redes sociales con contenido estratégico',
    features: [
      'Contenido diario',
      'Community management',
      'Estrategia personalizada',
    ],
    price: 'Desde $300k',
    color: 'from-primary-purple to-primary-coral',
  },
  {
    id: 6,
    title: 'Asesoría Personalizada',
    icon: '💡',
    description: 'Consultoría estratégica para hacer crecer tu negocio digital',
    features: [
      'Análisis personalizado',
      'Plan de acción',
      'Seguimiento continuo',
    ],
    price: 'Desde $150k',
    color: 'from-primary-coral to-primary-purple',
  },
]

interface ServiceCardProps {
  service: typeof services[0]
  getWhatsAppUrl: (serviceTitle: string) => string
  index?: number
}

function ServiceCard({ service, getWhatsAppUrl, index }: ServiceCardProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index ?? 0) * 0.1 }}
      onMouseEnter={() => setHoveredId(service.id)}
      onMouseLeave={() => setHoveredId(null)}
      className="relative group"
    >
      <div
        className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col ${
          hoveredId === service.id ? 'transform scale-105' : ''
        }`}
      >
        {/* Icon */}
        <div className="mb-6">
          <div
            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl shadow-lg`}
          >
            {service.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-primary-purple mb-3">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-6 flex-grow">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-gray-700">
              <span className="text-primary-coral mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="mb-6">
          <span className="text-3xl font-bold text-primary-purple">
            {service.price}
          </span>
        </div>

        {/* CTA */}
        <a
          href={getWhatsAppUrl(service.title)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'click', {
                event_category: 'Service',
                event_label: service.title,
              })
            }
          }}
          className={`w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r ${service.color} hover:shadow-lg transition-all duration-300 hover:scale-105 text-center block`}
        >
          Solicitar este servicio
        </a>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573243463101'
  
  const getWhatsAppUrl = (serviceTitle: string) => {
    const message = encodeURIComponent(`Hola, me interesa solicitar información sobre el servicio de ${serviceTitle}. Me gustaría conocer más detalles y recibir una cotización.`)
    return `https://wa.me/${whatsappNumber}?text=${message}`
  }

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-white to-primary-neutral/30"
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
            Servicios que transforman negocios
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Soluciones creativas + IA para escalar tu presencia digital
          </p>
        </motion.div>

        {/* Services - Carousel on mobile, Grid on desktop */}
        <div className="md:hidden">
          <Carousel autoPlay={true} autoPlayInterval={5000} showIndicators={true}>
            {services.map((service) => (
              <div key={service.id} className="px-2">
                <ServiceCard service={service} getWhatsAppUrl={getWhatsAppUrl} />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              getWhatsAppUrl={getWhatsAppUrl}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

