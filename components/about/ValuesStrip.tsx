'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function ValuesStrip() {
  const t = useTranslations('about')
  const values = [
    { icon: '⏱', titleKey: 'v1title', descKey: 'v1desc' },
    { icon: '💬', titleKey: 'v2title', descKey: 'v2desc' },
    { icon: '🛡', titleKey: 'v3title', descKey: 'v3desc' },
  ] as const

  return (
    <section className="bg-gray-50 py-14 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map(({ icon, titleKey, descKey }, i) => (
          <motion.div key={titleKey} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex items-start gap-4">
            <div className="w-10 h-10 bg-brand-green/10 border border-brand-green/20 rounded-lg flex items-center justify-center text-xl flex-shrink-0">{icon}</div>
            <div>
              <h3 className="font-bold text-[13px] text-brand-black mb-1">{t(titleKey)}</h3>
              <p className="text-[11px] text-gray-500">{t(descKey)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
