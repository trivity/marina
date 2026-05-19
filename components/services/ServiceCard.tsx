'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

type ServiceKey = 'install' | 'fault' | 'consumer' | 'smart' | 'cert'

interface ServiceCardProps {
  serviceKey: ServiceKey
  icon: string
  index: number
}

export default function ServiceCard({ serviceKey, icon, index }: ServiceCardProps) {
  const t = useTranslations('servicesPage')
  const includesRaw = t.raw(`${serviceKey}.includes`) as string[]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.5 }}
      className="bg-white border border-gray-100 rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-5">
        <div className="w-12 h-12 bg-brand-green/10 border border-brand-green/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="text-[16px] font-bold text-brand-black mb-2">{t(`${serviceKey}.title` as any)}</h3>
          <p className="text-[12px] text-gray-500 leading-relaxed mb-4">{t(`${serviceKey}.desc` as any)}</p>
          <ul className="space-y-1.5">
            {includesRaw.map((item: string) => (
              <li key={item} className="flex items-start gap-2 text-[11px] text-gray-600">
                <span className="w-4 h-4 bg-brand-green/15 rounded flex items-center justify-center text-brand-green text-[9px] font-bold flex-shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
