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

import { useEffect, useMemo, useRef, useState } from 'react'
import Tabs from '../components/works/Tabs'
import FrameCard from '../components/works/FrameCard'
import WorkExplan from '../components/works/WorkExplan'
import { fetchWorkList, type Category, type WorkItem } from '../apis/works'

export default function WorksPage() {
  const [active, setActive] = useState<Category>('ALL')
  const [q] = useState('')
  const [items, setItems] = useState<WorkItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<WorkItem | null>(null)

  // 가운데 강조 인덱스 (선택사항: 없애도 동작함)
  const [centerIdx, setCenterIdx] = useState(0)
  const railRef = useRef<HTMLDivElement | null>(null)

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
        if ((e as any).name !== 'AbortError')
          setError((e as Error).message ?? '불러오기 실패')
        setItems([])
        setSelected(null)
      })
      .finally(() => setLoading(false))

    return () => ac.abort()
  }, [active])

  const filtered = useMemo(() => {
    const k = q.trim()
    if (!k) return items
    return items.filter((w) => {
      const devNames = (w.developers ?? []).map((d) => d.name).join(' ')
      return (
        w.projectName.includes(k) ||
        w.teamName.includes(k) ||
        w.shortDescription.includes(k) ||
        w.midDescription.includes(k) ||
        devNames.includes(k)
      )
    })
  }, [items, q])

  // 가운데 카드 강조 계산(옵션)
  useEffect(() => {
    const el = railRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const railRect = el.getBoundingClientRect()
        const centerX = railRect.left + railRect.width / 2
        let best = 0
        let bestDist = Infinity
        const cards = Array.from(
          el.querySelectorAll<HTMLDivElement>('[data-idx]'),
        )
        cards.forEach((c) => {
          const idx = Number(c.dataset.idx)
          const r = c.getBoundingClientRect()
          const cx = r.left + r.width / 2
          const d = Math.abs(cx - centerX)
          if (d < bestDist) {
            bestDist = d
            best = idx
          }
        })
        setCenterIdx(best)
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [filtered.length])

  const members = (w: WorkItem | null) =>
    (w?.developers ?? []).map((d) => d.name).slice(0, 10)

  return (
    <div className="w-full min-h-screen text-[#2c2620]">
      <div className="mx-auto max-w-[960px] px-4 pt-4 pb-16">
        <div className="flex items-center">
          <Tabs value={active} onChange={setActive} />
          {/* 검색 입력이 필요하면 여기에 SearchBar를 다시 배치 */}
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
          <div ref={railRef} className="mt-6 overflow-x-auto">
            <div className="flex gap-6 px-1 pb-4 snap-x">
              {filtered.map((w, i) => (
                <div key={w.id} data-idx={i}>
                  <FrameCard
                    image={w.imageUrl}
                    size={i === centerIdx ? 'lg' : 'md'}
                    onClick={() => {
                      setSelected(w)
                      setCenterIdx(i)
                    }}
                  />
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="py-10 text-sm text-[#8d837a]">
                  검색 결과가 없습니다.
                </div>
              )}
            </div>
          </div>
        )}

        {selected && (
          <WorkExplan
            title={selected.projectName}
            subtitle={selected.shortDescription}
            teamName={selected.teamName}
            members={members(selected)}
            description={selected.midDescription}
          />
        )}
      </div>
    </div>
  )
}
