import CongratulationInfo from '../../components/about/congratulation/CongratulationInfo'
import NavBar from '../../components/about/NavBar'
import Footer from '../../components/about/Footer'

const Congratulation = () => {
  return (
    <div className="font-[Pretendard] min-h-screen flex flex-col">
      <NavBar />
      <CongratulationInfo />
      <Footer />
    </div>
  )
}

export default Congratulation
