'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMobileMenuOpen(false)
    }
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573243463101'
  const whatsappMessage = encodeURIComponent('Hola, me interesa conocer los servicios de Zinergia')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            role="button"
            tabIndex={0}
            aria-label="Ir al inicio - Zinergia Marketing"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                scrollToSection('hero')
              }
            }}
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-3xl">Z</span>
            </div>
            <span className={`text-xl font-bold transition-colors duration-300 uppercase ${
              isScrolled ? 'text-primary-purple' : 'text-white'
            }`}>
              ZINERGIA
            </span>
            <span className={`text-sm hidden sm:inline transition-colors duration-300 ${
              isScrolled ? 'text-gray-600' : 'text-white/80'
            }`}>
              | Marketing Digital
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('services')}
              aria-label="Ir a la sección de Servicios"
              className={`transition-colors duration-300 font-medium ${
                isScrolled
                  ? 'text-gray-700 hover:text-primary-purple'
                  : 'text-white hover:text-primary-coral'
              }`}
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('plans')}
              aria-label="Ir a la sección de Planes Mensuales"
              className={`transition-colors duration-300 font-medium ${
                isScrolled
                  ? 'text-gray-700 hover:text-primary-purple'
                  : 'text-white hover:text-primary-coral'
              }`}
            >
              Planes Mensuales
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              aria-label="Ir a la sección de Portafolio"
              className={`transition-colors duration-300 font-medium ${
                isScrolled
                  ? 'text-gray-700 hover:text-primary-purple'
                  : 'text-white hover:text-primary-coral'
              }`}
            >
              Portafolio
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              aria-label="Ir a la sección de Testimonios"
              className={`transition-colors duration-300 font-medium ${
                isScrolled
                  ? 'text-gray-700 hover:text-primary-purple'
                  : 'text-white hover:text-primary-coral'
              }`}
            >
              Testimonios
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              aria-label="Ir a la sección de Preguntas Frecuentes"
              className={`transition-colors duration-300 font-medium ${
                isScrolled
                  ? 'text-gray-700 hover:text-primary-purple'
                  : 'text-white hover:text-primary-coral'
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              aria-label="Ir a la sección de Contacto"
              className={`transition-colors duration-300 font-medium ${
                isScrolled
                  ? 'text-gray-700 hover:text-primary-purple'
                  : 'text-white hover:text-primary-coral'
              }`}
            >
              Contacto
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gradient-primary text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'click', {
                    event_category: 'CTA',
                    event_label: 'Cotizar Ahora Nav',
                  })
                }
              }}
            >
              Cotizar Ahora
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              <button
                onClick={() => scrollToSection('services')}
                aria-label="Ir a la sección de Servicios"
                className="block w-full text-left text-gray-700 hover:text-primary-purple transition-colors font-medium py-2"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection('plans')}
                aria-label="Ir a la sección de Planes Mensuales"
                className="block w-full text-left text-gray-700 hover:text-primary-purple transition-colors font-medium py-2"
              >
                Planes Mensuales
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                aria-label="Ir a la sección de Portafolio"
                className="block w-full text-left text-gray-700 hover:text-primary-purple transition-colors font-medium py-2"
              >
                Portafolio
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                aria-label="Ir a la sección de Testimonios"
                className="block w-full text-left text-gray-700 hover:text-primary-purple transition-colors font-medium py-2"
              >
                Testimonios
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                aria-label="Ir a la sección de Preguntas Frecuentes"
                className="block w-full text-left text-gray-700 hover:text-primary-purple transition-colors font-medium py-2"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                aria-label="Ir a la sección de Contacto"
                className="block w-full text-left text-gray-700 hover:text-primary-purple transition-colors font-medium py-2"
              >
                Contacto
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-3 bg-gradient-primary text-white rounded-full font-semibold text-center hover:shadow-lg transition-all duration-300"
              >
                Cotizar Ahora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

