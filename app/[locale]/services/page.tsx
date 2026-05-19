import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ServiceCard from '@/components/services/ServiceCard'
import SectionLabel from '@/components/ui/SectionLabel'

const titles: Record<string, string> = {
  es: 'Servicios Eléctricos Denia | Marina Alta Electricidad',
  en: 'Electrical Services Denia | Marina Alta Electricidad',
  de: 'Elektroarbeiten Denia | Marina Alta Electricidad',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: titles[locale] ?? titles.es }
}

const SERVICES = [
  { key: 'install', icon: '⚡' },
  { key: 'fault',   icon: '🔎' },
  { key: 'consumer',icon: '🔌' },
  { key: 'smart',   icon: '🏡' },
  { key: 'cert',    icon: '📋' },
] as const

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('servicesPage')

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

        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-6 space-y-4">
            {SERVICES.map(({ key, icon }, i) => (
              <ServiceCard key={key} serviceKey={key} icon={icon} index={i} />
            ))}
          </div>
        </section>

        <section className="bg-brand-black py-14">
          <div className="max-w-6xl mx-auto px-6">
            <SectionLabel light>{t('trustLabel')}</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {([['t1title','t1desc'],['t2title','t2desc'],['t3title','t3desc']] as const).map(([tk, dk]) => (
                <div key={tk} className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-brand-green rounded flex items-center justify-center text-black text-[10px] font-bold flex-shrink-0 mt-0.5">✓</span>
                  <div>
                    <h3 className="text-[13px] font-bold text-white">{t(tk)}</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">{t(dk)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-green py-14 text-center">
          <div className="max-w-xl mx-auto px-6">
            <h2 className="text-[24px] font-extrabold text-black mb-2">{t('ctaTitle')}</h2>
            <p className="text-black/60 text-[12px] mb-6">{t('ctaSub')}</p>
            <Link href={`/${locale}/contact`} className="inline-block bg-black text-brand-green font-bold text-[12px] tracking-wide px-8 py-3.5 rounded hover:bg-gray-900 transition-colors">
              {t('ctaBtn')}
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
