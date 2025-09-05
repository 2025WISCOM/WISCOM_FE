import type { Ref } from 'react'

interface ScanModalProps {
  videoRef: Ref<HTMLVideoElement>
}

const ScanModal = ({ videoRef }: ScanModalProps) => {
  return (
    <div className="px-[20px] py-[40px] absolute inset-0 z-50 m-auto bg-[#F5F3F0]">
      <div className="pt-[20px] px-[20px]">
        <h1 className="text-[#8F7860] text-[22px] font-medium leading-[32px]">
          <span className="text-[#42372C]">큐알코드</span>를
          <br />
          스캔해주세요
        </h1>
      </div>
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        className="w-full h-[570px] mt-[100px] rounded-[30px] object-cover"
      />
    </div>
  )
}

export default ScanModal
