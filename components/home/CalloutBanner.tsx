'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function CalloutBanner() {
  const t = useTranslations('callout')
  return (
    <section className="bg-[#0a0a0a] py-16 border-t border-[#1f1f1f]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-green shadow-[0_0_8px_#22c55e] animate-pulse" />
            <span className="text-brand-green text-[9px] font-semibold tracking-[2px] uppercase">{t('badge')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight whitespace-pre-line mb-4">{t('headline')}</h2>
          <p className="text-gray-500 text-[12px] leading-relaxed">{t('sub')}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col items-start md:items-end gap-2">
          <a href="tel:+4917620634487" className="bg-brand-green text-black font-bold text-[11px] tracking-wide px-6 py-3 rounded hover:bg-brand-green-dark transition-colors whitespace-nowrap">
            {t('cta')}
          </a>
          <span className="text-gray-600 text-[9px]">{t('response')}</span>
        </motion.div>
      </div>
    </section>
  )
}
