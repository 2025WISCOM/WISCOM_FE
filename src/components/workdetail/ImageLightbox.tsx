import { useEffect, useRef, useState } from 'react'

interface ImageLightboxProps {
  images: string[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function ImageLightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: ImageLightboxProps) {
  const total = images.length
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [anim, setAnim] = useState(true)

  const lastDragTimeRef = useRef(0)
  const isGhostClick = () => Date.now() - lastDragTimeRef.current < 250

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onPrev, onNext])

  const getWidth = () => containerRef.current?.clientWidth ?? window.innerWidth

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setDragging(true)
    setAnim(false)
    setStartX(e.clientX)
    setDragX(0)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    setDragX(e.clientX - startX)
  }

  const finishDrag = (e: React.PointerEvent) => {
    if (!dragging) return
    e.preventDefault()
    e.stopPropagation()
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    const w = getWidth()
    const threshold = Math.min(120, w * 0.15)
    const dx = dragX
    setDragging(false)
    setAnim(true)
    setDragX(0)
    lastDragTimeRef.current = Date.now()
    if (dx > threshold) onPrev()
    else if (dx < -threshold) onNext()
  }

  const dragPercent = (() => {
    if (!dragging) return 0
    const w = getWidth()
    return w ? (dragX / w) * (100 / total) : 0
  })()

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-[1px] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onClick={() => {
        if (!dragging && !isGhostClick()) onClose()
      }}
    >
      {/* 닫기 */}
      <button
        type="button"
        aria-label="닫기"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onClose()
        }}
        className="fixed top-4 right-4 z-[1102] pointer-events-auto rounded-full bg-black/55 hover:bg-black/75 text-white p-2"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* 스와이프 컨테이너 */}
      <div
        ref={containerRef}
        className="relative z-[1100] w-full h-full flex items-center justify-center px-3 select-none touch-none"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onPointerLeave={(e) => dragging && finishDrag(e)}
      >
        {/* 트랙 */}
        <div className="h-full w-full overflow-hidden">
          <div
            className="h-full flex items-center z-0"
            style={{
              width: `${total * 100}%`,
              transform: `translateX(calc(${-(index * (100 / total))}% + ${dragPercent}%))`,
              transition: anim ? 'transform 300ms ease' : 'none',
              willChange: 'transform',
            }}
          >
            {images.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="h-full"
                style={{ width: `${100 / total}%` }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={src}
                    alt={`미리보기 ${i + 1}/${total}`}
                    className="max-h-[85vh] max-w-[92vw] object-contain rounded-md shadow-2xl"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 인덱스 */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-white text-sm md:text-base pointer-events-none z-[1101]
               rounded px-2 py-1 bg-black/50 backdrop-blur-[2px]"
          style={{
            bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
          }}
          aria-live="polite"
        >
          {index + 1}/{total}
        </div>
      </div>
    </div>
  )
}
