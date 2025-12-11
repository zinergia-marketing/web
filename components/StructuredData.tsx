export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
    ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
    : 'https://zinergiamarketing.info'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zinergia Marketing',
    url: baseUrl,
    logo: `${baseUrl}/images/general/og-image.jpg`,
    description: 'Agencia de marketing digital especializada en diseño gráfico, edición de video, páginas web, manejo de redes sociales y pautas publicitarias para PyMEs colombianas.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CO',
      addressLocality: 'Colombia',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hola@zinergiamarketing.info',
      availableLanguage: 'Spanish',
    },
    sameAs: [
      'https://instagram.com/zinergiamarketing',
      'https://facebook.com/zinergiamarketing.co',
      'https://tiktok.com/@zinergiamarketing',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Colombia',
    },
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}#organization`,
    name: 'Zinergia Marketing',
    image: `${baseUrl}/images/general/og-image.jpg`,
    url: baseUrl,
    telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573243463101',
    email: 'hola@zinergiamarketing.info',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CO',
    },
    priceRange: '$$',
    description: 'Agencia de marketing digital que ofrece servicios de diseño gráfico, edición de video, desarrollo web, manejo de redes sociales y pautas publicitarias para PyMEs en Colombia.',
    serviceArea: {
      '@type': 'Country',
      name: 'Colombia',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Marketing Digital',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Diseño Gráfico',
            description: 'Posts, carruseles, flyers profesionales para redes sociales',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Edición de Video',
            description: 'Reels, TikToks, videos publicitarios que impactan',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Página Web',
            description: 'Sitios web que convierten visitantes en clientes',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Manejo de Redes Sociales',
            description: 'Gestión completa de redes sociales con contenido estratégico',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Manejo de Pautas',
            description: 'Gestión profesional de campañas publicitarias en redes sociales',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Asesoría Personalizada',
            description: 'Consultoría estratégica para hacer crecer tu negocio digital',
          },
        },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuánto tiempo toma ver resultados con los planes mensuales?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Según nuestros casos de éxito, comenzamos a ver resultados medibles en 30 días. Sin embargo, los resultados pueden variar según el tipo de negocio y la industria. En nuestros planes incluimos reportes mensuales (o semanales en Plan Estándar y Avanzado) para que puedas monitorear el progreso.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo cancelar mi plan mensual en cualquier momento?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, nuestros contratos son mensuales con renovación automática, pero puedes cancelar en cualquier momento sin penalización. Solo necesitas avisarnos con al menos 7 días de anticipación antes del próximo ciclo de facturación.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué incluye exactamente cada plan mensual?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cada plan incluye diseño gráfico, edición de video, manejo de redes sociales, community management, campañas de pautas publicitarias (el presupuesto de pauta se cobra aparte), asesoría estratégica y reportes de métricas. La cantidad de entregables y el nivel de servicio varía según el plan.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo funciona el presupuesto de pautas publicitarias?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El presupuesto de pautas publicitarias se cobra aparte del plan mensual. Nosotros gestionamos y optimizamos las campañas, pero el presupuesto publicitario (lo que inviertes en anuncios en Facebook, Instagram, TikTok, etc.) es independiente. Te ayudamos a definir el presupuesto ideal según tus objetivos y te mostramos cómo optimizarlo para maximizar el ROAS (Retorno sobre Inversión Publicitaria).',
        },
      },
      {
        '@type': 'Question',
        name: '¿Trabajan con empresas de todos los tamaños?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, trabajamos principalmente con PyMEs colombianas que venden en redes sociales. Desde emprendedores que inician su presencia digital hasta empresas establecidas que buscan escalar. Nuestros planes están diseñados para adaptarse a diferentes etapas de crecimiento.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuántas rondas de revisión incluyen los entregables?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Todos los planes incluyen 2 rondas de revisión por entregable. Esto significa que puedes solicitar ajustes hasta 2 veces por cada pieza de diseño o video antes de la aprobación final.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}

