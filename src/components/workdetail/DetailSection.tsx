import type { ReactNode } from 'react'

interface DetailSectionProps {
  title?: string
  children: ReactNode
}

export default function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <section className="mb-4 px-5">
      {title && (
        <h2 className="text-[15px] font-semibold text-[#42372C] mb-2">
          {title}
        </h2>
      )}
      <div className="text-[15px] leading-6 text-[#42372C]">{children}</div>
    </section>
  )
}
