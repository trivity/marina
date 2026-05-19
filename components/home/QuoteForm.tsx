'use client'
import { useState, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionLabel from '@/components/ui/SectionLabel'

export default function QuoteForm() {
  const t = useTranslations('form')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionLabel>{t('label')}</SectionLabel>
          <h2 className="text-[26px] font-extrabold text-brand-black mb-8">{t('title')}</h2>
          {status === 'success' ? (
            <div className="bg-brand-green/10 border border-brand-green/30 rounded-xl p-6 text-center">
              <p className="text-brand-green font-semibold">{t('success')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input name="from_name" placeholder={t('name')} required className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] text-brand-black placeholder-gray-400 outline-none focus:border-brand-green transition-colors w-full" />
                <input name="phone" placeholder={t('phone')} required className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] text-brand-black placeholder-gray-400 outline-none focus:border-brand-green transition-colors w-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input name="email" type="email" placeholder={t('email')} required className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] text-brand-black placeholder-gray-400 outline-none focus:border-brand-green transition-colors w-full" />
                <select name="service" required className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] text-gray-500 outline-none focus:border-brand-green transition-colors w-full bg-white">
                  <option value="">{t('service')}</option>
                  {(['s1','s2','s3','s4','s5','s6'] as const).map(k => <option key={k} value={t(k)}>{t(k)}</option>)}
                </select>
              </div>
              <textarea name="message" placeholder={t('message')} rows={4} className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] text-brand-black placeholder-gray-400 outline-none focus:border-brand-green transition-colors w-full resize-none" />
              {status === 'error' && <p className="text-red-500 text-[11px]">{t('error')}</p>}
              <button type="submit" disabled={status === 'sending'} className="w-full bg-brand-black text-white font-bold text-[12px] tracking-wide py-3.5 rounded-md hover:bg-gray-800 active:scale-[0.99] transition-all disabled:opacity-60">
                {status === 'sending' ? t('sending') : t('submit')}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
