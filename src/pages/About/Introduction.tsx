import PosterSection from '../../components/about/intro/PosterSection'
import ExhibitionInfo from '../../components/about/intro/ExhibitionInfo'
import IntroductionText from '../../components/about/intro/IntroductionText'
import CommitteeInfo from '../../components/about/intro/CommitteeInfo'
import NavBar from '../../components/about/NavBar'

const Introduction = () => {
  return (
    <div className="font-[Pretendard] min-h-screen flex flex-col">
      <NavBar />
      <PosterSection />
      <IntroductionText />
      <ExhibitionInfo />
      <CommitteeInfo />
    </div>
  )
}

export default Introduction
