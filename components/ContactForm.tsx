'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
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
  'Plan Mensual (Básico/Estándar/Avanzado)',
]

const budgetRanges = [
  '$100k - $500k',
  '$500k - $1M',
  '$1M - $2M',
  '$2M+',
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

      if (response.ok) {
        setIsSubmitted(true)
        reset()

        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            event_category: 'Contact',
            event_label: 'Form Submission',
          })
        }
      } else {
        throw new Error('Error al enviar el formulario')
      }
    } catch (error) {
      console.error('Error al enviar:', error)
      alert('Hubo un error al enviar tu mensaje. Por favor intenta de nuevo o contáctanos por WhatsApp.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-primary-neutral/20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary-purple mb-4">
            Solicita tu Cotización Gratis
          </h2>
          <p className="text-xl text-gray-600">
            Cuéntanos sobre tu proyecto y te responderemos en menos de 15 minutos
          </p>
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
                className="w-full px-8 py-4 bg-gradient-primary text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-12 text-center"
          >
            <div className="text-6xl mb-6">✅</div>
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

