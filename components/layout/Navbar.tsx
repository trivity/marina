'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Logo from '@/components/ui/Logo'

const LOCALES = ['es', 'en', 'de'] as const

interface NavbarProps {
  locale: string
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const pathWithoutLocale = pathname.replace(/^\/(es|en|de)/, '') || '/'

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm' : 'bg-white border-b border-gray-100'}`}>
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Logo locale={locale} />

        <ul className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} className={`text-[11px] font-medium transition-colors hover:text-brand-black ${pathname === l.href ? 'text-brand-black' : 'text-gray-500'}`}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <span className="text-[10px] text-gray-500">+49 176 20634487</span>
          <div className="flex gap-1.5 text-[9px] font-semibold">
            {LOCALES.map(loc => (
              <Link key={loc} href={`/${loc}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`}
                className={`px-1.5 py-0.5 rounded transition-colors uppercase ${locale === loc ? 'text-brand-green' : 'text-gray-400 hover:text-gray-600'}`}>
                {loc}
              </Link>
            ))}
          </div>
          <Link href={`/${locale}/contact`} className="bg-brand-black text-white text-[10px] font-bold px-4 py-2 rounded hover:bg-gray-800 transition-colors">
            {t('cta')}
          </Link>
        </div>

        <button className="md:hidden p-2 text-gray-600" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <div className={`w-5 h-0.5 bg-current transition-all mb-1 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-5 h-0.5 bg-current transition-all mb-1 ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="block py-2.5 text-sm text-gray-600 border-b border-gray-50 last:border-0">
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-4">
            {LOCALES.map(loc => (
              <Link key={loc} href={`/${loc}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`}
                className={`text-xs font-bold uppercase ${locale === loc ? 'text-brand-green' : 'text-gray-400'}`}
                onClick={() => setMenuOpen(false)}>
                {loc}
              </Link>
            ))}
          </div>
          <Link href={`/${locale}/contact`} className="mt-4 block w-full bg-brand-black text-white text-center text-sm font-bold py-2.5 rounded" onClick={() => setMenuOpen(false)}>
            {t('cta')}
          </Link>
        </div>
      )}
    </header>
  )
}
