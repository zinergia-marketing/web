import Hero from '@/components/Hero'
import Navigation from '@/components/Navigation'
import Services from '@/components/Services'
import Plans from '@/components/Plans'
import Portfolio from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

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

