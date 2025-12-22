'use client'

import { motion } from 'framer-motion'
import Carousel from './Carousel'
import { MdTrendingUp, MdVideoLibrary, MdShoppingCart, MdBarChart, MdPeople, MdRocketLaunch } from 'react-icons/md'

const metrics = [
  {
    id: 1,
    value: 'Hasta +200%',
    label: 'en engagement en redes sociales',
    icon: MdTrendingUp,
    color: 'from-primary-purple to-primary-coral',
  },
  {
    id: 2,
    value: '+150%',
    label: 'en conversión desde contenido en video',
    icon: MdVideoLibrary,
    color: 'from-primary-coral to-primary-purple',
  },
  {
    id: 3,
    value: '+200%',
    label: 'en ventas con campañas de pauta optimizada',
    icon: MdShoppingCart,
    color: 'from-primary-purple to-primary-coral',
  },
  {
    id: 4,
    value: '+250%',
    label: 'en engagement con estrategia integral',
    icon: MdBarChart,
    color: 'from-primary-coral to-primary-purple',
  },
  {
    id: 5,
    value: '+200%',
    label: 'en crecimiento de audiencia',
    icon: MdPeople,
    color: 'from-primary-purple to-primary-coral',
  },
  {
    id: 6,
    value: '30 días',
    label: 'para ver resultados medibles',
    icon: MdRocketLaunch,
    color: 'from-primary-coral to-primary-purple',
  },
]

interface MetricCardProps {
  metric: typeof metrics[0]
  index?: number
  isMobile?: boolean
}

function MetricCard({ metric, index, isMobile = false }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index ?? 0) * 0.1 }}
      className={`bg-white rounded-2xl ${isMobile ? 'p-5' : 'p-6 sm:p-8'} shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center`}
    >
      {/* Icon */}
      <div className={`${isMobile ? 'w-14 h-14' : 'w-16 h-16 sm:w-20 sm:h-20'} rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg ${isMobile ? 'mb-3' : 'mb-4'}`}>
        <metric.icon className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'} text-white`} />
      </div>

      {/* Value */}
      <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl md:text-5xl'} font-bold text-primary-purple ${isMobile ? 'mb-1.5' : 'mb-2'}`}>
        {metric.value}
      </h3>

      {/* Label */}
      <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm sm:text-base'} font-medium leading-relaxed`}>
        {metric.label}
      </p>
    </motion.div>
  )
}

export default function Metrics() {
  return (
    <section
      id="metrics"
      className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white"
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
            Resultados que hablan por sí solos
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Métricas reales de clientes que confiaron en nosotros
          </p>
        </motion.div>

        {/* Metrics - Carousel on mobile/tablet, Grid on desktop */}
        <div className="lg:hidden overflow-hidden">
          <div className="-mx-4 sm:-mx-6">
            <div className="px-4 sm:px-6">
              <Carousel autoPlay={true} autoPlayInterval={4500} showIndicators={true}>
                {metrics.map((metric) => (
                  <MetricCard key={metric.id} metric={metric} isMobile={true} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 xl:gap-8">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.id} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

