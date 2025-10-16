import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useRef, useState } from 'react'
import QrScanner from 'qr-scanner'

import StampImg from '../../assets/duksung_fantasy_transparent.png'
import ComputerIcon from '../../assets/booth_stamp_computer.svg'
import ComputerSuccessIcon from '../../assets/booth_stamp_computer_success.svg'
import StampIcon from '../../assets/booth_stamp_success.svg'
import ScanModal from './ScanModal'
import Modal from '../Modal'
import BoothData from '../../data/boothData.json'

const BoothStamp = () => {
  const [isScanning, setIsScanning] = useState<boolean>(false)

  // 부스별 스캔 여부 저장
  const [scannedBooth, setScannedBooth] = useState<{
    [boothId: string]: boolean
  }>({})

  const [showModal, setShowModal] = useState(false)
  const [content, setContent] = useState<string>('')

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const scannerRef = useRef<QrScanner | null>(null)

  const handleScan = (result: QrScanner.ScanResult) => {
    if (result) {
      console.log(result)

      scannerRef.current?.stop()

      const boothId = result.data

      const content = BoothData.find((booth) => String(booth.id) === boothId)
      setContent(content?.content ?? '')

      const updatedBooths = { ...scannedBooth, [boothId]: true }

      setScannedBooth(updatedBooths)

      localStorage.setItem('scannedBooths', JSON.stringify(updatedBooths))
    }

    setTimeout(() => {
      scannerRef.current?.destroy()
      setIsScanning(false)
      setShowModal(true)
    }, 1000)
  }

  const options = {
    preferredCamera: 'environment',
    highlightScanRegion: false,
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
      <div>
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
          {Array.from({ length: 17 }).map((_, idx) => (
            <div
              key={idx}
              className="relative w-[80px] h-[80px] flex items-center justify-center"
            >
              {scannedBooth[String(idx + 1)] === true && (
                <>
                  <img
                    key={idx}
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
        </div>

        {/* 임시 QR 생성 */}
        {/* {BoothData.map((booth) => (
          <div key={booth.id} className="flex flex-col items-center gap-3 mb-4">
            <div>{booth.id} 번째 QR</div>
            <QRCodeSVG value={String(booth.id)} size={128} />
          </div>
        ))} */}

        {/* QR 스캔 */}
        {isScanning && (
          <ScanModal videoRef={videoRef} setIsScanning={setIsScanning} />
        )}

        <div className="sticky bottom-[32px] px-[16px] w-full mb-[32px]">
          <button
            onClick={() => setIsScanning(true)}
            className="w-full bg-[#56493A] rounded-[40px] h-[48px] text-[#fff] text-[20px] font-bold leading-[24px] font-['Butler'] cursor-pointer"
          >
            QR Scan
          </button>
        </div>
      </div>

      {/* 스캔 이후 모달 */}
      {showModal && (
        <Modal
          title={'스탬프 수집 완료'}
          content={content}
          setShowModal={setShowModal}
        />
      )}
    </>
  )
}

export default BoothStamp
