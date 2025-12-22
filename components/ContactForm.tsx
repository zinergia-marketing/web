'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MdCheckCircle } from 'react-icons/md'

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional().refine(
    (val) => !val || /^(\+57|57)?[1-9]\d{9}$/.test(val.replace(/\s/g, '')),
    'Formato de teléfono inválido. Ejemplo: +57 300 1234567 o 3001234567'
  ),
  company: z.string().optional(),
  service: z.string().min(1, 'Selecciona un servicio'),
  budget: z.string().min(1, 'Selecciona un rango de presupuesto'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

type ContactFormData = z.infer<typeof contactSchema>

const services = [
  'Diseño Gráfico',
  'Edición de Video',
  'Página Web',
  'Manejo de Pautas',
  'Manejo de Redes Sociales',
  'Asesoría Personalizada',
  'Producción de Contenido (Video y Fotografía)',
  'Chatbots y Automatizaciones con IA',
  'Club Zinergia',
  'Plan Mensual (Básico/Estándar/Avanzado/Premium)',
]

const budgetRanges = [
  '$100k - $500k',
  '$500k - $1M',
  '$1M - $2M',
  '$2M - $4M',
  '$4M+',
]

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        reset()

        // Analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            event_category: 'Contact',
            event_label: 'Form Submission',
            value: 1,
          })
          window.gtag('event', 'form_submission', {
            event_category: 'Contact',
            event_label: data.service || 'Unknown',
            service: data.service,
            budget: data.budget,
          })
        }
      } else {
        throw new Error(result.error || 'Error al enviar el formulario')
      }
    } catch (error: any) {
      console.error('Error al enviar:', error)
      
      // Mensaje de error más amigable
      let errorMessage = 'Hubo un error al enviar tu mensaje. '
      
      if (error.message) {
        errorMessage = error.message + ' '
      }
      
      errorMessage += 'Por favor intenta de nuevo o contáctanos directamente por WhatsApp.'
      
      alert(errorMessage)
      
      // Analytics para errores
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
          description: error.message || 'Form submission error',
          fatal: false,
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-primary-neutral/20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-purple mb-3 sm:mb-4 px-4">
            Solicita tu Cotización Gratis
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 px-4">
            Te respondemos en menos de 15 minutos. El diagnóstico es sin costo y está pensado para negocios que venden en redes sociales.
          </p>
          
          {/* Value Bullets */}
          <div className="flex flex-col sm:flex-row lg:grid lg:grid-cols-3 items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-6 mb-6 sm:mb-8 px-4">
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <MdCheckCircle className="text-primary-coral text-lg sm:text-xl flex-shrink-0" />
              <span className="text-xs sm:text-sm md:text-base font-medium text-center">Entendemos tu negocio</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <MdCheckCircle className="text-primary-coral text-lg sm:text-xl flex-shrink-0" />
              <span className="text-xs sm:text-sm md:text-base font-medium text-center">Proyectamos resultados con datos</span>
            </div>
            <div className="flex items-start lg:items-center lg:justify-center gap-2 text-gray-700">
              <MdCheckCircle className="text-primary-coral text-lg sm:text-xl flex-shrink-0 mt-0.5 lg:mt-0" />
              <span className="text-xs sm:text-sm md:text-base font-medium text-center">
                <span className="block lg:inline">Medimos, comparamos y</span>
                <span className="block lg:inline">mejoramos mes a mes</span>
              </span>
            </div>
          </div>
        </motion.div>

        {!isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  placeholder="Juan Pérez"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  placeholder="juan@empresa.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono (opcional)
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  placeholder="+57 300 1234567 o 3001234567"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  Nos ayudará a contactarte más rápido si lo necesitas
                </p>
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Empresa (opcional)
                </label>
                <input
                  {...register('company')}
                  type="text"
                  id="company"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  placeholder="Mi Empresa S.A.S"
                />
              </div>

              {/* Service */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Servicio de interés *
                </label>
                <select
                  {...register('service')}
                  id="service"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                >
                  <option value="">Selecciona un servicio</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
                )}
              </div>

              {/* Budget */}
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  Rango de presupuesto *
                </label>
                <select
                  {...register('budget')}
                  id="budget"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                >
                  <option value="">Selecciona un rango</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
                {errors.budget && (
                  <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Cuéntanos sobre tu proyecto *
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent resize-none"
                  placeholder="Describe brevemente qué necesitas para tu negocio..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Enviar formulario de contacto"
                className="w-full px-8 py-4 bg-gradient-primary text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  'Enviar Solicitud'
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-12 text-center"
          >
            <div className="flex justify-center mb-6">
              <MdCheckCircle className="text-6xl text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-primary-purple mb-4">
              ¡Gracias por contactarnos!
            </h3>
            <p className="text-xl text-gray-600 mb-6">
              Hemos recibido tu solicitud y nos pondremos en contacto contigo en menos de 15 minutos.
            </p>
            <p className="text-gray-500">
              Mientras tanto, puedes contactarnos directamente por WhatsApp si tienes alguna pregunta urgente.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

