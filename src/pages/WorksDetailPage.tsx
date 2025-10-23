import { useEffect, useMemo, useState, useCallback } from 'react'
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

  // 이미지 슬라이드 인덱스
  const [imgIdx, setImgIdx] = useState(0)

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const openLightbox = useCallback(() => setLightboxOpen(true), [])
  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  const backToList = useCallback(() => {
    navigate(`/works?tab=${encodeURIComponent(category)}`)
  }, [navigate, category])

  useEffect(() => {
    setImgIdx(0)
  }, [category, workId])

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

  const goPrev = useCallback(() => {
    if (!data?.prev) return
    navigate(`/works/${params.category}/${data.prev}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [data?.prev, navigate, params.category])

  const goNext = useCallback(() => {
    if (!data?.next) return
    navigate(`/works/${params.category}/${data.next}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [data?.next, navigate, params.category])

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
    <div className="w-full pb-3">
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
          // IOT, GAME이면 항상 숨김
          category === 'IOT' || category === 'GAME' ? undefined : (
            <DetailNav
              onPrev={goPrev}
              onNext={goNext}
              prevDisabled={!data.prev}
              nextDisabled={!data.next}
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
