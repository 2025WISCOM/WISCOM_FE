import { FaInstagram, FaHome } from 'react-icons/fa'
import logo from '../../assets/duksunglogo.svg'

const Footer = () => {
  return (
    <footer className="bg-[#56493A] text-xs text-[#D2C6BA] px-5 py-8">
      <div className="mb-3 text=[12px]">
        2025 덕성여자대학교 컴퓨터공학전공 졸업전시회
        <br />
        WISCOM: Play Your Graduation
      </div>
      {/* 아이콘 영역 */}
      <div className="flex items-center gap-4 mb-3">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[#A0896F] flex items-center justify-center"
        >
          <FaInstagram className="text-white text-lg" />
        </a>
        <a
          href="/"
          className="w-10 h-10 rounded-full bg-[#A0896F] flex items-center justify-center"
        >
          <FaHome className="text-white text-lg" />
        </a>
      </div>
      <div className="mb-3 leading-5">
        Tel. 02-901-8341
        <br />
        서울특별시 도봉구 삼양로 144길 33 덕성여자대학교 컴퓨터공학전공
      </div>
      <div className="flex items-center gap-2 pb-2">
        <img src={logo} alt="덕성여대 로고" className="w-[128px] h-[28px]" />
      </div>
      <span>@ Computer Engineering 2024. All rights reserved.</span>
    </footer>
  )
}

export default Footer
