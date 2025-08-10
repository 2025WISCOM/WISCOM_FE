import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import background from '../assets/background.png'

function Header() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const navigate = useNavigate()

  const location = useLocation()
  const isMain = location.pathname === '/'

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  const toggleMenu = () => setIsVisible((prev) => !prev)
  const setIsVisibleFalse = () => setIsVisible(false)

  const menuItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'WORKS', path: '/works' },
    { name: 'GUESTBOOK', path: '/guestbook' },
    { name: 'STAMP', path: '/stamp' },
  ]

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const item = event.currentTarget
      const rect = item.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const percentageX = (x / rect.width) * 100
      const percentageY = (y / rect.height) * 100
      item.style.setProperty('--mouse-x', `${percentageX}%`)
      item.style.setProperty('--mouse-y', `${percentageY}%`)
    },
    [],
  )

  const handleNavigation = (path: string) => {
    toggleMenu()
    setTimeout(() => {
      navigate(path)
    }, 500)
  }

  const handleClickWiscom = () => {
    if (isVisible) {
      toggleMenu()
      setTimeout(() => {
        navigate('/')
        setIsVisibleFalse()
      }, 500)
    } else {
      navigate('/')
      setIsVisibleFalse()
    }
  }

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      {/* <div
        className={`w-full h-[100px] flex justify-between items-center px-6 font-serif relative z-50 transition-all duration-300 ${
          isMain ? 'bg-transparent' : 'bg-[#FFF5E9]'
        }`}
      > */}
      <div className="w-full h-[100px] flex justify-between items-center px-6 text-[#42372C] font-serif relative z-50 bg-[#FFF5E9]">
        <div
          className={`text-[32px] font-bold cursor-pointer font-playfairSC transition-opacity duration-300 ${
            isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } ${isMain ? 'text-[#000000]' : 'text-[#42372C]'}`}
          onClick={handleClickWiscom}
        >
          WISCOM
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleMenu}
        >
          <div
            className={`relative w-[24px] h-[18px] flex flex-col items-center transition-all duration-300 ${
              isVisible ? 'justify-center' : 'justify-between'
            } z-[60]`}
          >
            <span
              className={`${
                isVisible ? 'absolute' : 'static'
              } w-full h-[2px] transition-all duration-300 transform origin-center ${
                isVisible ? 'rotate-45' : ''
              } ${
                isVisible
                  ? 'bg-white'
                  : isMain
                    ? 'bg-[#000000]'
                    : 'bg-[#8F7860]'
              }`}
            />

            <span
              className={`${
                isVisible ? 'absolute' : 'static'
              } w-full h-[2px] transition-all duration-300 transform origin-center ${
                isVisible ? 'opacity-0' : ''
              } ${
                isVisible
                  ? 'bg-white'
                  : isMain
                    ? 'bg-[#000000]'
                    : 'bg-[#8F7860]'
              }`}
            />

            <span
              className={`${
                isVisible ? 'absolute' : 'static'
              } w-full h-[2px] transition-all duration-300 transform origin-center ${
                isVisible ? '-rotate-45' : ''
              } ${
                isVisible
                  ? 'bg-white'
                  : isMain
                    ? 'bg-[#000000]'
                    : 'bg-[#8F7860]'
              }`}
            />
          </div>
        </div>

        {isAnimating && (
          <>
            <div
              className="absolute top-0 left-0 w-full h-screen bg-cover bg-center z-30"
              style={{
                backgroundImage: `url(${background})`,
              }}
            >
              <div className="absolute inset-0 bg-black opacity-60" />
            </div>

            <div className="absolute top-[100px] left-0 w-full h-[calc(100vh-100px)] z-50 flex flex-col items-start pl-8 pt-10 gap-8">
              {menuItems.map((item, index) => (
                <div
                  key={item.name}
                  className="relative text-[40px] ml-[30px] cursor-pointer text-[#B19D87] transition-all duration-300 ease-in-out"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? 'translateX(0)'
                      : 'translateX(-100%)',
                    transitionDelay: `${index * 0.1}s`,
                  }}
                  onMouseMove={handleMouseMove}
                  onClick={() => handleNavigation(item.path)}
                >
                  <span className="first-letter:text-[48px] hover:text-transparent hover:bg-clip-text hover:bg-[radial-gradient(circle_at_var(--mouse-x,_50%)_var(--mouse-y,_50%),#ffffff_0%,#F5E9DB_30%,#D2BBA3_60%,#A68B6B_80%)]">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Header
