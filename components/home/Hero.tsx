'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface HeroProps { locale: string }

function BulbSVG() {
  return (
    <svg viewBox="0 0 160 240" width="220" height="330" className="drop-shadow-2xl">
      <defs>
        <radialGradient id="bulbGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="80" cy="105" rx="68" ry="68" fill="#22c55e" opacity="0.06" />
      <ellipse cx="80" cy="105" rx="50" ry="50" fill="#22c55e" opacity="0.07" />
      <path d="M48,130 Q28,100 28,82 Q28,42 80,42 Q132,42 132,82 Q132,100 112,130 L112,155 Q112,163 104,163 L56,163 Q48,163 48,155 Z" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5" />
      <path d="M52,128 Q35,100 35,82 Q35,48 80,48 Q125,48 125,82 Q125,100 108,128 L108,152 Q108,158 102,158 L58,158 Q52,158 52,152 Z" fill="url(#bulbGlow)" />
      <path d="M68,150 L68,118 Q68,100 80,92 Q92,100 92,118 L92,150" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M72,118 Q80,108 88,118" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
      <rect x="56" y="163" width="48" height="10" rx="3" fill="#d1d5db" />
      <rect x="58" y="173" width="44" height="9" rx="3" fill="#9ca3af" />
      <rect x="60" y="182" width="40" height="9" rx="3" fill="#6b7280" />
      <rect x="64" y="191" width="32" height="8" rx="2" fill="#4b5563" />
      <line x1="116" y1="66" x2="128" y2="54" stroke="#22c55e" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      <line x1="120" y1="88" x2="134" y2="84" stroke="#22c55e" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      <line x1="44" y1="66" x2="32" y2="54" stroke="#22c55e" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      <line x1="40" y1="90" x2="26" y2="86" stroke="#22c55e" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
    </svg>
  )
}

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

        <div className="relative flex items-end justify-center md:justify-end min-h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-brand-green/5 rounded-2xl" />
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative z-10">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <BulbSVG />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-10 -right-4 bg-brand-black text-white rounded-lg px-3 py-2 flex items-center gap-2.5 shadow-xl cursor-pointer hover:bg-gray-800 transition-colors">
              <div className="w-7 h-7 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M3 2L8 5L3 8V2Z" fill="#000" />
                </svg>
              </div>
              <div>
                <div className="text-[9px] font-bold leading-tight">{t('videoLabel')}</div>
                <div className="text-[8px] text-gray-400 leading-tight">{t('videoSub')}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
