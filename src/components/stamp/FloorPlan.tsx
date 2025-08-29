import StudioCard from './StudioCard'
import StudioLayout from './StudioLayout'

const FloorPlan = () => {
  const lists = [
    {
      id: 1,
      studio: 'Studio 1',
      teams: [
        {
          id: 1,
          projectName: '부모클래스',
          shortDescription: '부모 자녀 관계 향상 서비스',
          members: ['고윤아', '박세연', '이수아', '조남윤'],
        },
        {
          id: 2,
          projectName: '팜트래커(PharmTracker)',
          shortDescription: '노인, 중장년층을 위한 의약품 정보 제공 서비스',
          members: ['고윤아', '박세연', '이수아', '조남윤'],
        },
        {
          id: 3,
          projectName: '혈당히어로',
          shortDescription:
            '객체 검출 모델 기반 당뇨병 환자 레시피 추천 서비스',
          members: ['고윤아', '박세연', '이수아', '조남윤'],
        },
      ],
    },
    {
      id: 2,
      studio: 'Studio 2',
      teams: [
        {
          id: 1,
          projectName: '부모클래스',
          shortDescription: '부모 자녀 관계 향상 서비스',
          members: ['고윤아', '박세연', '이수아', '조남윤'],
        },
        {
          id: 2,
          projectName: '팜트래커(PharmTracker)',
          shortDescription: '노인, 중장년층을 위한 의약품 정보 제공 서비스',
          members: ['고윤아', '박세연', '이수아', '조남윤'],
        },
        {
          id: 3,
          projectName: '혈당히어로',
          shortDescription:
            '객체 검출 모델 기반 당뇨병 환자 레시피 추천 서비스',
          members: ['고윤아', '박세연', '이수아', '조남윤'],
        },
      ],
    },
  ]
  return (
    <>
      <div className="pt-[20px] px-[20px]">
        <h1 className="text-[#8F7860] text-[22px] font-medium leading-[32px]">
          Exhibition Floor Plan
          <span className="ml-[8px] text-[#8F7860] text-[15px] font-medium leading-[24px]">
            부스 배치도
          </span>
        </h1>
      </div>

      <StudioLayout />

      <div className="mb-[36px]">
        {lists.map((list) => (
          <StudioCard key={list.id} studio={list.studio} teams={list.teams} />
        ))}
      </div>
    </>
  )
}

export default FloorPlan
