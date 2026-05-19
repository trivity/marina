'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import SectionLabel from '@/components/ui/SectionLabel'

interface ServicesSectionProps { locale: string }

const ICONS = ['⚡', '🔎', '🔌', '🏡']

export default function ServicesSection({ locale }: ServicesSectionProps) {
  const t = useTranslations('services')
  const cards = [
    { key: 'install', icon: ICONS[0] },
    { key: 'fault',   icon: ICONS[1] },
    { key: 'consumer',icon: ICONS[2] },
    { key: 'smart',   icon: ICONS[3] },
  ]

  return (
    <section className="bg-brand-black py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <SectionLabel light>{t('label')}</SectionLabel>
            <h2 className="text-[26px] font-extrabold text-white">{t('title')}</h2>
          </div>
          <Link href={`/${locale}/services`} className="text-brand-green text-[11px] font-semibold hover:underline">{t('viewAll')}</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {cards.map(({ key, icon }, i) => (
            <motion.div key={key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-[#1a1a1a] border border-[#222] rounded-xl p-5 cursor-pointer group relative overflow-hidden hover:border-brand-green/30 transition-colors">
              <Link href={`/${locale}/services`} className="block">
                <span className="absolute top-4 right-4 text-gray-700 text-sm group-hover:text-brand-green transition-colors">↗</span>
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="text-[13px] font-bold text-white mb-1.5">{t(`${key}.title` as any)}</h3>
                <p className="text-[10px] text-gray-500 leading-relaxed">{t(`${key}.desc` as any)}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.32, duration: 0.5 }}
          className="bg-[#1a1a1a] border border-[#222] rounded-xl px-5 py-4 hover:border-brand-green/30 transition-colors">
          <Link href={`/${locale}/services`} className="flex justify-between items-center w-full">
            <div>
              <h3 className="text-[13px] font-bold text-white mb-1">{t('cert.title')}</h3>
              <p className="text-[10px] text-gray-500">{t('cert.desc')}</p>
            </div>
            <span className="text-gray-700 text-sm group-hover:text-brand-green transition-colors ml-4 flex-shrink-0">↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
