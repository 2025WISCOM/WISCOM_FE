import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import backgroundImg from '../assets/mainback.png'
import Footer from '../components/about/Footer'

const RootLayout = () => {
  const location = useLocation()
  const hideHeader = location.pathname === '/'
  const hideFooter = location.pathname === '/' || location.pathname === '/main'
  const isMain = location.pathname === '/main'

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center font-[Pretendard] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div
        className="absolute inset-0 bg-black/40 pointer-events-none"
        aria-hidden
      />

      <div
        className={`relative z-10 w-full max-w-[393px] h-[min(800px,100vh)] flex flex-col ${isMain ? 'bg-[#292a2c]' : 'bg-[#F5F3F0]'} overflow-hidden shadow-lg`}
        id="app-container"
      >
        {/* 헤더 */}
        {!hideHeader && (
          <div
            className={
              isMain ? 'absolute top-0 left-0 right-0 z-50' : 'relative z-20'
            }
            style={isMain ? undefined : { height: '60px' }}
          >
            <Header />
          </div>
        )}

        {/* 본문 + 푸터 */}
        <main className="flex-1 min-h-0 overflow-y-auto">
          <Outlet />
          {!hideFooter && <Footer />}
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
