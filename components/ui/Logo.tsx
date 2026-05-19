import Link from 'next/link'

interface LogoProps {
  variant?: 'light' | 'dark'
  locale: string
}

export default function Logo({ variant = 'dark', locale }: LogoProps) {
  const hexFill = variant === 'dark' ? '#111111' : '#ffffff'
  const mColor = '#22c55e'

  return (
    <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17 1L32 9.5V24.5L17 33L2 24.5V9.5L17 1Z"
          fill={hexFill}
          className="transition-transform duration-300 group-hover:scale-105 origin-center"
        />
        <text x="17" y="22" textAnchor="middle" fill={mColor} fontSize="14" fontWeight="900" fontFamily="system-ui, sans-serif">
          M
        </text>
      </svg>
      <div>
        <div className="text-[11px] font-extrabold tracking-[2px] leading-tight" style={{ color: variant === 'dark' ? '#111111' : '#ffffff' }}>
          MARINA ALTA
        </div>
        <div className="text-[7px] tracking-[3.5px] text-brand-green leading-tight">
          ELECTRICIDAD
        </div>
      </div>
    </Link>
  )
}
