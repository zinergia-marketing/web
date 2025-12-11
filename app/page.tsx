import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import Navigation from '@/components/Navigation'
import Services from '@/components/Services'
import Plans from '@/components/Plans'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

// Lazy load componentes pesados para mejorar performance
const Portfolio = dynamic(() => import('@/components/Portfolio'), {
  loading: () => <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-primary-neutral/30 to-white min-h-[400px]" />,
})

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="py-12 sm:py-16 lg:py-20 bg-white min-h-[400px]" />,
})

const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-primary-neutral/20 to-white min-h-[400px]" />,
})

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden w-full">
      <Navigation />
      <Hero />
      <Services />
      <Plans />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

