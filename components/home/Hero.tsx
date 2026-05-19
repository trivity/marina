'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface HeroProps { locale: string }

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations('hero')
  const headlines = [t('headline1'), t('headline2'), t('headline3')]

  return (
    <section className="pt-14 min-h-[90vh] flex items-center bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-16">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/25 rounded-full px-3 py-1.5 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_6px_#22c55e]" />
            <span className="text-brand-green text-[9px] font-semibold tracking-[2px] uppercase">{t('badge')}</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight mb-4 text-brand-black">
            {headlines.map((word, i) => (
              <motion.span key={i} className={`block ${i === headlines.length - 1 ? 'text-brand-green' : ''}`}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}
            className="text-gray-500 text-[13px] leading-relaxed mb-7 max-w-sm">
            {t('sub')}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap gap-3 mb-7">
            <Link href={`/${locale}/contact`} className="bg-brand-black text-white text-[11px] font-bold px-5 py-3 rounded hover:bg-gray-800 active:scale-95 transition-all">
              {t('cta1')}
            </Link>
            <a href="tel:+4917620634487" className="border border-gray-200 text-brand-black text-[11px] font-medium px-5 py-3 rounded hover:border-gray-400 transition-colors">
              {t('cta2')}
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-wrap gap-4">
            {[t('trust1'), t('trust2'), t('trust3'), t('trust4')].map(item => (
              <span key={item} className="text-[10px] text-gray-500">{item}</span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center min-h-[400px]"
        >
          {/* ambient glow behind the video */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-brand-green/5 rounded-2xl pointer-events-none" />
          <video
            src="/video/light.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="relative z-10 w-full max-w-[480px] h-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  )
}
