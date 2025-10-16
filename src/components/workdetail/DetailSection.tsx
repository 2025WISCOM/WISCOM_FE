import type { ReactNode } from 'react'

interface DetailSectionProps {
  title?: string
  children: ReactNode
  // 필요하면 외부에서 제목 배열을 주입할 수도 있게 확장
  headings?: string[]
}

export default function DetailSection({
  title,
  children,
  headings = ['서비스 소개', '개발 배경', '특장점', '기대효과 및 활용 분야'],
}: DetailSectionProps) {
  const isString = typeof children === 'string'
  const paragraphs = isString
    ? (children as string)
        .split(/\r?\n{2,}/) // 빈 줄(2개 이상 개행) 기준 문단 분리
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
    : []

  return (
    <section className="mb-4 px-5">
      {title && (
        <h2 className="text-[15px] font-semibold text-[#42372C] mb-2">
          {title}
        </h2>
      )}

      {isString ? (
        <div className="space-y-4">
          {paragraphs.map((para, idx) => {
            const heading = headings[idx] ?? `제목 ${idx + 1}`
            return (
              <div key={idx}>
                <div className="text-[18px] font-bold text-[#6F5E4B] mb-1">
                  {heading}
                </div>
                <p className="text-[15px] leading-6 text-[#42372C] whitespace-pre-line">
                  {para}
                </p>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-[15px] leading-6 text-[#42372C]">{children}</div>
      )}
    </section>
  )
}
