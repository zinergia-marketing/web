'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Carousel from './Carousel'
import { MdVideocam, MdSmartToy, MdGroups, MdCheckCircle } from 'react-icons/md'

const advancedServices = [
  {
    id: 1,
    title: 'Producción de Contenido',
    icon: MdVideocam,
    description: 'Grabación profesional de video y fotografía para anuncios ganadores y contenido de alto valor que convierte',
    features: [
      'Producción de video publicitario profesional',
      'Sesiones de fotografía para productos y servicios',
      'Contenido optimizado para redes sociales y anuncios',
      'Equipos profesionales y edición de alta calidad',
    ],
    price: 250000,
    color: 'from-primary-purple to-primary-coral',
  },
  {
    id: 2,
    title: 'Chatbots y Automatizaciones con IA',
    icon: MdSmartToy,
    description: 'Chatbots inteligentes y agentes con IA para WhatsApp y página web, automatizaciones con Manychat en Instagram',
    features: [
      'Chatbots con IA para WhatsApp y página web',
      'Automatizaciones con Manychat en Instagram',
      'Respuestas inteligentes 24/7',
      'Integración con CRM y sistemas de ventas',
    ],
    price: 300000,
    color: 'from-primary-coral to-primary-purple',
  },
  {
    id: 3,
    title: 'Club Zinergia',
    icon: MdGroups,
    description: 'Suscripción mensual con asesoría estratégica fija, capacitaciones de equipos y acompañamiento continuo para escalar tu negocio',
    features: [
      '2-3 reuniones estratégicas semanales',
      'Capacitaciones para equipos de venta y marketing',
      'Asesoría fija y acompañamiento continuo',
      'Acceso a recursos exclusivos y comunidad',
    ],
    price: 400000,
    color: 'from-primary-purple to-primary-coral',
  },
]

interface ServiceCardProps {
  service: typeof advancedServices[0]
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
            className={`${isMobile ? 'w-14 h-14' : 'w-16 h-16'} rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg ${isMobile ? 'mx-auto' : ''}`}
          >
            <service.icon className={`${isMobile ? 'text-3xl' : 'text-4xl'} text-white`} />
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
              <MdCheckCircle className="text-primary-coral mr-2 flex-shrink-0 text-lg" />
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
                event_category: 'AdvancedService',
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

export default function AdvancedServices() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573243463101'
  
  const getWhatsAppUrl = (serviceTitle: string) => {
    const message = encodeURIComponent(`Hola, me interesa solicitar información sobre el servicio de ${serviceTitle}. Me gustaría conocer más detalles y recibir una cotización.`)
    return `https://wa.me/${whatsappNumber}?text=${message}`
  }

  return (
    <section
      id="advanced-services"
      className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-primary-neutral/30 to-white"
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
            Servicios para escalar empresas
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Soluciones avanzadas con IA y automatizaciones para llevar tu negocio al siguiente nivel
          </p>
        </motion.div>

        {/* Services - Carousel on mobile, Grid on desktop */}
        <div className="md:hidden overflow-hidden">
          <div className="-mx-4 sm:-mx-6">
            <div className="px-4 sm:px-6">
              <Carousel autoPlay={true} autoPlayInterval={4500} showIndicators={true}>
                {advancedServices.map((service) => (
                  <ServiceCard key={service.id} service={service} getWhatsAppUrl={getWhatsAppUrl} isMobile={true} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {advancedServices.map((service, index) => (
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

