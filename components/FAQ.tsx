'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const faqs = [
  {
    id: 1,
    question: '¿Cuánto tiempo toma ver resultados con los planes mensuales?',
    answer: 'Según nuestros casos de éxito, comenzamos a ver resultados medibles en 30 días. Sin embargo, los resultados pueden variar según el tipo de negocio y la industria. En nuestros planes incluimos reportes mensuales (o semanales en Plan Estándar y Avanzado) para que puedas monitorear el progreso.',
  },
  {
    id: 2,
    question: '¿Puedo cancelar mi plan mensual en cualquier momento?',
    answer: 'Sí, nuestros contratos son mensuales con renovación automática, pero puedes cancelar en cualquier momento sin penalización. Solo necesitas avisarnos con al menos 7 días de anticipación antes del próximo ciclo de facturación.',
  },
  {
    id: 3,
    question: '¿Qué incluye exactamente cada plan mensual?',
    answer: 'Cada plan incluye diseño gráfico, edición de video, manejo de redes sociales, community management, campañas de pautas publicitarias (el presupuesto de pauta se cobra aparte), asesoría estratégica y reportes de métricas. La cantidad de entregables y el nivel de servicio varía según el plan. Revisa la sección de "Planes Mensuales" para ver los detalles completos de cada plan.',
  },
  {
    id: 4,
    question: '¿Cómo funciona el presupuesto de pautas publicitarias?',
    answer: 'El presupuesto de pautas publicitarias se cobra aparte del plan mensual. Nosotros gestionamos y optimizamos las campañas, pero el presupuesto publicitario (lo que inviertes en anuncios en Facebook, Instagram, TikTok, etc.) es independiente. Te ayudamos a definir el presupuesto ideal según tus objetivos y te mostramos cómo optimizarlo para maximizar el ROAS (Retorno sobre Inversión Publicitaria).',
  },
  {
    id: 5,
    question: '¿Trabajan con empresas de todos los tamaños?',
    answer: 'Sí, trabajamos principalmente con PyMEs colombianas que venden en redes sociales. Desde emprendedores que inician su presencia digital hasta empresas establecidas que buscan escalar. Nuestros planes están diseñados para adaptarse a diferentes etapas de crecimiento.',
  },
  {
    id: 6,
    question: '¿Cuántas rondas de revisión incluyen los entregables?',
    answer: 'Todos los planes incluyen 2 rondas de revisión por entregable. Esto significa que puedes solicitar ajustes hasta 2 veces por cada pieza de diseño o video antes de la aprobación final.',
  },
  {
    id: 7,
    question: '¿Qué redes sociales manejan en cada plan?',
    answer: 'El Plan Básico incluye manejo de 2 redes sociales (Instagram y Facebook). El Plan Estándar incluye 3 redes (Instagram, Facebook y TikTok). El Plan Avanzado incluye manejo completo de hasta 4 redes sociales según tus necesidades.',
  },
  {
    id: 8,
    question: '¿Ofrecen servicios individuales además de los planes mensuales?',
    answer: 'Sí, ofrecemos servicios individuales como Diseño Gráfico (desde $50.000), Edición de Video (desde $80.000), Página Web (desde $800.000), Manejo de Pautas (desde $200.000), Manejo de Redes Sociales (desde $400.000) y Asesoría Personalizada (desde $100.000). Puedes contratar estos servicios de forma puntual sin necesidad de un plan mensual.',
  },
  {
    id: 9,
    question: '¿Cómo funciona el proceso de trabajo?',
    answer: 'Una vez que contratas un plan o servicio, agendamos una reunión inicial para entender tu negocio, objetivos y audiencia. Luego desarrollamos una estrategia personalizada y comenzamos a crear contenido. Tienes acceso a un dashboard donde puedes ver el progreso, solicitar cambios y revisar reportes. Todo el proceso está optimizado con IA para mayor eficiencia.',
  },
  {
    id: 10,
    question: '¿Qué significa "Resultados en 30 días"?',
    answer: 'Significa que en 30 días comenzarás a ver métricas medibles como aumento en engagement, crecimiento de seguidores, más interacciones, y en algunos casos, incremento en conversiones y ventas. Los resultados específicos varían según tu industria y objetivos, pero trabajamos con métricas claras y reportes que te muestran el progreso mes a mes.',
  },
  {
    id: 11,
    question: '¿Ofrecen descuentos para contratos trimestrales o anuales?',
    answer: 'Sí, ofrecemos descuentos especiales para contratos trimestrales y anuales. Además, actualmente tenemos un 20% de descuento por tiempo limitado en todos los planes hasta el 31 de diciembre de 2025. Contáctanos para conocer los descuentos disponibles según tu plan de contratación.',
  },
  {
    id: 12,
    question: '¿Cómo me contacto con ustedes si tengo una pregunta urgente?',
    answer: 'Puedes contactarnos directamente por WhatsApp (respondemos en menos de 15 minutos), a través del formulario de contacto en esta página, o por email a hola@zinergiamarketing.com. También puedes usar el botón flotante de WhatsApp que aparece en la esquina de la página.',
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
        <h3 className="text-lg font-semibold text-primary-purple pr-4">
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
        <div className="px-6 py-4 text-gray-700 leading-relaxed border-t border-gray-100">
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
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-primary-neutral/20 to-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary-purple mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Resolvemos las dudas más comunes sobre nuestros servicios y planes
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
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
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            ¿No encontraste la respuesta que buscabas?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-primary text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Contáctanos directamente
          </a>
        </motion.div>
      </div>
    </section>
  )
}

