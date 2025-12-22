'use client'

import { motion } from 'framer-motion'
import Carousel from './Carousel'

const clients = [
  { name: 'TuColpagos', industry: 'Fintech' },
  { name: 'Boutique La Guaca', industry: 'Moda' },
  { name: 'Tecnomas Colombia', industry: 'Tecnología' },
  { name: 'Terrasana SAS', industry: 'Psicultura' },
  { name: 'Kovak Boutique', industry: 'Moda' },
  { name: 'Épica Joyería', industry: 'Joyería' },
]

const industries = ['Fintech', 'Moda', 'Tecnología', 'Psicultura', 'Joyería']

interface ClientCardProps {
  client: typeof clients[0]
  isMobile?: boolean
}

function ClientCard({ client, isMobile = false }: ClientCardProps) {
  return (
    <div className={`bg-gradient-to-br from-primary-neutral/20 to-white rounded-xl ${isMobile ? 'p-4' : 'p-6 sm:p-8'} shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center ${isMobile ? 'min-h-[100px]' : 'min-h-[120px] sm:min-h-[140px]'}`}>
      <h3 className={`${isMobile ? 'text-sm' : 'text-base sm:text-lg'} font-bold text-primary-purple ${isMobile ? 'mb-1' : 'mb-2'}`}>
        {client.name}
      </h3>
      <p className={`${isMobile ? 'text-xs' : 'text-xs sm:text-sm'} text-gray-600`}>
        {client.industry}
      </p>
    </div>
  )
}

export default function Clients() {
  return (
    <section
      id="clients"
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-purple mb-2 sm:mb-4 px-4">
            Algunas marcas que han confiado en nosotros
          </h2>
        </motion.div>

        {/* Clients - Carousel on mobile, Grid on tablet/desktop */}
        <div className="md:hidden overflow-hidden">
          <div className="-mx-4 sm:-mx-6">
            <div className="px-4 sm:px-6">
              <Carousel autoPlay={true} autoPlayInterval={4500} showIndicators={true}>
                {clients.map((client) => (
                  <ClientCard key={client.name} client={client} isMobile={true} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>

        {/* Tablet/Desktop Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 md:mb-12"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ClientCard client={client} />
            </motion.div>
          ))}
        </motion.div>

        {/* Industries */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center px-4 mt-6 sm:mt-8 md:mt-10"
        >
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            <span className="font-semibold text-primary-purple">Sectores:</span>{' '}
            {industries.join(', ')} y más
          </p>
        </motion.div>
      </div>
    </section>
  )
}

