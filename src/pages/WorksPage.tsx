// import { useEffect, useMemo, useRef, useState } from 'react'
// import Tabs from '../components/works/Tabs'
// import FrameCard from '../components/works/FrameCard'
// import WorkExplan from '../components/works/WorkExplan'
// import { fetchWorkList, type Category, type WorkItem } from '../apis/works'

// export default function WorksPage() {
//   const [active, setActive] = useState<Category>('ALL')
//   const [q, setQ] = useState('')
//   const [items, setItems] = useState<WorkItem[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [selected, setSelected] = useState<WorkItem | null>(null)

//   // 가운데 강조용
//   const [centerIdx, setCenterIdx] = useState(0)
//   const railRef = useRef<HTMLDivElement | null>(null)

//   // 카테고리 변경 시 백엔드 호출
//   useEffect(() => {
//     const ac = new AbortController()
//     setLoading(true)
//     setError(null)

//     fetchWorkList(active, ac.signal)
//       .then((list) => {
//         setItems(list)
//         setSelected(list[0] ?? null)
//         setCenterIdx(0)
//       })
//       .catch((e) => {
//         if ((e as any).name !== 'AbortError')
//           setError((e as Error).message ?? '불러오기 실패')
//         setItems([])
//         setSelected(null)
//       })
//       .finally(() => setLoading(false))

//     return () => ac.abort()
//   }, [active])

//   // 검색 필터(클라)
//   const filtered = useMemo(() => {
//     const k = q.trim()
//     if (!k) return items
//     return items.filter(
//       (w) =>
//         w.projectName.includes(k) ||
//         w.teamName.includes(k) ||
//         w.shortDescription.includes(k) ||
//         w.midDescription.includes(k),
//     )
//   }, [items, q])

//   // 스크롤 시 가운데(컨테이너 중앙 기준)에 가장 가까운 카드 인덱스를 계산
//   useEffect(() => {
//     const el = railRef.current
//     if (!el) return

//     let raf = 0
//     const onScroll = () => {
//       cancelAnimationFrame(raf)
//       raf = requestAnimationFrame(() => {
//         const railRect = el.getBoundingClientRect()
//         const railCenterX = railRect.left + railRect.width / 2

//         let bestIdx = 0
//         let bestDist = Number.POSITIVE_INFINITY

//         const cards = Array.from(
//           el.querySelectorAll<HTMLButtonElement>('button[data-idx]'),
//         )
//         cards.forEach((btn) => {
//           const idx = Number(btn.dataset.idx)
//           const r = btn.getBoundingClientRect()
//           const cardCenterX = r.left + r.width / 2
//           const dist = Math.abs(cardCenterX - railCenterX)
//           if (dist < bestDist) {
//             bestDist = dist
//             bestIdx = idx
//           }
//         })
//         setCenterIdx(bestIdx)
//       })
//     }

//     el.addEventListener('scroll', onScroll, { passive: true })
//     // 처음에도 한 번 계산
//     onScroll()
//     return () => {
//       el.removeEventListener('scroll', onScroll)
//       cancelAnimationFrame(raf)
//     }
//   }, [filtered.length])

//   return (
//     <div className="w-full min-h-screen bg-[#f7f2eb] text-[#2c2620]">
//       <div className="mx-auto max-w-[960px] px-4 pt-4 pb-16">
//         {/* 탭 */}
//         <div className="flex items-center">
//           <Tabs value={active} onChange={setActive} />
//         </div>

//         {/* (필요 시) 검색바 자리 */}
//         {/* <div className="mt-3 flex justify-center">
//           <div className="w-full max-w-[360px]">
//             <SearchBar value={q} onChange={setQ} />
//           </div>
//         </div> */}

//         {/* 상태 */}
//         {loading && (
//           <div className="mt-8 text-center text-sm text-[#8d837a]">
//             목록을 불러오는 중입니다...
//           </div>
//         )}
//         {error && (
//           <div className="mt-8 text-center text-sm text-red-700">{error}</div>
//         )}

//         {/* 카드 캐러셀 */}
//         {!loading && !error && (
//           <div ref={railRef} className="mt-6 overflow-x-auto">
//             <div className="flex gap-6 px-1 pb-4 snap-x">
//               {filtered.map((w, i) => (
//                 <div key={w.id} data-idx={i}>
//                   <FrameCard
//                     image={w.imageUrl}
//                     size={i === centerIdx ? 'lg' : 'md'} // ✅ 가운데만 크게
//                     onClick={() => {
//                       setSelected(w)
//                       setCenterIdx(i)
//                     }}
//                   />
//                 </div>
//               ))}
//               {filtered.length === 0 && (
//                 <div className="py-10 text-sm text-[#8d837a]">
//                   검색 결과가 없습니다.
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* 상세 영역 */}
//         {selected && (
//           <WorkExplan
//             title={selected.projectName}
//             subtitle={selected.shortDescription}
//             teamName={selected.teamName}
//             members={[]}
//             description={selected.midDescription}
//           />
//         )}
//       </div>
//     </div>
//   )
// }

// import { useCallback, useEffect, useRef, useState } from 'react'
// import Tabs, { type CategoryUI } from '../components/works/Tabs'
// import FrameCard from '../components/works/FrameCard'
// import WorkExplan from '../components/works/WorkExplan'
// import { fetchWorkList, type WorkItem } from '../apis/works'

// export default function WorksPage() {
//   const [active, setActive] = useState<CategoryUI>('ALL')
//   const [items, setItems] = useState<WorkItem[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [selected, setSelected] = useState<WorkItem | null>(null)

//   // 가운데 카드 인덱스
//   const [centerIdx, setCenterIdx] = useState(0)
//   const railRef = useRef<HTMLDivElement | null>(null)

//   // 데이터 로드
//   useEffect(() => {
//     const ac = new AbortController()
//     setLoading(true)
//     setError(null)

//     fetchWorkList(active, ac.signal)
//       .then((list) => {
//         setItems(list)
//         setSelected(list[0] ?? null)
//         setCenterIdx(0)
//       })
//       .catch((e) => {
//         if ((e as any).name !== 'AbortError')
//           setError((e as Error).message ?? '불러오기 실패')
//         setItems([])
//         setSelected(null)
//       })
//       .finally(() => setLoading(false))

//     return () => ac.abort()
//   }, [active])

//   // 가운데로 스크롤
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

//   // 목록이 바뀌면 0번으로 맞추고 스크롤
//   useEffect(() => {
//     if (items.length > 0) {
//       setCenterIdx(0)
//       setSelected(items[0])
//       setTimeout(() => scrollToCenter(0), 0)
//     }
//   }, [items, scrollToCenter])

//   // 자동 포커스 순환(3초)
//   useEffect(() => {
//     if (items.length <= 1) return
//     const id = setInterval(() => {
//       setCenterIdx((prev) => {
//         const next = (prev + 1) % items.length
//         scrollToCenter(next)
//         setSelected(items[next])
//         return next
//       })
//     }, 3000)
//     return () => clearInterval(id)
//   }, [items.length, scrollToCenter])

//   return (
//     <div className="w-full min-h-screen text-[#2c2620]">
//       <div className="mx-auto max-w-[960px] px-4 pt-4 pb-16">
//         {/* 탭 */}
//         <div className="w-full flex items-center justify-center">
//           <Tabs value={active} onChange={setActive} />
//         </div>

//         {/* 상태 */}
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
//             className="
//               mt-6 overflow-x-auto scroll-smooth
//               snap-x snap-mandatory
//               [scrollbar-width:none]
//             "
//           >
//             <div className="flex items-stretch">
//               {items.map((w, i) => {
//                 const isCenter = i === centerIdx
//                 return (
//                   <div
//                     key={w.id}
//                     data-idx={i}
//                     className={`
//                       snap-center shrink-0 basis-1/3 px-2
//                       transition-transform duration-300
//                       ${isCenter ? 'scale-100' : 'scale-90'}
//                     `}
//                   >
//                     {/* 카드 자체 사이즈는 동일하게 두고, wrapper scale로 크기 차 연출 */}
//                     <FrameCard
//                       image={w.imageUrl}
//                       size="lg"
//                       onClick={() => {
//                         setCenterIdx(i)
//                         setSelected(w)
//                         scrollToCenter(i)
//                       }}
//                     />
//                   </div>
//                 )
//               })}
//               {items.length === 0 && (
//                 <div className="py-10 text-sm text-[#8d837a]">
//                   작품이 없습니다.
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* 상세 */}
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
import Tabs, { type CategoryUI } from '../components/works/Tabs'
import FrameCard from '../components/works/FrameCard'
import WorkExplan from '../components/works/WorkExplan'
import { fetchWorkList, type WorkItem } from '../apis/works'

export default function WorksPage() {
  const [active, setActive] = useState<CategoryUI>('ALL')
  const [items, setItems] = useState<WorkItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<WorkItem | null>(null)

  // 가운데 카드 인덱스
  const [centerIdx, setCenterIdx] = useState(0)
  const railRef = useRef<HTMLDivElement | null>(null)

  // 데이터 로드
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

  // 가운데로 스크롤
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

  // 목록이 바뀌면 0번으로 맞추고 스크롤
  useEffect(() => {
    if (items.length > 0) {
      setCenterIdx(0)
      setSelected(items[0])
      setTimeout(() => scrollToCenter(0), 0)
    }
  }, [items, scrollToCenter])

  // 자동 포커스 순환(3초)
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

  return (
    <div className="w-full min-h-screen text-[#2c2620]">
      <div className="mx-auto max-w-[960px] pt-4 pb-5">
        {/* 탭 */}
        <div className="w-full flex items-center justify-center">
          <Tabs value={active} onChange={setActive} />
        </div>

        {/* 상태 */}
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
            className="
              mt-3 overflow-x-auto scroll-smooth
              snap-x snap-mandatory
              [scrollbar-width:none]
            "
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
                    {/* 카드 자체 사이즈는 동일하게 두고, wrapper scale로 크기 차 연출 */}
                    <FrameCard
                      image={w.imageUrl}
                      size="lg"
                      focused={isCenter}
                      onClick={() => {
                        setCenterIdx(i)
                        setSelected(w)
                        scrollToCenter(i)
                      }}
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

              {items.length === 0 && (
                <div className="py-10 text-sm text-[#8d837a]">
                  작품이 없습니다.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 상세 */}
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
