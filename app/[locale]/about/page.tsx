import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StorySection from '@/components/about/StorySection'
import ValuesStrip from '@/components/about/ValuesStrip'
import CredentialsSection from '@/components/about/CredentialsSection'
import SectionLabel from '@/components/ui/SectionLabel'

const titles: Record<string, string> = {
  es: 'Sobre Nosotros | Marina Alta Electricidad',
  en: 'About Us | Marina Alta Electricidad',
  de: 'Über Uns | Marina Alta Electricidad',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: titles[locale] ?? titles.es }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('about')
  return (
    <>
      <Navbar locale={locale} />
      <main className="pt-14">
        <div className="bg-brand-black py-16 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <SectionLabel light>{t('pageLabel')}</SectionLabel>
            <h1 className="text-4xl font-black text-white mt-2 mb-3">{t('pageTitle')}</h1>
            <p className="text-gray-500 text-[13px]">{t('pageSub')}</p>
          </div>
        </div>
        <StorySection />
        <ValuesStrip />
        <CredentialsSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
