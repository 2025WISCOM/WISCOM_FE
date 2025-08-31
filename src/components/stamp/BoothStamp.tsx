import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useRef, useState } from 'react'
import QrScanner from 'qr-scanner'

import StampImg from '../../assets/duksung_fantasy_transparent.png'
import ComputerIcon from '../../assets/booth_stamp_computer.svg'
import ComputerSuccessIcon from '../../assets/booth_stamp_computer_success.svg'
import StampIcon from '../../assets/booth_stamp_success.svg'

const BoothStamp = () => {
  const [isScanning, setIsScanning] = useState<boolean>(false)

  // 부스별 스캔 여부 저장
  const [scannedBooth, setScannedBooth] = useState<{
    [boothId: string]: boolean
  }>({})

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const scannerRef = useRef<QrScanner | null>(null)

  const handleScan = (result: QrScanner.ScanResult) => {
    if (result) {
      scannerRef.current?.stop()

      const boothId = result.data
      const updatedBooths = { ...scannedBooth, [boothId]: true }

      setScannedBooth(updatedBooths)

      localStorage.setItem('scannedBooths', JSON.stringify(updatedBooths))
    }

    setTimeout(() => {
      scannerRef.current?.destroy()
      setIsScanning(false)
    }, 1000)
  }

  const options = {
    preferredCamera: 'environment',
    highlightScanRegion: true,
  }

  useEffect(() => {
    if (!videoRef.current) return
    if (!isScanning) return

    if (videoRef.current && !scannerRef.current) {
      const qrScanner = new QrScanner(videoRef.current, handleScan, options)
      scannerRef.current = qrScanner
      qrScanner.start().catch((error) => {
        if (error.name !== 'AbortError') console.log(error)
      })
    }

    return () => {
      scannerRef.current?.destroy()
      scannerRef.current = null
    }
  }, [isScanning])

  useEffect(() => {
    const scanned = JSON.parse(localStorage.getItem('scannedBooths') || '{}')
    setScannedBooth(scanned)
  }, [])

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
            {scannedBooth[String(idx + 1)] === true && (
              <>
                <img
                  key={idx}
                  onClick={() => setIsScanning(true)}
                  src={ComputerSuccessIcon}
                  alt="컴퓨터 아이콘"
                  className="w-full h-full object-contain absolute inset-0"
                />
                <p className="font-['Butler'] text-[#D2C6BA] text-[22px] font-medium leading-[32px] relative top-[-4px]">
                  {idx + 1}
                </p>
                <img src={StampIcon} alt="qr인증" className="absolute" />
              </>
            )}

            {scannedBooth[String(idx + 1)] !== true && (
              <>
                <img
                  key={idx}
                  onClick={() => setIsScanning(true)}
                  src={ComputerIcon}
                  alt="컴퓨터 아이콘"
                  className="w-full h-full object-contain absolute inset-0"
                />
                <p className="font-['Butler'] text-[#9D8469] text-[22px] font-medium leading-[32px] relative top-[-4px]">
                  {idx + 1}
                </p>
              </>
            )}
          </div>
        ))}

        {/* 임시 QR 생성 */}
        {Array.from({ length: 15 }).map((_, idx) => (
          <div key={idx}>
            <div>{idx + 1} 번째 QR</div>
            <QRCodeSVG value={String(idx + 1)} size={64} />
          </div>
        ))}
      </div>

      {/* QR 스캔 */}
      {isScanning && (
        <div className="px-[20px] py-[40px] fixed inset-0 max-w-[400px] w-full z-50 m-auto bg-[#F5F3F0]">
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
      )}
    </>
  )
}

export default BoothStamp
