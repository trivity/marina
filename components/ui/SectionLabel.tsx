interface SectionLabelProps {
  children: React.ReactNode
  light?: boolean
}

export default function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <p className={`text-[9px] font-semibold tracking-[3px] uppercase mb-2 ${light ? 'text-brand-green' : 'text-gray-400'}`}>
      {children}
    </p>
  )
}
