import { useTranslations } from 'next-intl'

export default function ContactDetails() {
  const t = useTranslations('contactPage')
  return (
    <div className="space-y-6">
      <h2 className="text-[22px] font-extrabold text-brand-black">{t('detailsTitle')}</h2>
      <div className="bg-gray-50 rounded-xl p-5 space-y-4">
        <div className="flex items-start gap-3">
          <span className="text-brand-green text-lg mt-0.5">📞</span>
          <div>
            <div className="text-[10px] font-bold tracking-[1.5px] text-gray-400 mb-0.5">PHONE</div>
            <a href="tel:+4917620634487" className="text-[13px] font-semibold text-brand-black hover:text-brand-green transition-colors">+49 176 20634487</a>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-brand-green text-lg mt-0.5">✉️</span>
          <div>
            <div className="text-[10px] font-bold tracking-[1.5px] text-gray-400 mb-0.5">EMAIL</div>
            <a href="mailto:marina.alta.electricidad@gmail.com" className="text-[13px] font-semibold text-brand-black hover:text-brand-green transition-colors break-all">marina.alta.electricidad@gmail.com</a>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-brand-green text-lg mt-0.5">📍</span>
          <div>
            <div className="text-[10px] font-bold tracking-[1.5px] text-gray-400 mb-0.5">ADDRESS</div>
            <p className="text-[13px] text-brand-black">Calle Morell 4<br />Denia, Valencia 03700<br />Spain</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-5">
        <div className="text-[10px] font-bold tracking-[1.5px] text-gray-400 mb-2">{t('hoursLabel')}</div>
        <p className="text-[12px] text-brand-black whitespace-pre-line leading-relaxed">{t('hours')}</p>
      </div>
      <div className="bg-brand-green/10 border border-brand-green/20 rounded-xl p-5">
        <div className="text-[10px] font-bold tracking-[1.5px] text-brand-green mb-2">{t('langLabel')}</div>
        <p className="text-[12px] text-gray-700">{t('langNote')}</p>
        <div className="flex gap-2 mt-3">
          {['DE', 'EN', 'ES'].map(l => (
            <span key={l} className="bg-brand-green/20 text-brand-green text-[10px] font-bold px-2.5 py-1 rounded">{l}</span>
          ))}
        </div>
      </div>
      <div className="rounded-xl overflow-hidden border border-gray-100">
        <iframe
          title="Marina Alta Electricidad — Denia"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3114.2!2d0.1118!3d38.8414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6170e9c1234567%3A0x1!2sCalle+Morell+4%2C+03700+D%C3%A9nia%2C+Valencia!5e0!3m2!1sen!2ses!4v1"
          width="100%" height="200" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
