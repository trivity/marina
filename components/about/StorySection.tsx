'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function StorySection() {
  const t = useTranslations('about')
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="text-3xl font-black text-brand-black whitespace-pre-line mb-6 leading-tight">{t('storyTitle')}</h2>
          <div className="space-y-4 text-[12px] text-gray-600 leading-relaxed">
            <p>{t('storyP1')}</p>
            <p>{t('storyP2')}</p>
            <p>{t('storyP3')}</p>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-50 to-brand-green/5 rounded-2xl p-10 flex items-center justify-center min-h-[300px] border border-gray-100">
          <svg viewBox="0 0 180 200" width="180" height="200" className="opacity-80">
            <rect x="20" y="10" width="140" height="180" rx="8" fill="#111" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.4" />
            <rect x="30" y="25" width="60" height="8" rx="3" fill="#22c55e" opacity="0.8" />
            <rect x="30" y="39" width="60" height="8" rx="3" fill="#22c55e" opacity="0.6" />
            <rect x="30" y="53" width="60" height="8" rx="3" fill="#333" />
            <rect x="30" y="67" width="60" height="8" rx="3" fill="#22c55e" opacity="0.9" />
            <rect x="30" y="81" width="60" height="8" rx="3" fill="#22c55e" opacity="0.5" />
            <rect x="30" y="95" width="60" height="8" rx="3" fill="#22c55e" opacity="0.7" />
            <rect x="105" y="25" width="45" height="60" rx="4" fill="#1a1a1a" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.3" />
            <circle cx="127" cy="55" r="14" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.5" />
            <circle cx="127" cy="55" r="6" fill="#22c55e" opacity="0.6" />
            <rect x="30" y="120" width="120" height="1" fill="#22c55e" opacity="0.2" />
            <text x="30" y="140" fill="#22c55e" fontSize="8" fontFamily="monospace" opacity="0.6">DE STANDARD</text>
            <text x="30" y="155" fill="#555" fontSize="7" fontFamily="monospace">IEC 60364 COMPLIANT</text>
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
