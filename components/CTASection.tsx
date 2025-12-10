'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const newsletterSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

export default function CTASection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          type: 'newsletter',
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        reset()
        
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            event_category: 'Newsletter',
            event_label: 'Análisis Gratis',
          })
        }
      }
    } catch (error) {
      console.error('Error al enviar:', error)
      alert('Hubo un error. Por favor intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            ¿Tu negocio está listo para crecer exponencialmente?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Solicita una consultoría gratis y recibe un análisis personalizado de tu competencia
          </p>

          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-md mx-auto space-y-4"
            >
              <div>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
                {errors.name && (
                  <p className="text-white/80 text-sm mt-1 text-left px-6">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
                {errors.email && (
                  <p className="text-white/80 text-sm mt-1 text-left px-6">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-white text-primary-purple rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Solicitar consultoría gratis'}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto"
            >
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                ¡Revisa tu email!
              </h3>
              <p className="text-white/90">
                Te hemos enviado tu análisis gratuito. Revisa tu bandeja de entrada.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

