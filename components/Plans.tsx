'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Carousel from './Carousel'
import CountdownTimer from './CountdownTimer'
import { MdAutoAwesome, MdRocketLaunch, MdBolt, MdStar, MdCheckCircle, MdCelebration } from 'react-icons/md'

const DISCOUNT_PERCENTAGE = 20
const DISCOUNT_END_DATE = new Date('2025-12-31T23:59:59')

const plans = [
  {
    id: 1,
    name: 'Plan Básico',
    subtitle: 'ideal para quienes inician',
    price: 1000000,
    benefit: 'Construye tu presencia digital y genera tus primeros leads de forma profesional',
    idealFor: 'Emprendedores y microempresas que inician su presencia digital y necesitan contenido profesional sin una inversión alta',
    color: 'from-primary-purple to-primary-coral',
    icon: MdAutoAwesome,
    features: [
      '12 piezas de diseño gráfico al mes',
      '4 reels o videos cortos editados',
      'Manejo de 2 redes sociales (Instagram y Facebook)',
      '12 publicaciones al mes (3 por semana)',
      'Community management básico',
      '1 campaña de pautas publicitarias (presupuesto aparte)',
      '1 hora de asesoría estratégica mensual',
      'Reporte mensual de métricas básicas',
    ],
    popular: false,
  },
  {
    id: 2,
    name: 'Plan Estándar',
    subtitle: 'ideal para quienes crecen',
    price: 1500000,
    benefit: 'Acelera tu crecimiento con contenido estratégico y pautas optimizadas que generan ventas constantes',
    idealFor: 'Negocios en crecimiento que buscan escalar ventas con marketing digital estructurado y resultados medibles',
    color: 'from-primary-coral to-primary-purple',
    icon: MdRocketLaunch,
    features: [
      '20 piezas de diseño gráfico al mes',
      '8 reels o videos cortos editados',
      'Manejo de 3 redes sociales (Instagram, Facebook, TikTok)',
      '16 publicaciones al mes (4 por semana)',
      'Community management completo',
      '2 campañas de pautas publicitarias (presupuesto aparte)',
      '2 horas de asesoría estratégica mensual',
      'Reportes semanales de ROAS y métricas',
    ],
    popular: true,
  },
  {
    id: 3,
    name: 'Plan Avanzado',
    subtitle: 'ideal para quienes escalan',
    price: 2500000,
    benefit: 'Escala agresivamente con una estrategia integral que maximiza conversiones y ROI',
    idealFor: 'Empresas que buscan escalar resultados, maximizar ROI y necesitan una estrategia integral con soporte estratégico continuo',
    color: 'from-primary-purple to-primary-coral',
    icon: MdBolt,
    features: [
      '30+ piezas de diseño gráfico al mes',
      '12 reels o videos cortos editados',
      'Manejo completo de hasta 4 redes sociales',
      '24 publicaciones al mes (6 por semana)',
      'Community management premium',
      '4 campañas de pautas publicitarias (presupuesto aparte)',
      'Landing Page incluida (nueva o mejoras mensuales)',
      '4 horas de asesoría estratégica mensual',
      'Reporte mensual ejecutivo con análisis predictivo',
    ],
    popular: false,
  },
  {
    id: 4,
    name: 'Plan Premium',
    subtitle: 'ideal para empresas que buscan excelencia',
    price: 4500000,
    benefit: 'Solución integral premium con IA, automatizaciones, Club Zinergia y producción de contenido profesional',
    idealFor: 'Empresas establecidas que buscan la solución más completa con todos los servicios avanzados, automatizaciones con IA y acompañamiento estratégico de alto nivel',
    color: 'from-primary-coral to-primary-purple',
    icon: MdStar,
    features: [
      'Todo lo incluido en Plan Avanzado',
      'Chatbots con IA para WhatsApp y página web',
      'Automatizaciones con Manychat en Instagram',
      'Membresía al Club Zinergia incluida',
      '2-3 reuniones estratégicas semanales',
      'Capacitaciones para equipos de venta y marketing',
      'Producción de contenido profesional (video y fotografía) - Los viáticos adicionales para producción fuera de Montería no están incluidos y deben ser costeados por el negocio',
      'Asesoría estratégica fija y acompañamiento continuo',
      'Acceso a recursos exclusivos y comunidad',
    ],
    popular: false,
  },
]

interface PlanCardProps {
  plan: typeof plans[0]
  getWhatsAppUrl: (planName: string, planSubtitle: string) => string
  index?: number
  isMobile?: boolean
}

function PlanCard({ plan, getWhatsAppUrl, index, isMobile = false }: PlanCardProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index ?? 0) * 0.1 }}
      onMouseEnter={() => setHoveredId(plan.id)}
      onMouseLeave={() => setHoveredId(null)}
      className={`relative group w-full ${plan.popular ? 'pt-12 sm:pt-14' : ''}`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50">
          <span className="bg-gradient-to-r from-primary-coral to-primary-purple text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-xl whitespace-nowrap">
            Más Popular
          </span>
        </div>
      )}

      <div
        className={`${plan.popular ? 'bg-primary-neutral/10' : 'bg-white'} rounded-2xl ${isMobile ? 'p-5' : 'p-8'} shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col border-2 ${
          plan.popular 
            ? 'border-primary-coral' 
            : 'border-transparent'
        } ${
          hoveredId === plan.id && !isMobile ? 'transform scale-105' : ''
        }`}
      >
        {/* Icon & Name */}
        <div className={`${isMobile ? 'mb-4' : 'mb-6'} text-center`}>
          <div
            className={`${isMobile ? 'w-14 h-14 mb-3' : 'w-16 h-16 mb-4'} rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg mx-auto`}
          >
            <plan.icon className={`${isMobile ? 'text-3xl' : 'text-4xl'} text-white`} />
          </div>
          <h3 className={`${isMobile ? 'text-2xl mb-1' : 'text-3xl mb-1'} font-bold text-primary-purple`}>
            {plan.name}
          </h3>
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500 font-medium`}>
            {plan.subtitle}
          </p>
        </div>

        {/* Price */}
        <div className={`${isMobile ? 'mb-4' : 'mb-6'} text-center`}>
          {new Date() < DISCOUNT_END_DATE ? (
            <>
              {/* Discount Badge */}
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary-coral to-primary-purple text-white rounded-full text-xs font-bold">
                  {DISCOUNT_PERCENTAGE}% OFF
                </span>
              </div>
              
              {/* Original Price (tachado) */}
              <div className="mb-1">
                <span className={`${isMobile ? 'text-xl' : 'text-2xl'} text-gray-400 line-through`}>
                  ${plan.price.toLocaleString('es-CO')}
                </span>
              </div>
              
              {/* Discounted Price */}
              <div>
                <span className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold text-primary-purple`}>
                  ${Math.round(plan.price * (1 - DISCOUNT_PERCENTAGE / 100)).toLocaleString('es-CO')}
                </span>
                <span className="text-gray-600 text-sm ml-1 font-normal">pesos</span>
              </div>
              
              <span className="text-gray-500 text-sm block mt-1">
                al mes
              </span>
            </>
          ) : (
            <>
              <span className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold text-primary-purple`}>
                ${plan.price.toLocaleString('es-CO')}
              </span>
              <span className="text-gray-600 text-sm ml-1 font-normal">pesos</span>
              <span className="text-gray-500 text-sm block mt-1">
                al mes
              </span>
            </>
          )}
        </div>

        {/* Benefit */}
        <p className={`${isMobile ? 'mb-4 text-sm' : 'mb-6'} text-gray-700 text-center font-medium`}>
          {plan.benefit}
        </p>

        {/* Features */}
        <ul className={`${isMobile ? 'space-y-2 mb-6' : 'space-y-3 mb-8'} flex-grow`}>
          {plan.features.map((feature, idx) => (
            <li key={idx} className={`flex items-start text-gray-700 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              <MdCheckCircle className="text-primary-coral mr-2 mt-0.5 flex-shrink-0 text-lg" />
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Ideal For */}
        <div className={`${isMobile ? 'mb-4 p-3' : 'mb-6 p-4'} bg-primary-neutral/20 rounded-lg`}>
          <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-600 italic text-center leading-relaxed`}>
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
          className={`w-full ${isMobile ? 'py-3 text-base' : 'py-4'} rounded-full font-bold text-white bg-gradient-to-r ${plan.color} hover:shadow-lg transition-all duration-300 hover:scale-105 text-center block ${
            plan.popular && !isMobile ? 'text-lg' : ''
          }`}
        >
          {plan.popular ? 'Contratar Plan Popular' : 'Solicitar este plan'}
        </a>
      </div>
    </motion.div>
  )
}

export default function Plans() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573243463101'
  
  const getWhatsAppUrl = (planName: string, planSubtitle: string) => {
    const message = encodeURIComponent(`Hola, me interesa conocer más sobre el plan ${planName} - ${planSubtitle}. Me gustaría recibir información detallada y una cotización personalizada.`)
    return `https://wa.me/${whatsappNumber}?text=${message}`
  }

  return (
    <section
      id="plans"
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-purple mb-2 sm:mb-4 px-4">
            Planes Mensuales
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Impulsa tu negocio con creatividad e inteligencia artificial. Elige el plan que mejor se adapte a tu etapa de crecimiento.
          </p>
        </motion.div>

        {/* Plans - Carousel on mobile, Grid on desktop */}
        <div className="lg:hidden overflow-hidden">
          <div className="-mx-4 sm:-mx-6">
            <div className="px-4 sm:px-6 pt-16 pb-2">
              <Carousel autoPlay={true} autoPlayInterval={4500} showIndicators={true}>
                {plans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} getWhatsAppUrl={getWhatsAppUrl} isMobile={true} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8 items-start">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              getWhatsAppUrl={getWhatsAppUrl}
              index={index}
            />
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-10 lg:mt-12 text-center"
        >
          <div className="bg-primary-neutral/20 rounded-2xl p-4 sm:p-6 max-w-3xl mx-auto mb-6 sm:mb-8">
            <p className="text-gray-700 text-sm mb-2">
              <strong>Nota importante:</strong> Todos los planes incluyen 2 rondas de revisión por entregable. 
              Los presupuestos de pauta publicitaria se cobran aparte según tus objetivos. 
              Contratos mensuales con renovación automática. Descuentos disponibles para contratos trimestrales y anuales.
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Plan Premium:</strong> El Club Zinergia incluye 2-3 reuniones semanales y capacitaciones para equipos. 
              Los viáticos para producción de contenido fuera de Montería deben ser costeados por el negocio.
            </p>
          </div>
        </motion.div>

        {/* Discount Banner */}
        {new Date() < DISCOUNT_END_DATE && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gradient-to-r from-primary-coral to-primary-purple rounded-2xl p-4 sm:p-6 lg:p-5 max-w-3xl mx-auto shadow-2xl"
          >
            <div className="text-white">
              <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                <MdCelebration className="text-2xl sm:text-3xl lg:text-2xl" />
                <h3 className="text-lg sm:text-2xl lg:text-xl font-bold text-white uppercase">
                  {DISCOUNT_PERCENTAGE}% DE DESCUENTO POR TIEMPO LIMITADO
                </h3>
              </div>
              <p className="text-sm sm:text-base lg:text-sm text-white mb-4 sm:mb-5 lg:mb-4 font-medium">
                Oferta válida hasta el 31 de diciembre de 2025
              </p>
              <div className="bg-white/25 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-3 border border-white/30">
                <p className="text-xs sm:text-sm lg:text-xs text-white font-semibold mb-2 sm:mb-3 lg:mb-2">Termina en:</p>
                <CountdownTimer endDate={DISCOUNT_END_DATE} className="text-white" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

