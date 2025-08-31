import Arch from '../assets/arch.png'
import Home from '../assets/home.png'

const MainPage = () => {
  return (
    <div className="relative w-full h-[min(700px,100vh)] overflow-hidden">
      {/* 배경 이미지 */}
      <img
        src={Home}
        alt="홈 배경"
        className="absolute bottom-0 w-[453px] h-auto"
      />
      <img
        src={Arch}
        alt="아치 배경"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[527px] h-auto max-w-none"
      />
    </div>
  )
}

export default MainPage
