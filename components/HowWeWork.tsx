'use client'

import { motion } from 'framer-motion'
import Carousel from './Carousel'
import { MdSearch, MdPeople, MdLightbulb, MdRocketLaunch, MdTrendingUp, MdAssessment } from 'react-icons/md'

const steps = [
  {
    id: 1,
    number: '01',
    title: 'Diagnóstico del negocio y objetivos',
    description: 'Analizamos tu propuesta de valor, modelo de negocio y objetivos de crecimiento para diseñar una estrategia que impacte directamente en tus ventas.',
    icon: MdSearch,
    color: 'from-primary-purple to-primary-coral',
  },
  {
    id: 2,
    number: '02',
    title: 'Análisis de audiencia, contenido actual y competencia',
    description: 'Entendemos a tu audiencia, evaluamos tu contenido actual y estudiamos a tu competencia para identificar oportunidades de diferenciación y crecimiento.',
    icon: MdPeople,
    color: 'from-primary-coral to-primary-purple',
  },
  {
    id: 3,
    number: '03',
    title: 'Diseño de estrategia creativa + IA',
    description: 'Creamos una estrategia integral que combina creatividad e inteligencia artificial para redes sociales, video, pauta publicitaria y web, enfocada en generar conversiones.',
    icon: MdLightbulb,
    color: 'from-primary-purple to-primary-coral',
  },
  {
    id: 4,
    number: '04',
    title: 'Producción de contenido y lanzamiento de campañas',
    description: 'Producimos contenido de alta calidad y lanzamos campañas optimizadas que conectan con tu audiencia y generan resultados desde el primer día.',
    icon: MdRocketLaunch,
    color: 'from-primary-coral to-primary-purple',
  },
  {
    id: 5,
    number: '05',
    title: 'Optimización semanal basada en métricas',
    description: 'Monitoreamos y optimizamos continuamente basándonos en métricas clave como ROAS, engagement y leads, asegurando que cada inversión genere el máximo retorno.',
    icon: MdTrendingUp,
    color: 'from-primary-purple to-primary-coral',
  },
  {
    id: 6,
    number: '06',
    title: 'Reportes y recomendaciones de crecimiento',
    description: 'Entregamos reportes claros con insights accionables y recomendaciones estratégicas para que tu negocio siga creciendo mes a mes.',
    icon: MdAssessment,
    color: 'from-primary-coral to-primary-purple',
  },
]

interface StepCardProps {
  step: typeof steps[0]
  index?: number
  isMobile?: boolean
}

function StepCard({ step, index, isMobile = false }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index ?? 0) * 0.1 }}
      className="relative px-4 pt-4"
    >
      {/* Number Badge */}
      <div className={`absolute top-0 left-4 ${isMobile ? 'w-12 h-12' : 'w-14 h-14 sm:w-16 sm:h-16'} rounded-full bg-gradient-to-br from-primary-purple to-primary-coral flex items-center justify-center shadow-xl z-20`}>
        <span className={`text-white font-bold ${isMobile ? 'text-base' : 'text-lg sm:text-xl'}`}>{step.number}</span>
      </div>
      
      <div className={`relative bg-white rounded-2xl ${isMobile ? 'p-5 pt-10' : 'p-6 sm:p-8 pt-12 sm:pt-14'} shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col`}>
        {/* Icon */}
        <div className={`${isMobile ? 'w-14 h-14' : 'w-16 h-16 sm:w-20 sm:h-20'} rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg ${isMobile ? 'mb-3' : 'mb-4'} self-start`}>
          <step.icon className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'} text-white`} />
        </div>

        {/* Title */}
        <h3 className={`${isMobile ? 'text-lg' : 'text-xl sm:text-2xl'} font-bold text-primary-purple ${isMobile ? 'mb-2' : 'mb-3'}`}>
          {step.title}
        </h3>

        {/* Description */}
        <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm sm:text-base'} leading-relaxed flex-grow`}>
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function HowWeWork() {
  return (
    <section
      id="how-we-work"
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-purple mb-2 sm:mb-4">
            Cómo trabajamos
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Un método probado que transforma estrategia en resultados medibles
          </p>
        </motion.div>

        {/* Steps - Carousel on mobile/tablet, Grid on desktop */}
        <div className="lg:hidden">
          <div className="-mx-4 sm:-mx-6">
            <div className="px-0 sm:px-2 pt-8 pb-4">
              <Carousel autoPlay={true} autoPlayInterval={4500} showIndicators={true}>
                {steps.map((step) => (
                  <StepCard key={step.id} step={step} isMobile={true} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 xl:gap-8 pt-4">
          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

