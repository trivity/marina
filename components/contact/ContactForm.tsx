'use client'
import { useState, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { useTranslations } from 'next-intl'

export default function ContactForm() {
  const t = useTranslations('form')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.currentTarget,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )
      setStatus('success')
      e.currentTarget.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <h2 className="text-[22px] font-extrabold text-brand-black mb-6">{t('title')}</h2>
      {status === 'success' ? (
        <div className="bg-brand-green/10 border border-brand-green/30 rounded-xl p-6 text-center">
          <p className="text-brand-green font-semibold">{t('success')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="from_name" placeholder={t('name')} required className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] outline-none focus:border-brand-green transition-colors w-full" />
            <input name="phone" placeholder={t('phone')} required className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] outline-none focus:border-brand-green transition-colors w-full" />
          </div>
          <input name="email" type="email" placeholder={t('email')} required className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] outline-none focus:border-brand-green transition-colors w-full" />
          <select name="service" required className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] text-gray-500 outline-none focus:border-brand-green transition-colors w-full bg-white">
            <option value="">{t('service')}</option>
            {(['s1','s2','s3','s4','s5','s6'] as const).map(k => <option key={k} value={t(k)}>{t(k)}</option>)}
          </select>
          <textarea name="message" placeholder={t('message')} rows={5} className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] outline-none focus:border-brand-green transition-colors w-full resize-none" />
          {status === 'error' && <p className="text-red-500 text-[11px]">{t('error')}</p>}
          <button type="submit" disabled={status === 'sending'}
            className="w-full bg-brand-black text-white font-bold text-[12px] tracking-wide py-3.5 rounded-md hover:bg-gray-800 transition-all disabled:opacity-60">
            {status === 'sending' ? t('sending') : t('submit')}
          </button>
        </form>
      )}
    </div>
  )
}
