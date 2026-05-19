'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import SectionLabel from '@/components/ui/SectionLabel'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

interface CredentialsSectionProps { locale: string }

export default function CredentialsSection({ locale }: CredentialsSectionProps) {
  const t = useTranslations('about')
  const certs = ['cert1', 'cert2', 'cert3', 'cert4'] as const
  const stats = [
    { to: 15, suffix: '+', label: 'YRS' },
    { to: 3,  suffix: '',  label: 'LANG' },
    { to: 100,suffix: '%', label: 'ON TIME' },
  ]

  return (
    <>
      <section className="bg-brand-black py-16">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel light>{t('credLabel')}</SectionLabel>
          <h2 className="text-[26px] font-extrabold text-white mb-10">{t('credTitle')}</h2>
          <div className="grid grid-cols-3 gap-8 mb-12">
            {stats.map(({ to, suffix, label }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="text-center">
                <div className="text-4xl font-black text-brand-green">
                  <AnimatedCounter to={to} suffix={suffix} />
                </div>
                <div className="text-gray-600 text-[9px] tracking-[2px] mt-1">{label}</div>
              </motion.div>
            ))}
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {certs.map((k, i) => (
              <motion.li key={k} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-start gap-3 text-gray-400 text-[12px]">
                <span className="w-5 h-5 bg-brand-green rounded flex items-center justify-center text-black text-[10px] font-bold flex-shrink-0 mt-0.5">✓</span>
                {t(k)}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-white py-16 border-t border-gray-100 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-[26px] font-extrabold text-brand-black mb-2">{t('ctaTitle')}</h2>
          <p className="text-gray-500 text-[12px] mb-6">{t('ctaSub')}</p>
          <Link href={`/${locale}/contact`} className="inline-block bg-brand-black text-white font-bold text-[12px] tracking-wide px-8 py-3.5 rounded hover:bg-gray-800 transition-colors">
            {t('ctaBtn')}
          </Link>
        </div>
      </section>
    </>
  )
}
