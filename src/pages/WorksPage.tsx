import { useCallback, useEffect, useRef, useState } from 'react'
import Tabs, { type CategoryUI } from '../components/works/Tabs'
import FrameCard from '../components/works/FrameCard'
import WorkExplan from '../components/works/WorkExplan'
import { fetchWorkList, type WorkItem } from '../apis/works'
import { useNavigate } from 'react-router-dom'

export default function WorksPage() {
  const [active, setActive] = useState<CategoryUI>('ALL')
  const [items, setItems] = useState<WorkItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<WorkItem | null>(null)
  const [centerIdx, setCenterIdx] = useState(0)
  const railRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)

  useEffect(() => {
    const ac = new AbortController()
    setLoading(true)
    setError(null)

    fetchWorkList(active, ac.signal)
      .then((list) => {
        setItems(list)
        setSelected(list[0] ?? null)
        setCenterIdx(0)
      })
      .catch((e) => {
        if (!(e instanceof DOMException && e.name === 'AbortError')) {
          setError((e as Error).message ?? '불러오기 실패')
          setItems([])
          setSelected(null)
        }
      })
      .finally(() => setLoading(false))

    return () => ac.abort()
  }, [active])

  const scrollToCenter = useCallback((idx: number) => {
    const rail = railRef.current
    if (!rail) return
    const target = rail.querySelector<HTMLElement>(`[data-idx="${idx}"]`)
    target?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [])

  useEffect(() => {
    if (items.length > 0) {
      setCenterIdx(0)
      setSelected(items[0])
      setTimeout(() => scrollToCenter(0), 0)
    }
  }, [items, scrollToCenter])

  useEffect(() => {
    if (items.length <= 1) return
    const id = setInterval(() => {
      setCenterIdx((prev) => {
        const next = (prev + 1) % items.length
        scrollToCenter(next)
        setSelected(items[next])
        return next
      })
    }, 3500)
    return () => clearInterval(id)
  }, [items.length, scrollToCenter])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    if (items.length <= 1) return

    const onTouchStart = (e: TouchEvent) => {
      setIsDragging(true)
      setStartX(e.touches[0].clientX)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      setCurrentX(e.touches[0].clientX)
    }

    const onTouchEnd = () => {
      if (!isDragging) return
      const delta = currentX - startX

      // 60px 이상 드래그 시 전환
      if (delta > 60 && centerIdx > 0) {
        const prev = centerIdx - 1
        setCenterIdx(prev)
        setSelected(items[prev])
        scrollToCenter(prev)
      } else if (delta < -60 && centerIdx < items.length - 1) {
        const next = centerIdx + 1
        setCenterIdx(next)
        setSelected(items[next])
        scrollToCenter(next)
      }

      setIsDragging(false)
      setStartX(0)
      setCurrentX(0)
    }

    rail.addEventListener('touchstart', onTouchStart)
    rail.addEventListener('touchmove', onTouchMove)
    rail.addEventListener('touchend', onTouchEnd)

    // 데스크탑 마우스도 지원
    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      setStartX(e.clientX)
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      setCurrentX(e.clientX)
    }
    const onMouseUp = () => {
      if (!isDragging) return
      const delta = currentX - startX

      if (delta > 60 && centerIdx > 0) {
        const prev = centerIdx - 1
        setCenterIdx(prev)
        setSelected(items[prev])
        scrollToCenter(prev)
      } else if (delta < -60 && centerIdx < items.length - 1) {
        const next = centerIdx + 1
        setCenterIdx(next)
        setSelected(items[next])
        scrollToCenter(next)
      }

      setIsDragging(false)
      setStartX(0)
      setCurrentX(0)
    }

    rail.addEventListener('mousedown', onMouseDown)
    rail.addEventListener('mousemove', onMouseMove)
    rail.addEventListener('mouseup', onMouseUp)
    rail.addEventListener('mouseleave', onMouseUp)

    return () => {
      rail.removeEventListener('touchstart', onTouchStart)
      rail.removeEventListener('touchmove', onTouchMove)
      rail.removeEventListener('touchend', onTouchEnd)
      rail.removeEventListener('mousedown', onMouseDown)
      rail.removeEventListener('mousemove', onMouseMove)
      rail.removeEventListener('mouseup', onMouseUp)
      rail.removeEventListener('mouseleave', onMouseUp)
    }
  }, [isDragging, startX, currentX, centerIdx, items, scrollToCenter])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const onScroll = () => {
      const children = Array.from(
        rail.querySelectorAll('[data-idx]'),
      ) as HTMLElement[]
      if (children.length === 0) return

      // const railCenter = rail.scrollLeft + rail.clientWidth / 2

      let closestIdx = 0
      let minDiff = Infinity

      children.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const diff = Math.abs(
          rect.left +
            rect.width / 2 -
            (rail.getBoundingClientRect().left + rail.clientWidth / 2),
        )
        if (diff < minDiff) {
          minDiff = diff
          closestIdx = parseInt(el.dataset.idx ?? '0')
        }
      })

      if (closestIdx !== centerIdx) {
        setCenterIdx(closestIdx)
        setSelected(items[closestIdx])
      }
    }

    // 스크롤이 멈췄을 때만 감지
    let timeout: number | null = null
    const handleScroll = () => {
      if (timeout) clearTimeout(timeout)
      timeout = window.setTimeout(onScroll, 10) // 0.1초 후 포커스 갱신
    }

    rail.addEventListener('scroll', handleScroll)
    return () => rail.removeEventListener('scroll', handleScroll)
  }, [items, centerIdx])

  return (
    <div className="w-full text-[#2c2620]">
      <div className="mx-auto max-w-[960px] pt-4 pb-5">
        <div className="sticky top-0 z-5 bg-[#F5F3F0]/95 backdrop-blur-[2px] border-b border-[#C8B7A6]">
          <div className="w-full flex items-center justify-center">
            <Tabs value={active} onChange={setActive} />
          </div>
        </div>

        {loading && (
          <div className="mt-8 text-center text-sm text-[#8d837a]">
            목록을 불러오는 중입니다...
          </div>
        )}
        {error && (
          <div className="mt-8 text-center text-sm text-red-700">{error}</div>
        )}

        {!loading && !error && (
          <div
            ref={railRef}
            className={`
    ${items.length > 1 ? 'overflow-x-auto scroll-smooth' : 'overflow-hidden'}
    snap-x snap-mandatory
    [scrollbar-width:none]
  `}
          >
            <div className="flex items-stretch">
              {items.length > 0 && (
                <div
                  aria-hidden
                  className="snap-center shrink-0 basis-1/3 px-2 pointer-events-none"
                />
              )}

              {items.map((w, i) => {
                const isCenter = i === centerIdx
                return (
                  <div
                    key={w.id}
                    data-idx={i}
                    className={`
                      snap-center shrink-0 basis-1/3 px-0.5
                      transition-transform duration-300
                      ${isCenter ? 'scale-100' : 'scale-90'}
                    `}
                  >
                    <FrameCard
                      image={w.imageUrl}
                      size="lg"
                      focused={isCenter}
                      onClick={() =>
                        navigate(`/works/${active.toLowerCase()}/${w.id}`)
                      }
                    />
                  </div>
                )
              })}

              {items.length > 0 && (
                <div
                  aria-hidden
                  className="snap-center shrink-0 basis-1/3 px-2 pointer-events-none"
                />
              )}
            </div>
          </div>
        )}

        {selected && (
          <WorkExplan
            title={selected.projectName}
            subtitle={selected.shortDescription}
            teamName={selected.teamName}
            members={(selected.developers ?? []).map((d) => d.name)}
            description={selected.midDescription}
          />
        )}
      </div>
    </div>
  )
}
