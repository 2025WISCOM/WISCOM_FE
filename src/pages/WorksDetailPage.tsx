// import DetailNav from '../components/workdetail/DetailNav'
// import DetailSection from '../components/workdetail/DetailSection'
// import MetaList from '../components/workdetail/MetaList'
// import WorkDetail from '../components/workdetail/WorkDetail'
// // import FrameCard from '../components/works/FrameCard'
// import PreviewImage from '../components/workdetail/PreviewImage'

// const mockSelected = {
//   id: 1,
//   projectName: '자자자',
//   shortDescription: '고립 은둔형 청년 지원 서비스',
//   teamName: '아자아자화이팅',
//   imageUrl: '/sample.png',
//   developers: [
//     { name: '박효진', role: 'Plan, Design, Front-End' },
//     { name: '이한별', role: 'Front-End' },
//     { name: '김미주', role: 'Front-End' },
//     { name: '김민주', role: 'Front-End' },
//     { name: '김윤서', role: 'Front-End' },
//   ],
//   midDescription: `내 서비스의 안전하고 끊김없는 배포를 위해
// AWS Cloudformation을 활용한
// IaC 형태의 무중단 자동 배포 플랫폼 APOLLO

// Apollo 플랫폼은
// application의 downtime이 zero인 이중화 배포를 통해
// 무중단 배포를 실현시켜주는 플랫폼입니다.

// 코로나 19 이후 재택근무 및 데이터 사용량의 증가로 클라우드 서비스가 주목받고 있고,
// 2022년까지 70% 이상의 기업이 클라우드 서비스를 도입 세션에서 언급했습니다.
// 하지만 빠른 주기로 배포되는 서비스에 맞춰 무중단 배포는 중요성이 커지고 있으며,
// Apollo 플랫폼은 이러한 상황에서 CI/CD 자동화와 함께 무중단 배포를 지원합니다.`,
// }

// const WorksDetailPage = () => {
//   const handlePrev = () => {
//     console.log('Prev image')
//   }

//   const handleNext = () => {
//     console.log('Next image')
//   }

//   return (
//     <div className="w-full min-h-screen py-3">
//       <WorkDetail
//         preview={
//           <div className="px-4">
//             <PreviewImage
//               src={mockSelected.imageUrl}
//               alt={mockSelected.projectName}
//               ratio="16/9"
//               rounded="rounded-2xl"
//               onPrev={handlePrev}
//               onNext={handleNext}
//               prevDisabled={false}
//               nextDisabled={false}
//             />
//           </div>
//         }
//         title={mockSelected.projectName}
//         subtitle={mockSelected.shortDescription}
//         meta={
//           <MetaList
//             rows={[
//               { label: '팀 명', value: mockSelected.teamName },
//               ...mockSelected.developers.map((d) => ({
//                 label: d.name,
//                 value: d.role,
//               })),
//             ]}
//           />
//         }
//         body={<DetailSection>{mockSelected.midDescription}</DetailSection>}
//         nav={
//           <DetailNav
//             onPrev={() => console.log('Prev')}
//             onNext={() => console.log('Next')}
//             prevDisabled={false}
//             nextDisabled={false}
//           />
//         }
//       />
//     </div>
//   )
// }

// export default WorksDetailPage

// pages/WorksDetailPage.tsx
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import DetailSection from '../components/workdetail/DetailSection'
import MetaList from '../components/workdetail/MetaList'
import WorkDetail from '../components/workdetail/WorkDetail'
import PreviewImage from '../components/workdetail/PreviewImage'
import type { CategoryUI } from '../components/works/Tabs'
import {
  fetchWorkDetail,
  type WorkDetail as WorkDetailType,
} from '../apis/works'

/** URL 슬러그 → UI 카테고리로 변환 */
function slugToCategoryUI(slug: string | undefined): CategoryUI {
  if (!slug) return 'ALL'
  // WorksPage에서 toLowerCase()로 만들었던 경로 기준: 'web&app'만 예외 처리
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

  const [data, setData] = useState<WorkDetailType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const firstImage = data.imageUrls?.[0]?.url
  const longBody = data.description || data.midDescription || ''

  return (
    <div className="w-full min-h-screen py-3">
      <WorkDetail
        // 프리뷰: Prev/Next 컨트롤 일단 제거(핸들러 미전달)
        preview={
          firstImage ? (
            <div className="px-4">
              <PreviewImage
                src={firstImage}
                alt={data.projectName}
                ratio="16/9"
                rounded="rounded-2xl"
              />
            </div>
          ) : undefined
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
        // 네비(Prev/Next) 제외
      />
    </div>
  )
}
