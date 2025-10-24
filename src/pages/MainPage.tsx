import { useEffect, useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import Arch from '../assets/arch.png'
import Home from '../assets/home.png'

type SplashState = { fromSplash?: boolean }

function isSplashState(s: unknown): s is SplashState {
  if (typeof s !== 'object' || s === null) return false
  const maybe = (s as Record<string, unknown>).fromSplash
  return maybe === undefined || typeof maybe === 'boolean'
}

const MainPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()

  // 1) location.state (any 제거)
  const fromState =
    isSplashState(location.state) && location.state.fromSplash === true

  // 2) 쿼리
  const fromQuery = params.get('from') === 'splash'

  // 3) 세션
  const fromSession = sessionStorage.getItem('fromSplash') === '1'

  const fromSplash = fromState || fromQuery || fromSession

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

  useEffect(() => {
    if (!fromSplash) return
    const to = setTimeout(() => {
      sessionStorage.removeItem('fromSplash')
      navigate('/about/introduction', { replace: true })
    }, 5000)
    return () => clearTimeout(to)
  }, [fromSplash, navigate])

  return (
    <div className="relative w-full h-full overflow-hidden">
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
