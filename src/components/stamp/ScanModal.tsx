import type { Ref } from 'react'

import ArrowIcon from '../../assets/booth_arrow_left.svg'
import OutlineIcon from '../../assets/booth_qr.svg'

interface ScanModalProps {
  videoRef: Ref<HTMLVideoElement>
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>
}

const ScanModal = ({ videoRef, setIsScanning }: ScanModalProps) => {
  return (
    <div className="absolute inset-0 z-50 m-auto bg-[#F5F3F0]">
      <div
        onClick={() => setIsScanning((prev) => !prev)}
        className="h-[52px] px-[4px] flex items-center cursor-pointer"
      >
        <img src={ArrowIcon} alt="뒤로 가기" />
      </div>

      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          muted
          autoPlay
          playsInline
          className="w-full h-full object-cover relative"
        />

        {/* 오버레이 */}
        <div
          className="absolute inset-0 flex justify-center bg-black/70"
          style={{
            clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, calc(50% - 128px) calc(50% - 128px), calc(50% - 128px) calc(50% + 128px), calc(50% + 128px) calc(50% + 128px), calc(50% + 128px) calc(50% - 128px), calc(50% - 128px) calc(50% - 128px))`,
          }}
        >
          <div className="w-[294px] h-[294px] relative top-[50%] translate-y-[-50%]">
            <img
              src={OutlineIcon}
              alt="qr scan"
              className="absolute top-0 left-0"
            />
            <img
              src={OutlineIcon}
              alt="qr scan"
              className="rotate-90 absolute top-0 right-0"
            />
            <img
              src={OutlineIcon}
              alt="qr scan"
              className="rotate-180 absolute bottom-0 right-0"
            />
            <img
              src={OutlineIcon}
              alt="qr scan"
              className="rotate-270 absolute bottom-0 left-0"
            />
          </div>

          <p className="font-[Butler] text-[#fff] text-[40px] font-bold leading-[24px] absolute z-50 top-[92px]">
            QR Scan
          </p>
        </div>
      </div>
    </div>
  )
}

export default ScanModal
