'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionLabel from '@/components/ui/SectionLabel'

export default function Reviews() {
  const t = useTranslations('reviews')
  const reviews = [
    { textKey: 'r1.text', authorKey: 'r1.author', locationKey: 'r1.location', initial: 'K' },
    { textKey: 'r2.text', authorKey: 'r2.author', locationKey: 'r2.location', initial: 'S' },
  ] as const

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <SectionLabel>{t('label')}</SectionLabel>
            <h2 className="text-[26px] font-extrabold text-brand-black">{t('title')}</h2>
          </div>
          <a href="https://www.google.com/search?q=Marina+Alta+Electricidad+Denia" target="_blank" rel="noopener noreferrer"
            className="text-brand-green text-[11px] font-semibold hover:underline hidden md:block">
            {t('viewAll')}
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map(({ textKey, authorKey, locationKey, initial }, i) => (
            <motion.div key={textKey} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <div className="text-yellow-400 text-sm mb-3">★★★★★</div>
              <p className="text-[11px] text-gray-600 leading-relaxed mb-4">&ldquo;{t(textKey)}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-black rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">{initial}</div>
                <div>
                  <div className="text-[11px] font-semibold text-brand-black">{t(authorKey)}</div>
                  <div className="text-[9px] text-gray-400">{t(locationKey)}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
