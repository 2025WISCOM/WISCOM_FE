import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'

const RootLayout = () => {
  const location = useLocation()
  const hideHeader = location.pathname === '/splash'

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#313131] font-[Pretendard]">
      <div className="w-full max-w-[400px] flex flex-col min-h-screen relative">
        {!hideHeader && <Header />}
        <main className="flex-grow bg-[#FFF5E9]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default RootLayout
