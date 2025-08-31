import { useState } from 'react'

type PreviewImageProps = {
  src: string
  alt?: string
  ratio?: `${number}/${number}`
  className?: string
  rounded?: string
  onPrev?: () => void
  onNext?: () => void
  prevDisabled?: boolean
  nextDisabled?: boolean
}

function ratioToPaddingTop(ratio: `${number}/${number}`) {
  const [w, h] = ratio.split('/').map(Number)
  if (!w || !h) return '56.25%'
  return `${(h / w) * 100}%`
}

export default function PreviewImage({
  src,
  alt = 'preview image',
  ratio = '16/9',
  className = '',
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
}: PreviewImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const paddingTop = ratioToPaddingTop(ratio)

  return (
    <div className={['relative w-full', className].join(' ')}>
      <div
        className={[
          'relative w-full',
          'overflow-hidden',
          'bg-[#D9D9D9]',
          'border border-white/40',
        ].join(' ')}
        style={{ paddingTop }}
      >
        {!error && (
          <img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={[
              'absolute inset-0 h-full w-full object-cover',
              'transition-[filter,transform,opacity] duration-500',
              loaded
                ? 'opacity-100 filter-none scale-100'
                : 'opacity-80 blur-sm scale-[1.01]',
            ].join(' ')}
            draggable={false}
          />
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-[#7A6C5E]">
            이미지를 불러올 수 없습니다.
          </div>
        )}
      </div>

      {onPrev && (
        <button
          type="button"
          aria-label="이전 이미지"
          disabled={prevDisabled}
          onClick={onPrev}
          className={[
            'absolute top-1/2 -translate-y-1/2 left-[-25px]',
            'flex items-center justify-center',
            'transition disabled:opacity-40 disabled:cursor-not-allowed',
            'text-black',
            'z-10',
          ].join(' ')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 6L9 12L15 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {onNext && (
        <button
          type="button"
          aria-label="다음 이미지"
          disabled={nextDisabled}
          onClick={onNext}
          className={[
            'absolute top-1/2 -translate-y-1/2 right-[-25px]',
            'flex items-center justify-center',
            'transition disabled:opacity-40 disabled:cursor-not-allowed',
            'text-black',
            'z-10',
          ].join(' ')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6L15 12L9 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
