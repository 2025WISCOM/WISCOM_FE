import DetailNav from '../components/workdetail/DetailNav'
import DetailSection from '../components/workdetail/DetailSection'
import MetaList from '../components/workdetail/MetaList'
import WorkDetail from '../components/workdetail/WorkDetail'
// import FrameCard from '../components/works/FrameCard'
import PreviewImage from '../components/workdetail/PreviewImage'

const mockSelected = {
  id: 1,
  projectName: '자자자',
  shortDescription: '고립 은둔형 청년 지원 서비스',
  teamName: '아자아자화이팅',
  imageUrl: '/sample.png',
  developers: [
    { name: '박효진', role: 'Plan, Design, Front-End' },
    { name: '이한별', role: 'Front-End' },
    { name: '김미주', role: 'Front-End' },
    { name: '김민주', role: 'Front-End' },
    { name: '김윤서', role: 'Front-End' },
  ],
  midDescription: `내 서비스의 안전하고 끊김없는 배포를 위해
AWS Cloudformation을 활용한
IaC 형태의 무중단 자동 배포 플랫폼 APOLLO

Apollo 플랫폼은
application의 downtime이 zero인 이중화 배포를 통해
무중단 배포를 실현시켜주는 플랫폼입니다.

코로나 19 이후 재택근무 및 데이터 사용량의 증가로 클라우드 서비스가 주목받고 있고,
2022년까지 70% 이상의 기업이 클라우드 서비스를 도입 세션에서 언급했습니다.
하지만 빠른 주기로 배포되는 서비스에 맞춰 무중단 배포는 중요성이 커지고 있으며,
Apollo 플랫폼은 이러한 상황에서 CI/CD 자동화와 함께 무중단 배포를 지원합니다.`,
}

const WorksDetailPage = () => {
  const handlePrev = () => {
    console.log('Prev image')
  }

  const handleNext = () => {
    console.log('Next image')
  }

  return (
    <div className="w-full min-h-screen py-3">
      <WorkDetail
        preview={
          <div className="px-4">
            <PreviewImage
              src={mockSelected.imageUrl}
              alt={mockSelected.projectName}
              ratio="16/9"
              rounded="rounded-2xl"
              onPrev={handlePrev}
              onNext={handleNext}
              prevDisabled={false}
              nextDisabled={false}
            />
          </div>
        }
        title={mockSelected.projectName}
        subtitle={mockSelected.shortDescription}
        meta={
          <MetaList
            rows={[
              { label: '팀 명', value: mockSelected.teamName },
              ...mockSelected.developers.map((d) => ({
                label: d.name,
                value: d.role,
              })),
            ]}
          />
        }
        body={<DetailSection>{mockSelected.midDescription}</DetailSection>}
        nav={
          <DetailNav
            onPrev={() => console.log('Prev')}
            onNext={() => console.log('Next')}
            prevDisabled={false}
            nextDisabled={false}
          />
        }
      />
    </div>
  )
}

export default WorksDetailPage
