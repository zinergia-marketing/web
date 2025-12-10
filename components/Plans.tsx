'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const plans = [
  {
    id: 1,
    name: 'Spark',
    subtitle: 'Inicio Digital',
    price: 'Desde $450k',
    priceFull: '450.000',
    benefit: 'Construye tu presencia digital y genera tus primeros leads de forma profesional',
    idealFor: 'Emprendedores y microempresas que inician su presencia digital y necesitan contenido profesional sin una inversión alta',
    color: 'from-primary-purple to-primary-coral',
    icon: '✨',
    features: [
      '12 piezas de diseño gráfico al mes',
      '4 reels o videos cortos editados',
      'Manejo de 2 redes sociales (Instagram y Facebook)',
      '15 publicaciones al mes (5 por semana)',
      'Community management básico',
      '1 hora de asesoría estratégica mensual',
      'Reporte mensual de métricas básicas',
    ],
    popular: false,
  },
  {
    id: 2,
    name: 'Momentum',
    subtitle: 'Crecimiento Acelerado',
    price: 'Desde $1.200k',
    priceFull: '1.200.000',
    benefit: 'Acelera tu crecimiento con contenido estratégico y pautas optimizadas que generan ventas constantes',
    idealFor: 'PyMEs en crecimiento que buscan escalar ventas con marketing digital estructurado y resultados medibles',
    color: 'from-primary-coral to-primary-purple',
    icon: '🚀',
    features: [
      '20 piezas de diseño gráfico al mes',
      '8 reels o videos cortos editados',
      'Manejo de 3 redes sociales (Instagram, Facebook, TikTok)',
      '24 publicaciones al mes (6 por semana)',
      'Community management completo',
      'Manejo de pautas publicitarias (presupuesto aparte)',
      '2 horas de asesoría estratégica mensual',
      'Reportes semanales de ROAS y métricas',
    ],
    popular: true,
  },
  {
    id: 3,
    name: 'Quantum',
    subtitle: 'Escalamiento Premium',
    price: 'Desde $2.500k',
    priceFull: '2.500.000',
    benefit: 'Escala agresivamente con una estrategia integral que maximiza conversiones y ROI',
    idealFor: 'Empresas que buscan escalar resultados, maximizar ROI y necesitan una estrategia integral con soporte estratégico continuo',
    color: 'from-primary-purple to-primary-coral',
    icon: '⚡',
    features: [
      '30+ piezas de diseño gráfico al mes',
      '12 reels o videos cortos editados',
      'Manejo completo de 4 redes sociales',
      '30+ publicaciones al mes (diarias optimizadas)',
      'Community management premium (24/7)',
      'Manejo avanzado de pautas multi-plataforma',
      'Landing Page incluida (nueva o mejoras mensuales)',
      '4 horas de asesoría estratégica mensual',
      'Reporte mensual ejecutivo con análisis predictivo',
    ],
    popular: false,
  },
]

export default function Plans() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573243463101'
  
  const getWhatsAppUrl = (planName: string, planSubtitle: string) => {
    const message = encodeURIComponent(`Hola, me interesa conocer más sobre el plan ${planName} - ${planSubtitle}. Me gustaría recibir información detallada y una cotización personalizada.`)
    return `https://wa.me/${whatsappNumber}?text=${message}`
  }

  return (
    <section
      id="plans"
      className="py-20 bg-gradient-to-b from-primary-neutral/30 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary-purple mb-4">
            Planes Mensuales
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Impulsa tu negocio con creatividad e inteligencia artificial. Elige el plan que mejor se adapte a tu etapa de crecimiento.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(plan.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-primary-coral to-primary-purple text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Más Popular
                  </span>
                </div>
              )}

              <div
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col border-2 ${
                  plan.popular 
                    ? 'border-primary-coral' 
                    : 'border-transparent'
                } ${
                  hoveredId === plan.id ? 'transform scale-105' : ''
                }`}
              >
                {/* Icon & Name */}
                <div className="mb-6 text-center">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-3xl shadow-lg mx-auto mb-4`}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-primary-purple mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6 text-center">
                  <span className="text-4xl font-bold text-primary-purple">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 text-sm block mt-1">
                    /mes
                  </span>
                </div>

                {/* Benefit */}
                <p className="text-gray-700 mb-6 text-center font-medium">
                  {plan.benefit}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-700 text-sm">
                      <span className="text-primary-coral mr-2 mt-1 flex-shrink-0">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Ideal For */}
                <div className="mb-6 p-4 bg-primary-neutral/20 rounded-lg">
                  <p className="text-xs text-gray-600 italic text-center">
                    {plan.idealFor}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href={getWhatsAppUrl(plan.name, plan.subtitle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'click', {
                        event_category: 'Plan',
                        event_label: `${plan.name} - ${plan.subtitle}`,
                      })
                    }
                  }}
                  className={`w-full py-4 rounded-full font-bold text-white bg-gradient-to-r ${plan.color} hover:shadow-lg transition-all duration-300 hover:scale-105 text-center block ${
                    plan.popular ? 'text-lg' : ''
                  }`}
                >
                  {plan.popular ? 'Contratar Plan Popular' : 'Solicitar este plan'}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-primary-neutral/20 rounded-2xl p-6 max-w-3xl mx-auto">
            <p className="text-gray-700 text-sm mb-2">
              <strong>Nota importante:</strong> Todos los planes incluyen 2 rondas de revisión por entregable. 
              Los presupuestos de pauta publicitaria se cobran aparte según tus objetivos. 
              Contratos mensuales con renovación automática. Descuentos disponibles para contratos trimestrales y anuales.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

