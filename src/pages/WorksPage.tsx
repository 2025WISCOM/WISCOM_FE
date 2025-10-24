// import { useCallback, useEffect, useRef, useState } from 'react'
// import { useNavigate, useSearchParams } from 'react-router-dom'
// import Tabs, { type CategoryUI } from '../components/works/Tabs'
// import FrameCard from '../components/works/FrameCard'
// import WorkExplan from '../components/works/WorkExplan'
// import { fetchWorkList, type WorkItem } from '../apis/works'

// const VALID_TABS: CategoryUI[] = ['ALL', 'WEB&APP', 'AI', 'IOT', 'GAME']
// const isValidTab = (t: string | null): t is CategoryUI =>
//   !!t && VALID_TABS.includes(t as CategoryUI)

// export default function WorksPage() {
//   const [searchParams, setSearchParams] = useSearchParams()
//   const getInitialTab = () =>
//     isValidTab(searchParams.get('tab'))
//       ? (searchParams.get('tab') as CategoryUI)
//       : 'ALL'

//   const [active, setActive] = useState<CategoryUI>(getInitialTab)
//   const [items, setItems] = useState<WorkItem[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [centerIdx, setCenterIdx] = useState(0)
//   const railRef = useRef<HTMLDivElement | null>(null)
//   const navigate = useNavigate()

//   const [isDragging, setIsDragging] = useState(false)
//   const [startX, setStartX] = useState(0)
//   const [currentX, setCurrentX] = useState(0)

//   // 주소창의 ?tab=이 바뀌면 active 동기화 (직접 URL 입력/새로고침 대비)
//   useEffect(() => {
//     const q = searchParams.get('tab')
//     const next = isValidTab(q) ? (q as CategoryUI) : 'ALL'
//     setActive(next)
//   }, [searchParams])

//   // 탭 변경 시 URL의 ?tab= 업데이트
//   const handleTabChange = useCallback(
//     (next: CategoryUI) => {
//       setActive(next)
//       setSearchParams((prev) => {
//         const sp = new URLSearchParams(prev)
//         sp.set('tab', next)
//         return sp
//       })
//     },
//     [setSearchParams],
//   )

//   // 파생 상태: 항상 centerIdx에서 계산
//   const selected = items[centerIdx] ?? null

//   useEffect(() => {
//     const ac = new AbortController()
//     setLoading(true)
//     setError(null)

//     fetchWorkList(active, ac.signal)
//       .then((list) => {
//         setItems(list)
//         setCenterIdx(0)
//       })
//       .catch((e) => {
//         if (!(e instanceof DOMException && e.name === 'AbortError')) {
//           setError((e as Error).message ?? '불러오기 실패')
//           setItems([])
//           setCenterIdx(0)
//         }
//       })
//       .finally(() => setLoading(false))

//     return () => ac.abort()
//   }, [active])

//   const scrollToCenter = useCallback((idx: number) => {
//     const rail = railRef.current
//     if (!rail) return
//     const target = rail.querySelector<HTMLElement>(`[data-idx="${idx}"]`)
//     target?.scrollIntoView({
//       behavior: 'smooth',
//       inline: 'center',
//       block: 'nearest',
//     })
//   }, [])

//   useEffect(() => {
//     if (items.length > 0) {
//       setCenterIdx(0)
//       setTimeout(() => scrollToCenter(0), 0)
//     }
//   }, [items, scrollToCenter])

//   // 자동 전환
//   useEffect(() => {
//     if (items.length <= 1) return
//     const id = setInterval(() => {
//       setCenterIdx((prev) => {
//         const next = (prev + 1) % items.length
//         scrollToCenter(next)
//         return next
//       })
//     }, 3800)
//     return () => clearInterval(id)
//   }, [items.length, scrollToCenter])

//   // 터치/마우스 드래그: 인덱스만 변경
//   useEffect(() => {
//     const rail = railRef.current
//     if (!rail) return
//     if (items.length <= 1) return

//     const onTouchStart = (e: TouchEvent) => {
//       setIsDragging(true)
//       setStartX(e.touches[0].clientX)
//     }
//     const onTouchMove = (e: TouchEvent) => {
//       if (!isDragging) return
//       setCurrentX(e.touches[0].clientX)
//     }
//     const onTouchEnd = () => {
//       if (!isDragging) return
//       const delta = currentX - startX

//       if (delta > 60 && centerIdx > 0) {
//         const prev = centerIdx - 1
//         setCenterIdx(prev)
//         scrollToCenter(prev)
//       } else if (delta < -60 && centerIdx < items.length - 1) {
//         const next = centerIdx + 1
//         setCenterIdx(next)
//         scrollToCenter(next)
//       }

//       setIsDragging(false)
//       setStartX(0)
//       setCurrentX(0)
//     }

//     rail.addEventListener('touchstart', onTouchStart, { passive: true })
//     rail.addEventListener('touchmove', onTouchMove, { passive: true })
//     rail.addEventListener('touchend', onTouchEnd)

//     const onMouseDown = (e: MouseEvent) => {
//       setIsDragging(true)
//       setStartX(e.clientX)
//     }
//     const onMouseMove = (e: MouseEvent) => {
//       if (!isDragging) return
//       setCurrentX(e.clientX)
//     }
//     const onMouseUp = () => {
//       if (!isDragging) return
//       const delta = currentX - startX

//       if (delta > 60 && centerIdx > 0) {
//         const prev = centerIdx - 1
//         setCenterIdx(prev)
//         scrollToCenter(prev)
//       } else if (delta < -60 && centerIdx < items.length - 1) {
//         const next = centerIdx + 1
//         setCenterIdx(next)
//         scrollToCenter(next)
//       }

//       setIsDragging(false)
//       setStartX(0)
//       setCurrentX(0)
//     }

//     rail.addEventListener('mousedown', onMouseDown)
//     rail.addEventListener('mousemove', onMouseMove)
//     rail.addEventListener('mouseup', onMouseUp)
//     rail.addEventListener('mouseleave', onMouseUp)

//     return () => {
//       rail.removeEventListener('touchstart', onTouchStart)
//       rail.removeEventListener('touchmove', onTouchMove)
//       rail.removeEventListener('touchend', onTouchEnd)
//       rail.removeEventListener('mousedown', onMouseDown)
//       rail.removeEventListener('mousemove', onMouseMove)
//       rail.removeEventListener('mouseup', onMouseUp)
//       rail.removeEventListener('mouseleave', onMouseUp)
//     }
//   }, [isDragging, startX, currentX, centerIdx, items, scrollToCenter])

//   // 스크롤로 가운데 아이 탐지 → 인덱스만 변경
//   useEffect(() => {
//     const rail = railRef.current
//     if (!rail) return

//     const onScrollStop = () => {
//       const children = Array.from(
//         rail.querySelectorAll('[data-idx]'),
//       ) as HTMLElement[]
//       if (children.length === 0) return

//       let closestIdx = 0
//       let minDiff = Infinity
//       const railRect = rail.getBoundingClientRect()
//       const railCenterX = railRect.left + rail.clientWidth / 2

//       children.forEach((el) => {
//         const rect = el.getBoundingClientRect()
//         const diff = Math.abs(rect.left + rect.width / 2 - railCenterX)
//         if (diff < minDiff) {
//           minDiff = diff
//           closestIdx = parseInt(el.dataset.idx ?? '0', 10)
//         }
//       })

//       if (closestIdx !== centerIdx) {
//         setCenterIdx(closestIdx)
//       }
//     }

//     let timeout: number | null = null
//     const handleScroll = () => {
//       if (timeout) clearTimeout(timeout)
//       timeout = window.setTimeout(onScrollStop, 100)
//     }

//     rail.addEventListener('scroll', handleScroll)
//     return () => rail.removeEventListener('scroll', handleScroll)
//   }, [items, centerIdx])

//   return (
//     <div className="w-full text-[#2c2620]">
//       <div className="mx-auto max-w-[960px] pt-4 pb-5">
//         <div className="sticky top-0 z-5 bg-[#F5F3F0]/95 backdrop-blur-[2px] border-b border-[#C8B7A6]">
//           <div className="w-full flex items-center justify-center">
//             <Tabs value={active} onChange={handleTabChange} />
//           </div>
//         </div>

//         {loading && (
//           <div className="mt-8 text-center text-sm text-[#8d837a]">
//             목록을 불러오는 중입니다...
//           </div>
//         )}
//         {error && (
//           <div className="mt-8 text-center text-sm text-red-700">{error}</div>
//         )}

//         {!loading && !error && (
//           <div
//             ref={railRef}
//             className={`
//               ${items.length > 1 ? 'overflow-x-auto scroll-smooth' : 'overflow-hidden'}
//               snap-x snap-mandatory [scrollbar-width:none]
//             `}
//           >
//             <div className="flex items-stretch">
//               {items.length > 0 && (
//                 <div
//                   aria-hidden
//                   className="snap-center shrink-0 basis-1/3 px-2 pointer-events-none"
//                 />
//               )}

//               {items.map((w, i) => {
//                 const isCenter = i === centerIdx
//                 return (
//                   <div
//                     key={w.id}
//                     data-idx={i}
//                     className={`
//                       snap-center shrink-0 basis-1/3 px-0.5
//                       transition-transform duration-300
//                       ${isCenter ? 'scale-100' : 'scale-90'}
//                     `}
//                   >
//                     <FrameCard
//                       image={w.imageUrl}
//                       size="lg"
//                       focused={isCenter}
//                       onClick={() =>
//                         navigate(`/works/${active.toLowerCase()}/${w.id}`)
//                       }
//                     />
//                   </div>
//                 )
//               })}

//               {items.length > 0 && (
//                 <div
//                   aria-hidden
//                   className="snap-center shrink-0 basis-1/3 px-2 pointer-events-none"
//                 />
//               )}
//             </div>
//           </div>
//         )}

//         {selected && (
//           <WorkExplan
//             title={selected.projectName}
//             subtitle={selected.shortDescription}
//             teamName={selected.teamName}
//             members={(selected.developers ?? []).map((d) => d.name)}
//             description={selected.midDescription}
//           />
//         )}
//       </div>
//     </div>
//   )
// }

import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import Tabs, { type CategoryUI } from '../components/works/Tabs'
import FrameCard from '../components/works/FrameCard'
import WorkExplan from '../components/works/WorkExplan'
import { fetchWorkList, type WorkItem } from '../apis/works'

const VALID_TABS: CategoryUI[] = ['ALL', 'WEB&APP', 'AI', 'IOT', 'GAME']
const isValidTab = (t: string | null): t is CategoryUI =>
  !!t && VALID_TABS.includes(t as CategoryUI)

export default function WorksPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const getInitialTab = () =>
    isValidTab(searchParams.get('tab'))
      ? (searchParams.get('tab') as CategoryUI)
      : 'ALL'

  const [active, setActive] = useState<CategoryUI>(getInitialTab)
  const [items, setItems] = useState<WorkItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [centerIdx, setCenterIdx] = useState(0)
  const railRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()
  const location = useLocation() as { state?: { fromIdx?: number } }

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)

  // 탭 클릭으로 인한 전환 여부(복원 무시용)
  const tabResetRef = useRef(false)

  const koCollator = new Intl.Collator('ko', {
    sensitivity: 'base',
    numeric: true,
  })
  const enCollator = new Intl.Collator('en', {
    sensitivity: 'base',
    numeric: true,
  })

  function getSortGroup(name: string): number {
    const key = (name ?? '').trim().replace(/^[^A-Za-z0-9\uAC00-\uD7A3]+/, '')
    const ch = key.charAt(0)
    if (/^[\uAC00-\uD7A3]$/.test(ch)) return 0 // 한글
    if (/^[A-Za-z]$/.test(ch)) return 1 // 영어
    return 2 // 그 외(숫자/기호/기타)
  }

  function compareProjectName(a: WorkItem, b: WorkItem): number {
    const ga = getSortGroup(a.projectName)
    const gb = getSortGroup(b.projectName)
    if (ga !== gb) return ga - gb
    if (ga === 0) return koCollator.compare(a.projectName, b.projectName) // 한글
    if (ga === 1) return enCollator.compare(a.projectName, b.projectName) // 영어
    return koCollator.compare(a.projectName, b.projectName)
  }

  // URL ?tab= 변화에 동기화
  useEffect(() => {
    const q = searchParams.get('tab')
    const next = isValidTab(q) ? (q as CategoryUI) : 'ALL'
    setActive(next)
  }, [searchParams])

  // 탭 변경 시: 항상 실행되게 하고, 복원 무시 플래그 세움
  const handleTabChange = useCallback(
    (next: CategoryUI) => {
      // 같은 탭을 다시 눌러도 리셋되도록 처리
      tabResetRef.current = true
      // 해당 탭의 세션 복원값도 제거(완전 초기화 의도)
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem(`worksIdx:${next}`)
      }

      setActive(next)
      setSearchParams((prev) => {
        const sp = new URLSearchParams(prev)
        sp.set('tab', next)
        return sp
      })
    },
    [setSearchParams],
  )

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

  // 목록 로드 + 인덱스 복원(단, 탭 클릭 시에는 무조건 0부터)
  useEffect(() => {
    const ac = new AbortController()
    setLoading(true)
    setError(null)

    fetchWorkList(active, ac.signal)
      .then((list) => {
        const sorted = [...list].sort(compareProjectName)
        setItems(sorted)

        let initialIdx: number | undefined

        if (tabResetRef.current) {
          // 탭 클릭에 의한 전환: 항상 0부터 시작
          initialIdx = 0
          tabResetRef.current = false
        } else {
          // 상세→리스트 복원(state) 우선, 없으면 세션 복원
          initialIdx = location.state?.fromIdx
          if (initialIdx == null && typeof sessionStorage !== 'undefined') {
            const saved = sessionStorage.getItem(`worksIdx:${active}`)
            if (saved != null) {
              const n = Number(saved)
              if (!Number.isNaN(n)) initialIdx = n
            }
          }
        }

        const idx = Math.max(0, Math.min(initialIdx ?? 0, sorted.length - 1))
        setCenterIdx(idx)
        requestAnimationFrame(() => scrollToCenter(idx))
      })
      .catch((e) => {
        if (!(e instanceof DOMException && e.name === 'AbortError')) {
          setError((e as Error).message ?? '불러오기 실패')
          setItems([])
          setCenterIdx(0)
        }
      })
      .finally(() => setLoading(false))

    return () => ac.abort()
    // location.state는 의도적으로 의존성 제외(탭 바뀔 때만 재평가)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, scrollToCenter])

  // 드래그 내비게이션
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

      if (delta > 60 && centerIdx > 0) {
        const prev = centerIdx - 1
        setCenterIdx(prev)
        scrollToCenter(prev)
      } else if (delta < -60 && centerIdx < items.length - 1) {
        const next = centerIdx + 1
        setCenterIdx(next)
        scrollToCenter(next)
      }

      setIsDragging(false)
      setStartX(0)
      setCurrentX(0)
    }

    rail.addEventListener('touchstart', onTouchStart, { passive: true })
    rail.addEventListener('touchmove', onTouchMove, { passive: true })
    rail.addEventListener('touchend', onTouchEnd)

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
        scrollToCenter(prev)
      } else if (delta < -60 && centerIdx < items.length - 1) {
        const next = centerIdx + 1
        setCenterIdx(next)
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

  // 가운데 카드 계산(스크롤 멈춤 감지)
  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const onScrollStop = () => {
      const children = Array.from(
        rail.querySelectorAll('[data-idx]'),
      ) as HTMLElement[]
      if (children.length === 0) return

      let closestIdx = 0
      let minDiff = Infinity
      const railRect = rail.getBoundingClientRect()
      const railCenterX = railRect.left + rail.clientWidth / 2

      children.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const diff = Math.abs(rect.left + rect.width / 2 - railCenterX)
        if (diff < minDiff) {
          minDiff = diff
          closestIdx = parseInt(el.dataset.idx ?? '0', 10)
        }
      })

      if (closestIdx !== centerIdx) {
        setCenterIdx(closestIdx)
      }
    }

    let timeout: number | null = null
    const handleScroll = () => {
      if (timeout) clearTimeout(timeout)
      timeout = window.setTimeout(onScrollStop, 100)
    }

    rail.addEventListener('scroll', handleScroll)
    return () => rail.removeEventListener('scroll', handleScroll)
  }, [items, centerIdx])

  const selected = items[centerIdx] ?? null

  return (
    <div className="w-full text-[#2c2620]">
      <div className="mx-auto max-w-[960px] pt-4 pb-5">
        <div className="sticky top-0 z-5 bg-[#F5F3F0]/95 backdrop-blur-[2px] border-b border-[#C8B7A6]">
          <div className="w-full flex items-center justify-center">
            <Tabs value={active} onChange={handleTabChange} />
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
              snap-x snap-mandatory [scrollbar-width:none]
            `}
          >
            <div className="flex items-stretch">
              {items.length > 0 && (
                <div
                  aria-hidden
                  className="snap-center shrink-0 basis-1/5 px-2 pointer-events-none"
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
                      index={i} // ← 이 한 줄로 1,2,3 반복 완성
                      onClick={() =>
                        navigate(`/works/${active.toLowerCase()}/${w.id}`, {
                          state: { fromIdx: i },
                        })
                      }
                    />
                  </div>
                )
              })}

              {items.length > 0 && (
                <div
                  aria-hidden
                  className="snap-center shrink-0 basis-1/5 px-2 pointer-events-none"
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
