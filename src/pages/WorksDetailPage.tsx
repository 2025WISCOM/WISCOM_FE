// import {
//   useEffect,
//   useMemo,
//   useState,
//   useCallback,
//   useLayoutEffect,
//   useRef,
// } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import DetailSection from '../components/workdetail/DetailSection'
// import MetaList from '../components/workdetail/MetaList'
// import WorkDetail from '../components/workdetail/WorkDetail'
// import PreviewImage from '../components/workdetail/PreviewImage'
// import DetailNav from '../components/workdetail/DetailNav'
// import type { CategoryUI } from '../components/works/Tabs'
// import {
//   fetchWorkDetail,
//   type WorkDetail as WorkDetailType,
// } from '../apis/works'
// import WorkHeader from '../components/workdetail/WorkHeader'
// import ImageLightbox from '../components/workdetail/ImageLightbox'

// function slugToCategoryUI(slug?: string): CategoryUI {
//   if (!slug) return 'ALL'
//   if (slug.toLowerCase() === 'web&app') return 'WEB&APP'
//   return slug.toUpperCase() as CategoryUI
// }

// export default function WorksDetailPage() {
//   const params = useParams<{ category: string; id: string }>()
//   const category = useMemo(
//     () => slugToCategoryUI(params.category),
//     [params.category],
//   )
//   const workId = Number(params.id)
//   const navigate = useNavigate()

//   const [data, setData] = useState<WorkDetailType | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   // 이미지 슬라이드 인덱스
//   const [imgIdx, setImgIdx] = useState(0)
//   const [lightboxOpen, setLightboxOpen] = useState(false)
//   const openLightbox = useCallback(() => setLightboxOpen(true), [])
//   const closeLightbox = useCallback(() => setLightboxOpen(false), [])

//   // 최상단 스크롤용 앵커
//   const topRef = useRef<HTMLDivElement | null>(null)

//   const backToList = useCallback(() => {
//     navigate(`/works?tab=${encodeURIComponent(category)}`)
//   }, [navigate, category])

//   useEffect(() => {
//     setImgIdx(0)
//   }, [category, workId])

//   useEffect(() => {
//     if (!workId || Number.isNaN(workId)) {
//       setError('잘못된 작품 ID입니다.')
//       return
//     }
//     const ac = new AbortController()
//     setLoading(true)
//     setError(null)

//     fetchWorkDetail(category, workId, ac.signal)
//       .then((d) => setData(d))
//       .catch((e) => {
//         if (!(e instanceof DOMException && e.name === 'AbortError')) {
//           setError((e as Error).message ?? '불러오기 실패')
//         }
//       })
//       .finally(() => setLoading(false))

//     return () => ac.abort()
//   }, [category, workId])

//   // 라우트 파라미터가 바뀔 때 즉시(페인트 전) 최상단으로
//   useLayoutEffect(() => {
//     if ('scrollRestoration' in history) {
//       try {
//         history.scrollRestoration = 'manual'
//       } catch {
//         console.log('')
//       }
//     }
//     window.scrollTo(0, 0)
//     // 스크롤 컨테이너가 window가 아니어도 안전하게 최상단으로
//     topRef.current?.scrollIntoView({ block: 'start', inline: 'nearest' })
//   }, [category, workId])

//   // 로딩이 끝난 뒤(이미지 로드로 레이아웃이 밀리는 경우 대비) 한 번 더 올리기
//   useEffect(() => {
//     if (!loading) {
//       requestAnimationFrame(() => {
//         window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
//         topRef.current?.scrollIntoView({ block: 'start', inline: 'nearest' })
//       })
//     }
//   }, [loading])

//   const goPrev = useCallback(() => {
//     if (!data?.prev) return
//     // 여기서는 스크롤 호출 제거. 라우트 변경 → 위의 이펙트들이 처리
//     navigate(`/works/${params.category}/${data.prev}`)
//   }, [data?.prev, navigate, params.category])

//   const goNext = useCallback(() => {
//     if (!data?.next) return
//     navigate(`/works/${params.category}/${data.next}`)
//   }, [data?.next, navigate, params.category])

//   if (loading) {
//     return (
//       <div className="w-full min-h-screen py-6 flex items-start justify-center text-[#6F5E4B]">
//         상세 정보를 불러오는 중입니다...
//       </div>
//     )
//   }
//   if (error) {
//     return (
//       <div className="w-full min-h-screen py-6 flex items-start justify-center text-red-700">
//         {error}
//       </div>
//     )
//   }
//   if (!data) return null

//   // 이미지 처리
//   const images = (data.imageUrls ?? []).map((i) => i.url)
//   const hasImages = images.length > 0
//   const canSlide = images.length > 1
//   const currentImage = hasImages ? images[imgIdx] : undefined

//   const imgPrev = () => setImgIdx((i) => Math.max(0, i - 1))
//   const imgNext = () => setImgIdx((i) => Math.min(images.length - 1, i + 1))

//   const longBody = data.description || data.midDescription || ''

//   return (
//     // key로 리마운트 보장 → 브라우저 스크롤 복원/잔여 오프셋 제거
//     <div key={`${category}-${workId}`} className="w-full pb-3">
//       {/* 최상단 앵커 */}
//       <div ref={topRef} aria-hidden />
//       <WorkHeader
//         instagramUrl={data.instagramUrl}
//         githubUrl={data.githubUrl}
//         onBack={backToList}
//       />
//       <WorkDetail
//         preview={
//           hasImages ? (
//             <div className="px-4">
//               <PreviewImage
//                 src={currentImage as string}
//                 alt={data.projectName}
//                 ratio="16/9"
//                 rounded="rounded-2xl"
//                 onOpen={openLightbox}
//                 {...(canSlide && {
//                   onPrev: imgPrev,
//                   onNext: imgNext,
//                   prevDisabled: imgIdx <= 0,
//                   nextDisabled: imgIdx >= images.length - 1,
//                 })}
//               />
//             </div>
//           ) : (
//             <div className="px-4">
//               <div className="h-[240px] w-full rounded-2xl bg-[#D9D9D9] border border-white/40 flex items-center justify-center text-[#7A6C5E]">
//                 이미지가 없습니다.
//               </div>
//             </div>
//           )
//         }
//         title={data.projectName}
//         subtitle={data.shortDescription}
//         meta={
//           <MetaList
//             rows={[
//               { label: '팀 명', value: data.teamName },
//               ...(data.developers || []).map((d) => ({
//                 label: d.name,
//                 value: d.role,
//               })),
//             ]}
//           />
//         }
//         body={<DetailSection>{longBody}</DetailSection>}
//         nav={
//           // IOT, GAME이면 항상 숨김
//           category === 'IOT' || category === 'GAME' ? undefined : (
//             <DetailNav
//               onPrev={goPrev}
//               onNext={goNext}
//               prevDisabled={!data.prev}
//               nextDisabled={!data.next}
//             />
//           )
//         }
//       />

//       {lightboxOpen && hasImages && (
//         <ImageLightbox
//           images={images}
//           index={imgIdx}
//           onClose={closeLightbox}
//           onPrev={() => setImgIdx((i) => Math.max(0, i - 1))}
//           onNext={() => setImgIdx((i) => Math.min(images.length - 1, i + 1))}
//         />
//       )}
//     </div>
//   )
// }

import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DetailSection from '../components/workdetail/DetailSection'
import MetaList from '../components/workdetail/MetaList'
import WorkDetail from '../components/workdetail/WorkDetail'
import PreviewImage from '../components/workdetail/PreviewImage'
import DetailNav from '../components/workdetail/DetailNav'
import type { CategoryUI } from '../components/works/Tabs'
import {
  fetchWorkDetail,
  type WorkDetail as WorkDetailType,
  fetchWorkList,
  type WorkItem,
} from '../apis/works'
import WorkHeader from '../components/workdetail/WorkHeader'
import ImageLightbox from '../components/workdetail/ImageLightbox'

function slugToCategoryUI(slug?: string): CategoryUI {
  if (!slug) return 'ALL'
  if (slug.toLowerCase() === 'web&app') return 'WEB&APP'
  return slug.toUpperCase() as CategoryUI
}

export default function WorksDetailPage() {
  const params = useParams<{ category: string; id: string }>()
  const category = useMemo(
    () => slugToCategoryUI(params.category),
    [params.category],
  )
  const workId = Number(params.id)
  const navigate = useNavigate()

  const [data, setData] = useState<WorkDetailType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 리스트(정렬용) 상태
  const [, setListLoading] = useState(false)
  const [items, setItems] = useState<WorkItem[]>([])

  // 이미지 슬라이드 인덱스
  const [imgIdx, setImgIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const openLightbox = useCallback(() => setLightboxOpen(true), [])
  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  // 최상단 스크롤용 앵커
  const topRef = useRef<HTMLDivElement | null>(null)

  const backToList = useCallback(() => {
    navigate(`/works?tab=${encodeURIComponent(category)}`)
  }, [navigate, category])

  useEffect(() => {
    setImgIdx(0)
  }, [category, workId])

  // 상세 데이터 로드
  useEffect(() => {
    if (!workId || Number.isNaN(workId)) {
      setError('잘못된 작품 ID입니다.')
      return
    }
    const ac = new AbortController()
    setLoading(true)
    setError(null)

    fetchWorkDetail(category, workId, ac.signal)
      .then((d) => setData(d))
      .catch((e) => {
        if (!(e instanceof DOMException && e.name === 'AbortError')) {
          setError((e as Error).message ?? '불러오기 실패')
        }
      })
      .finally(() => setLoading(false))

    return () => ac.abort()
  }, [category, workId])

  // 리스트 로드(정렬 기준 맞추기용)
  useEffect(() => {
    const ac = new AbortController()
    setListLoading(true)
    fetchWorkList(category, ac.signal)
      .then((list) => setItems(list))
      .catch(() => setItems([]))
      .finally(() => setListLoading(false))
    return () => ac.abort()
  }, [category])

  // 리스트 페이지와 동일한 정렬 기준
  const koCollator = useMemo(
    () => new Intl.Collator('ko', { sensitivity: 'base', numeric: true }),
    [],
  )
  const enCollator = useMemo(
    () => new Intl.Collator('en', { sensitivity: 'base', numeric: true }),
    [],
  )

  const getSortGroup = useCallback((name: string): number => {
    const key = (name ?? '').trim().replace(/^[^A-Za-z0-9\uAC00-\uD7A3]+/, '')
    const ch = key.charAt(0)
    if (/^[\uAC00-\uD7A3]$/.test(ch)) return 0 // 한글
    if (/^[A-Za-z]$/.test(ch)) return 1 // 영어
    return 2 // 기타
  }, [])

  const compareProjectName = useCallback(
    (a: WorkItem, b: WorkItem): number => {
      const ga = getSortGroup(a.projectName)
      const gb = getSortGroup(b.projectName)
      if (ga !== gb) return ga - gb
      if (ga === 0) return koCollator.compare(a.projectName, b.projectName)
      if (ga === 1) return enCollator.compare(a.projectName, b.projectName)
      return koCollator.compare(a.projectName, b.projectName)
    },
    [getSortGroup, koCollator, enCollator],
  )

  // 정렬된 목록과 현재 인덱스
  const sorted = useMemo(() => {
    if (!items?.length) return []
    return [...items].sort(compareProjectName)
  }, [items, compareProjectName])

  const currentIndex = useMemo(
    () => sorted.findIndex((w) => w.id === workId),
    [sorted, workId],
  )
  const prevId = currentIndex > 0 ? sorted[currentIndex - 1]?.id : undefined
  const nextId =
    currentIndex >= 0 && currentIndex < sorted.length - 1
      ? sorted[currentIndex + 1]?.id
      : undefined

  // 라우트 파라미터가 바뀔 때 즉시(페인트 전) 최상단으로
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      try {
        history.scrollRestoration = 'manual'
      } catch {
        console.log('')
      }
    }
    window.scrollTo(0, 0)
    topRef.current?.scrollIntoView({ block: 'start', inline: 'nearest' })
  }, [category, workId])

  // 로딩이 끝난 뒤(이미지/레이아웃 변화 대비) 한 번 더 올리기
  useEffect(() => {
    if (!loading) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        topRef.current?.scrollIntoView({ block: 'start', inline: 'nearest' })
      })
    }
  }, [loading])

  const goPrev = useCallback(() => {
    if (!prevId) return
    navigate(`/works/${params.category}/${prevId}`)
    // 스크롤은 위 이펙트에서 책임짐
  }, [navigate, params.category, prevId])

  const goNext = useCallback(() => {
    if (!nextId) return
    navigate(`/works/${params.category}/${nextId}`)
  }, [navigate, params.category, nextId])

  if (loading) {
    return (
      <div className="w-full min-h-screen py-6 flex items-start justify-center text-[#6F5E4B]">
        상세 정보를 불러오는 중입니다...
      </div>
    )
  }
  if (error) {
    return (
      <div className="w-full min-h-screen py-6 flex items-start justify-center text-red-700">
        {error}
      </div>
    )
  }
  if (!data) return null

  // 이미지 처리
  const images = (data.imageUrls ?? []).map((i) => i.url)
  const hasImages = images.length > 0
  const canSlide = images.length > 1
  const currentImage = hasImages ? images[imgIdx] : undefined

  const imgPrev = () => setImgIdx((i) => Math.max(0, i - 1))
  const imgNext = () => setImgIdx((i) => Math.min(images.length - 1, i + 1))

  const longBody = data.description || data.midDescription || ''

  return (
    <div key={`${category}-${workId}`} className="w-full pb-3">
      <div ref={topRef} aria-hidden />
      <WorkHeader
        instagramUrl={data.instagramUrl}
        githubUrl={data.githubUrl}
        onBack={backToList}
      />
      <WorkDetail
        preview={
          hasImages ? (
            <div className="px-4">
              <PreviewImage
                src={currentImage as string}
                alt={data.projectName}
                ratio="16/9"
                rounded="rounded-2xl"
                onOpen={openLightbox}
                {...(canSlide && {
                  onPrev: imgPrev,
                  onNext: imgNext,
                  prevDisabled: imgIdx <= 0,
                  nextDisabled: imgIdx >= images.length - 1,
                })}
              />
            </div>
          ) : (
            <div className="px-4">
              <div className="h-[240px] w-full rounded-2xl bg-[#D9D9D9] border border-white/40 flex items-center justify-center text-[#7A6C5E]">
                이미지가 없습니다.
              </div>
            </div>
          )
        }
        title={data.projectName}
        subtitle={data.shortDescription}
        meta={
          <MetaList
            rows={[
              { label: '팀 명', value: data.teamName },
              ...(data.developers || []).map((d) => ({
                label: d.name,
                value: d.role,
              })),
            ]}
          />
        }
        body={<DetailSection>{longBody}</DetailSection>}
        nav={
          // IOT, GAME은 숨김 유지
          category === 'IOT' || category === 'GAME' ? undefined : (
            <DetailNav
              onPrev={goPrev}
              onNext={goNext}
              prevDisabled={!prevId}
              nextDisabled={!nextId}
            />
          )
        }
      />

      {lightboxOpen && hasImages && (
        <ImageLightbox
          images={images}
          index={imgIdx}
          onClose={closeLightbox}
          onPrev={() => setImgIdx((i) => Math.max(0, i - 1))}
          onNext={() => setImgIdx((i) => Math.min(images.length - 1, i + 1))}
        />
      )}
    </div>
  )
}
