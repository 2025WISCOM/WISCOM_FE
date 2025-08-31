import type { ReactNode } from 'react'

interface WorkDetailProps {
  preview?: ReactNode
  title: string
  subtitle?: string
  meta: ReactNode
  body: ReactNode
  nav?: ReactNode
}

export default function WorkDetail({
  preview,
  title,
  subtitle,
  meta,
  body,
  nav,
}: WorkDetailProps) {
  return (
    <section className="w-full max-w-[960px] mx-auto px-4">
      {/* 프리뷰(좌측 상단) */}
      {preview && <div className="mb-4">{preview}</div>}

      {/* 제목/부제목 */}
      <header className="mb-3 text-center">
        <h1 className="text-[22px] font-bold text-[#6F5E4B]">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-[15px] text-[#6F5E4B]">{subtitle}</p>
        )}
      </header>

      {/* 구분선 */}
      <hr className="border-t border-[#B19D87] mb-4" />

      {/* 메타 정보(팀, 멤버 표 등) */}
      <div className="mb-5">{meta}</div>

      {/* 구분선 */}
      <hr className="border-t border-[#B19D87] mb-4" />

      {/* 본문 */}
      <article className="text-[13px] leading-6 text-[#42372C] whitespace-pre-line mb-6">
        {body}
      </article>

      {/* Prev / Next 네비게이션 */}
      {nav && <div className="mt-2">{nav}</div>}
    </section>
  )
}
