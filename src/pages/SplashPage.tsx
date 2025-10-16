import Arch from '../assets/arch.png'
import Home from '../assets/home.png'
import TicketMain from '../assets/ticket_main.png'
import TicketSub from '../assets/ticket_sub.png'
import Ticket1 from '../assets/ticket_back1.png'
import Ticket2 from '../assets/ticket_back2.png'
import Stamp from '../assets/stamp.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SplashPage = () => {
  const navigate = useNavigate()

  const [animated, setAnimated] = useState(false)
  const [reveal, setReveal] = useState(false)

  // 티켓 올리기
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 500)
    return () => clearTimeout(t)
  }, [])

  // 도장 찍기
  useEffect(() => {
    if (!animated) return
    const t2 = setTimeout(() => setReveal(true), 700 + 500)
    return () => clearTimeout(t2)
  }, [animated])

  // 메인 페이지 이동 (스플래시 → 메인)
  useEffect(() => {
    if (!reveal) return
    const t3 = setTimeout(() => {
      sessionStorage.setItem('fromSplash', '1')
      navigate('/main', { replace: true, state: { fromSplash: true } })
    }, 2000)
    return () => clearTimeout(t3)
  }, [reveal, navigate])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={Home}
          alt="홈 배경"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-none"
          draggable={false}
        />
        <img
          src={Arch}
          alt="아치 배경"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-none"
          draggable={false}
        />
      </div>

      {/* 배경 티켓 */}
      <div
        className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0
          transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)]
          will-change-transform
        `}
        style={{
          transform: `translateY(${animated ? '0px' : '60px'})`,
        }}
      >
        <div className="relative w-[200px] top-[-130px]">
          <img
            src={Ticket2}
            alt="뒤쪽 티켓2"
            className="absolute transition-transform duration-700"
            style={{
              top: '-18.85px',
              left: '27.4px',
              transform: `rotate(${animated ? '9deg' : '0deg'})`,
            }}
          />
          <img
            src={Ticket1}
            alt="뒤쪽 티켓1"
            className="absolute transition-transform duration-700"
            style={{
              top: '-35.85px',
              left: '-23px',
              transform: `rotate(${animated ? '-5deg' : '0deg'})`,
            }}
          />
          <div className="invisible w-[200px] h-[140px]" />
        </div>
      </div>

      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* 메인 티켓 */}
      <div
        className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20
          transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)]
          will-change-transform
        `}
        style={{
          transform: `translateY(${animated ? '0px' : '60px'})`,
        }}
      >
        <div
          className="relative transition-transform duration-700"
          style={{ transform: `rotate(${animated ? '0deg' : '1.27deg'})` }}
        >
          <img src={TicketMain} alt="티켓 메인" className="block w-full" />
          <img
            src={TicketSub}
            alt="티켓 서브"
            className="block w-full -mt-px transition-transform duration-500 ease-out"
            style={{
              transform: `rotate(${reveal ? '-17.5deg' : '0deg'})`,
              transformOrigin: 'right top',
              transitionDelay: reveal ? '700ms' : '0ms',
            }}
          />

          <img
            src={Stamp}
            alt="스탬프"
            className={`
              absolute w-[98px] bottom-[95px] left-[5px] rotate-[-15.45deg]
              ${reveal ? 'stamp-hit' : 'opacity-0'}
            `}
            style={{
              transformOrigin: '60% 60%',
              willChange: 'transform, opacity, filter',
            }}
          />
        </div>
      </div>

      {/* 스탬프 찍는 애니메이션 */}
      <style>{`
        @keyframes stamp-hit-keyframes {
          0%   { opacity: 0; transform: scale(0.6) rotate(-15.45deg); }
          50%  { opacity: 1; transform: scale(1.15) rotate(-15.45deg); }
          70%  { opacity: 1; transform: scale(0.95) rotate(-15.45deg); }
          100% { opacity: 1; transform: scale(1.0) rotate(-15.45deg); }
        }
        .stamp-hit {
          animation: stamp-hit-keyframes 500ms cubic-bezier(.2,.9,.2,1.0) both;
        }
      `}</style>
    </div>
  )
}

export default SplashPage
