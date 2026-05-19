import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import ServicesSection from '@/components/home/ServicesSection'
import CalloutBanner from '@/components/home/CalloutBanner'
import Reviews from '@/components/home/Reviews'
import QuoteForm from '@/components/home/QuoteForm'

const titles: Record<string, string> = {
  es: 'Electricista Denia & Costa Blanca | Marina Alta Electricidad',
  en: 'Electrician Denia & Costa Blanca | Marina Alta Electricidad',
  de: 'Elektriker Denia & Costa Blanca | Marina Alta Electricidad',
}
const descs: Record<string, string> = {
  es: 'Electricista certificado alemán en Denia, Jávea y la Costa Blanca. Instalaciones, averías, cuadros eléctricos. Presupuesto gratuito.',
  en: 'German-certified electrician in Denia, Jávea and Costa Blanca. Installations, fault finding, consumer units. Free quotes.',
  de: 'Deutsch zertifizierter Elektriker in Denia, Jávea und Costa Blanca. Installationen, Fehlersuche, Verteilerkästen. Kostenlose Angebote.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: titles[locale] ?? titles.es,
    description: descs[locale] ?? descs.es,
    alternates: {
      canonical: `https://marinaaltaelectricidad.com/${locale}`,
      languages: {
        es: 'https://marinaaltaelectricidad.com/es',
        en: 'https://marinaaltaelectricidad.com/en',
        de: 'https://marinaaltaelectricidad.com/de',
      },
    },
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Marina Alta Electricidad',
  telephone: '+4917620634487',
  email: 'marina.alta.electricidad@gmail.com',
  url: 'https://marinaaltaelectricidad.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle Morell 4',
    addressLocality: 'Denia',
    postalCode: '03700',
    addressCountry: 'ES',
  },
  areaServed: ['Denia', 'Jávea', 'Costa Blanca'],
  priceRange: '€€',
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar locale={locale} />
      <main>
        <Hero locale={locale} />
        <ServicesSection locale={locale} />
        <CalloutBanner />
        <Reviews />
        <QuoteForm />
      </main>
      <Footer locale={locale} />
    </>
  )
}
