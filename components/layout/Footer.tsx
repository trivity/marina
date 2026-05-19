import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Logo from '@/components/ui/Logo'

interface FooterProps {
  locale: string
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations()

  return (
    <footer className="bg-brand-black text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <Logo variant="light" locale={locale} />
            <p className="mt-4 text-[11px] text-gray-500 leading-relaxed max-w-[220px]">{t('footer.tagline')}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold tracking-[2px] text-white mb-4">{t('footer.nav')}</p>
            <ul className="space-y-2.5">
              {[
                { href: `/${locale}`, label: t('nav.home') },
                { href: `/${locale}/services`, label: t('nav.services') },
                { href: `/${locale}/about`, label: t('nav.about') },
                { href: `/${locale}/contact`, label: t('nav.contact') },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[11px] text-gray-500 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-bold tracking-[2px] text-white mb-4">{t('footer.contact')}</p>
            <ul className="space-y-2.5 text-[11px] text-gray-500">
              <li>+49 176 20634487</li>
              <li>marina.alta.electricidad@gmail.com</li>
              <li>Calle Morell 4<br />Denia, Valencia 03700</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] text-gray-600">{t('footer.rights')}</p>
          <div className="flex gap-4">
            {(['es', 'en', 'de'] as const).map(loc => (
              <Link key={loc} href={`/${loc}`} className={`text-[9px] font-bold uppercase ${locale === loc ? 'text-brand-green' : 'text-gray-600 hover:text-gray-400'}`}>
                {loc}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
