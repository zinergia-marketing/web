'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

// FAQ Component - Preguntas frecuentes sobre servicios y planes

const faqs = [
  {
    id: 1,
    question: '¿Cuánto tiempo toma ver resultados con los planes mensuales?',
    answer: 'Según nuestros casos de éxito, comenzamos a ver resultados medibles en 30 días. Los resultados pueden variar según el tipo de negocio, pero trabajamos con métricas claras: aumento en engagement, crecimiento de seguidores, más interacciones y, en muchos casos, incremento en conversiones y ventas. Incluimos reportes mensuales (o semanales en Plan Estándar y Avanzado) para monitorear el progreso.',
  },
  {
    id: 2,
    question: '¿Qué incluye cada plan mensual y cuál es la diferencia?',
    answer: 'Tenemos 4 planes: Básico (desde $1M) para quienes inician, Estándar (desde $1.5M) para quienes crecen, Avanzado (desde $2.5M) para quienes escalan, y Premium (desde $4.5M) que incluye todo lo anterior más chatbots con IA, Club Zinergia y producción de contenido. Cada plan varía en cantidad de entregables, redes sociales manejadas y nivel de asesoría. Revisa la sección "Planes Mensuales" para detalles completos.',
  },
  {
    id: 3,
    question: '¿Qué es el Club Zinergia y qué incluye?',
    answer: 'El Club Zinergia es una membresía premium incluida en el Plan Premium. Incluye 2-3 reuniones estratégicas semanales, capacitaciones para equipos de venta y marketing, asesoría estratégica fija y acompañamiento continuo, además de acceso a recursos exclusivos y comunidad. También está disponible como servicio individual desde $400.000 mensuales.',
  },
  {
    id: 4,
    question: '¿Cómo funciona la producción de contenido?',
    answer: 'La producción de contenido profesional (video y fotografía) está incluida en el Plan Premium. Incluye grabación de video publicitario, sesiones de fotografía para productos y servicios, y contenido optimizado para redes sociales. También está disponible como servicio individual desde $250.000. Los viáticos adicionales para producción fuera de Montería no están incluidos y deben ser costeados por el negocio.',
  },
  {
    id: 5,
    question: '¿Qué son los chatbots y automatizaciones con IA?',
    answer: 'Son chatbots inteligentes con IA para WhatsApp y página web, además de automatizaciones con Manychat en Instagram. Proporcionan respuestas inteligentes 24/7, se integran con CRM y sistemas de ventas, y mejoran la atención al cliente. Están incluidos en el Plan Premium y también disponibles como servicio individual desde $300.000.',
  },
  {
    id: 6,
    question: '¿Puedo cancelar mi plan mensual en cualquier momento?',
    answer: 'Sí, nuestros contratos son mensuales con renovación automática, pero puedes cancelar en cualquier momento sin penalización. Solo necesitas avisarnos con al menos 7 días de anticipación antes del próximo ciclo de facturación.',
  },
  {
    id: 7,
    question: '¿Cómo funciona el presupuesto de pautas publicitarias?',
    answer: 'El presupuesto de pautas publicitarias se cobra aparte del plan mensual. Nosotros gestionamos y optimizamos las campañas, pero el presupuesto publicitario (lo que inviertes en anuncios en Facebook, Instagram, TikTok, etc.) es independiente. Te ayudamos a definir el presupuesto ideal según tus objetivos y optimizamos para maximizar el ROAS (Retorno sobre Inversión Publicitaria).',
  },
  {
    id: 8,
    question: '¿Ofrecen servicios individuales además de los planes mensuales?',
    answer: 'Sí, ofrecemos servicios individuales: Diseño Gráfico (desde $50.000), Edición de Video (desde $80.000), Página Web (desde $800.000), Manejo de Pautas (desde $200.000), Manejo de Redes Sociales (desde $400.000), Asesoría Personalizada (desde $100.000), Producción de Contenido (desde $250.000), Chatbots y Automatizaciones con IA (desde $300.000) y Club Zinergia (desde $400.000). Puedes contratarlos de forma puntual sin necesidad de un plan mensual.',
  },
  {
    id: 9,
    question: '¿Cuántas rondas de revisión incluyen los entregables?',
    answer: 'Todos los planes incluyen 2 rondas de revisión por entregable. Esto significa que puedes solicitar ajustes hasta 2 veces por cada pieza de diseño o video antes de la aprobación final.',
  },
  {
    id: 10,
    question: '¿Cómo me contacto con ustedes y cuánto tardan en responder?',
    answer: 'Puedes contactarnos por WhatsApp (respondemos en menos de 15 minutos), a través del formulario de contacto en esta página, o por email a hola@zinergiamarketing.info. También puedes usar el botón flotante de WhatsApp. Trabajamos principalmente con negocios colombianos que venden en redes sociales, desde emprendedores hasta empresas establecidas.',
  },
]

interface FAQItemProps {
  faq: typeof faqs[0]
  isOpen: boolean
  onToggle: () => void
  index: number
}

function FAQItem({ faq, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-purple focus:ring-inset"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <h3 className="text-base sm:text-lg font-semibold text-primary-purple pr-4">
          {faq.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <svg
            className="w-6 h-6 text-primary-coral"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </button>
      <motion.div
        id={`faq-answer-${faq.id}`}
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-gray-700 leading-relaxed border-t border-gray-100">
          {faq.answer}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-primary-neutral/20 to-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-purple mb-2 sm:mb-4 px-4">
            Preguntas Frecuentes
          </h2>
          {/* Sección FAQ - Actualizada */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Resolvemos las dudas más comunes sobre nuestros servicios y planes
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-10 md:mt-12 text-center"
        >
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 px-4">
            ¿No encontraste la respuesta que buscabas?
          </p>
          <a
            href="#contact"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-primary text-white rounded-full font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Contáctanos directamente
          </a>
        </motion.div>
      </div>
    </section>
  )
}

