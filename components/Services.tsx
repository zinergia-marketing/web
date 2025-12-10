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
    price: 50000,
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
    price: 80000,
    color: 'from-primary-coral to-primary-purple',
  },
  {
    id: 3,
    title: 'Página Web',
    icon: '🚀',
    description: 'Sitios web que convierten visitantes en clientes',
    features: [
      'Responsive',
      'SEO optimizado',
      'Integración con CRM',
    ],
    price: 800000,
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
    price: 200000,
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
    price: 400000,
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
    price: 100000,
    color: 'from-primary-coral to-primary-purple',
  },
]

interface ServiceCardProps {
  service: typeof services[0]
  getWhatsAppUrl: (serviceTitle: string) => string
  index?: number
  isMobile?: boolean
}

function ServiceCard({ service, getWhatsAppUrl, index, isMobile = false }: ServiceCardProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index ?? 0) * 0.1 }}
      onMouseEnter={() => setHoveredId(service.id)}
      onMouseLeave={() => setHoveredId(null)}
      className="relative group w-full"
    >
      <div
        className={`bg-white rounded-2xl ${isMobile ? 'p-5' : 'p-8'} shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col ${
          hoveredId === service.id && !isMobile ? 'transform scale-105' : ''
        } ${isMobile ? 'text-center' : ''}`}
      >
        {/* Icon */}
        <div className={`${isMobile ? 'mb-4' : 'mb-6'} ${isMobile ? 'flex justify-center' : ''}`}>
          <div
            className={`${isMobile ? 'w-14 h-14 text-2xl' : 'w-16 h-16 text-3xl'} rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg ${isMobile ? 'mx-auto' : ''}`}
          >
            {service.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className={`${isMobile ? 'text-xl mb-2' : 'text-2xl mb-3'} font-bold text-primary-purple ${isMobile ? 'text-center' : ''}`}>
          {service.title}
        </h3>

        {/* Description */}
        <p className={`text-gray-600 ${isMobile ? 'mb-4 text-sm' : 'mb-6'} flex-grow leading-relaxed ${isMobile ? 'text-center' : ''}`}>
          {service.description}
        </p>

        {/* Features */}
        <ul className={`${isMobile ? 'space-y-1.5 mb-4' : 'space-y-2 mb-6'} ${isMobile ? 'items-center' : ''}`}>
          {service.features.map((feature, idx) => (
            <li key={idx} className={`flex ${isMobile ? 'justify-center items-center' : 'items-center'} text-gray-700 ${isMobile ? 'text-xs' : ''}`}>
              <span className="text-primary-coral mr-2 flex-shrink-0">✓</span>
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className={`${isMobile ? 'mb-4' : 'mb-6'} ${isMobile ? 'text-center' : ''}`}>
          <div className="text-gray-600 text-sm font-normal mb-1">
            desde
          </div>
          <div>
            <span className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-primary-purple`}>
              ${service.price.toLocaleString('es-CO')}
            </span>
            <span className="text-gray-600 text-sm ml-1 font-normal">pesos</span>
          </div>
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
          className={`w-full ${isMobile ? 'py-2.5 text-sm' : 'py-3'} rounded-full font-semibold text-white bg-gradient-to-r ${service.color} hover:shadow-lg transition-all duration-300 hover:scale-105 text-center block`}
        >
          Cotizar este servicio
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
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-primary-neutral/30"
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
            Servicios que transforman negocios
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Soluciones creativas + IA para escalar tu presencia digital
          </p>
        </motion.div>

        {/* Services - Carousel on mobile, Grid on desktop */}
        <div className="md:hidden overflow-x-hidden">
          <div className="-mx-4 sm:-mx-6">
            <div className="px-4 sm:px-6">
              <Carousel autoPlay={true} autoPlayInterval={5000} showIndicators={true}>
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} getWhatsAppUrl={getWhatsAppUrl} isMobile={true} />
                ))}
              </Carousel>
            </div>
          </div>
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

