'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { MdAutoAwesome, MdCheckCircle } from 'react-icons/md'

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573243463101'
  const whatsappMessage = encodeURIComponent('Hola, me interesa agendar una llamada de diagnóstico para mi negocio')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-primary opacity-95">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-coral rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={prefersReducedMotion ? {} : {
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary-purple rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={prefersReducedMotion ? {} : {
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-6 sm:pb-8 lg:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 sm:space-y-6 md:space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block"
          >
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium flex items-center gap-2 justify-center">
              <MdAutoAwesome className="text-base" />
              Más de 5 años impulsando negocios
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight px-2"
          >
            Atrae y vende más con una estrategia digital
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary-coral to-white bg-clip-text text-transparent">
              que impacte las ventas de tu negocio
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium max-w-4xl mx-auto px-4"
          >
            Para negocios colombianos que venden en redes sociales y anuncios
            <br className="hidden sm:block" />
            <span className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80">
              Resultados medibles en 30 días
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 px-4"
          >
            <button
              onClick={() => {
                scrollToContact()
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'click', {
                    event_category: 'CTA',
                    event_label: 'Solicitar Cotización Hero',
                  })
                }
              }}
              aria-label="Solicitar cotización gratis - Ir al formulario de contacto"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-purple rounded-full font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              Solicitar Cotización Gratis
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agendar llamada de diagnóstico - Abrir WhatsApp"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-base sm:text-lg hover:bg-white hover:text-primary-purple transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center"
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'click', {
                    event_category: 'CTA',
                    event_label: 'Agendar Llamada Diagnóstico Hero',
                  })
                }
              }}
            >
              Agendar Llamada de Diagnóstico
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="pt-3 sm:pt-4 md:pt-6 lg:pt-8 pb-0 lg:pb-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-white/80 text-xs sm:text-sm px-4"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <MdCheckCircle className="text-xl sm:text-2xl flex-shrink-0" />
              <span>Procesos optimizados con IA</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <MdCheckCircle className="text-xl sm:text-2xl flex-shrink-0" />
              <span>Resultados en 30 días</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <MdCheckCircle className="text-xl sm:text-2xl flex-shrink-0" />
              <span>Precios justos, calidad premium</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}

