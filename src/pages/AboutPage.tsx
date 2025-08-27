import PosterSection from '../components/about/PosterSection'
import ExhibitionInfo from '../components/about/ExhibitionInfo'
import IntroductionText from '../components/about/IntroductionText'
import CommitteeInfo from '../components/about/CommitteeInfo'
import Footer from '../components/about/Footer'
import NavBar from '../components/about/NavBar'

const AboutPage = () => {
  return (
    <div className="font-[Pretendard] min-h-screen flex flex-col">
      <NavBar />
      <PosterSection />
      <ExhibitionInfo />
      <IntroductionText />
      <CommitteeInfo />
      <Footer />
    </div>
  )
}

export default AboutPage
