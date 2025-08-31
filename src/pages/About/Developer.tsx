import PosterSection from '../../components/about/intro/PosterSection'
import ExhibitionInfo from '../../components/about/intro/ExhibitionInfo'
import IntroductionText from '../../components/about/intro/IntroductionText'
import CommitteeInfo from '../../components/about/intro/CommitteeInfo'
import NavBar from '../../components/about/NavBar'

const Developer = () => {
  return (
    <div className="font-[Pretendard] min-h-screen flex flex-col">
      <NavBar />
      <PosterSection />
      <ExhibitionInfo />
      <IntroductionText />
      <CommitteeInfo />
    </div>
  )
}

export default Developer
