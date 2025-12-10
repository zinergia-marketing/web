'use client'

import { motion } from 'framer-motion'

export default function Hero() {

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573243463101'
  const whatsappMessage = encodeURIComponent('Hola, me interesa conocer los servicios de Zinergia')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-primary opacity-95">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-coral rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary-purple rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-8 lg:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block"
          >
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              ✨ Más de 5 años impulsando PyMEs
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            Impulsa tu Negocio
            <br />
            <span className="bg-gradient-to-r from-primary-coral to-white bg-clip-text text-transparent whitespace-nowrap">
              con&nbsp;Creatividad&nbsp;+&nbsp;IA
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl text-white/90 font-medium"
          >
            Diseño | Video | Web | Estrategia
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto"
          >
            para PyMEs colombianas que venden en redes sociales
            <br />
            Resultados medibles en 30 días.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
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
              className="px-8 py-4 bg-white text-primary-purple rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              Solicitar Cotización Gratis
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-primary-purple transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center"
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'click', {
                    event_category: 'CTA',
                    event_label: 'Contactar WhatsApp Hero',
                  })
                }
              }}
            >
              Contactar por WhatsApp
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="pt-4 sm:pt-6 lg:pt-10 pb-0 lg:pb-4 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Procesos optimizados con IA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Resultados en 30 días</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Precios justos, calidad premium</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}

