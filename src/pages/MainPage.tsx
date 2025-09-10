import { useEffect, useState } from 'react'
import Arch from '../assets/arch.png'
import Home from '../assets/home.png'

const MainPage = () => {
  const [arch, setArch] = useState(false)
  const [home, setHome] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setArch(true), 1000)
    const t2 = setTimeout(() => setHome(true), 1000)
    return () => {
      clearTimeout(t)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 배경 레이어 */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={Home}
          alt="홈 배경"
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-none transform transition-transform duration-[3500ms] ease-in-out ${
            home ? 'scale-380 -translate-y-30' : 'scale-100'
          }`}
          draggable={false}
        />
        <img
          src={Arch}
          alt="아치 배경"
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-none transform transition-transform duration-[3000ms] ease-in-out ${
            arch ? 'scale-1000 -translate-y-200' : 'scale-100'
          }`}
          draggable={false}
        />
      </div>
    </div>
  )
}

export default MainPage
