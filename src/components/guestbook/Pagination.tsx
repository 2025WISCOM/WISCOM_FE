import React from 'react'

interface PaginationProps {
  current: number // 1-based
  total: number // 총 페이지 수
  onChange: (page: number) => void
  maxVisible?: number // 기본 5
  className?: string
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  onChange,
  maxVisible = 5,
  className = '',
}) => {
  const clampedCurrent = Math.min(Math.max(1, current), total)
  const visible = Math.min(maxVisible, total)

  let start = clampedCurrent - Math.floor(visible / 2)
  start = Math.max(1, start)
  if (start + visible - 1 > total) {
    start = total - visible + 1
  }

  const pages = Array.from({ length: visible }, (_, i) => start + i)

  const go = (p: number) => {
    if (p < 1 || p > total || p === clampedCurrent) return
    onChange(p)
  }

  return (
    <nav
      className={`flex items-center justify-center gap-[8px] ${className}`}
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => go(clampedCurrent - 1)}
        disabled={clampedCurrent === 1}
        className="w-[40px] h-[24px] disabled:opacity-40 text-[15px] cursor-pointer"
        aria-label="이전 페이지"
      >
        &lt;
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => go(p)}
          aria-current={p === clampedCurrent ? 'page' : undefined}
          className={[
            'w-[40px] h-[24px] text-[15px] cursor-pointer',
            p === clampedCurrent ? 'text-[#000]' : 'text-[#B19D87]',
          ].join(' ')}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => go(clampedCurrent + 1)}
        disabled={clampedCurrent === total}
        className="w-[40px] h-[24px] disabled:opacity-40 text-[15px] cursor-pointer"
        aria-label="다음 페이지"
      >
        &gt;
      </button>
    </nav>
  )
}

export default Pagination
