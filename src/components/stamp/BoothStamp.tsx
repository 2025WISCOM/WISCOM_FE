import { QRCodeSVG } from 'qrcode.react'

import StampImg from '../../assets/duksung_fantasy_transparent.png'
import ComputerIcon from '../../assets/booth_stamp_computer.svg'

const BoothStamp = () => {
  return (
    <>
      <div className="pt-[20px] px-[20px]">
        <h1 className="text-[#8F7860] text-[22px] font-medium leading-[32px]">
          Event
          <span className="ml-[8px] text-[#8F7860] text-[15px] font-medium leading-[24px]">
            부스를 돌며 스탬프를 모아보세요!
          </span>
        </h1>
      </div>

      <div className="px-[20px] mt-[14px]">
        <img
          src={StampImg}
          alt="부스 스탬프"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="grid grid-cols-3 gap-[24px] px-[35px] place-items-center mb-[36px]">
        {Array.from({ length: 15 }).map((_, idx) => (
          <div
            key={idx}
            className="relative w-[80px] h-[80px] flex items-center justify-center  cursor-pointer"
          >
            <img
              key={idx}
              src={ComputerIcon}
              alt="컴퓨터 아이콘"
              className="w-full h-full object-contain absolute inset-0"
            />
            <p className="font-['Butler'] text-[#9D8469] text-[22px] font-medium leading-[32px] relative top-[-4px]">
              {idx + 1}
            </p>
          </div>
        ))}

        {/* 임시 QR 생성 */}
        {Array.from({ length: 15 }).map((_, idx) => (
          <div key={idx}>
            <div>{idx + 1} 번째 QR</div>
            <QRCodeSVG
              value={`${String(idx)}-${Math.random().toString()}`}
              size={64}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default BoothStamp
