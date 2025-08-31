import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import backgroundImg from '../assets/mainback.png'
import Footer from '../components/about/Footer'

const RootLayout = () => {
  const location = useLocation()
  const hideHeader = location.pathname === '/splash'

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center font-[Pretendard] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div
        className="w-full max-w-[375px] h-[min(700px,100vh)] flex flex-col relative bg-[#F5F3F0] overflow-hidden shadow-lg"
        id="app-container"
      >
        {/* 헤더 */}
        {!hideHeader && <Header />}

        {/* Outlet이 차지한 높이 밑에 Footer가 바로 옴 */}
        <main className="overflow-y-auto">
          <Outlet />
          <Footer />
        </main>
      </div>

      {/* 화면 높이가 700px 이상일 때만 라운드 적용 */}
      <style>{`
        @media (min-height: 700px) {
          #app-container {
            border-radius: 0.75rem; /* rounded-xl */
          }
        }
      `}</style>
    </div>
  )
}

export default RootLayout
