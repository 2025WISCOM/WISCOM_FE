import { useState } from 'react'
import MainFrame from '../../assets/guestbook_main.svg'

const API_BASE = import.meta.env.VITE_API_BASE_URL

interface Props {
  onSubmitted?: (fromName: string) => void
}

const GuestBookWrite = ({ onSubmitted }: Props) => {
  const [toName, setToName] = useState('')
  const [message, setMessage] = useState('')
  const [fromName, setFromName] = useState('')

  const isFilled =
    toName.trim() !== '' && message.trim() !== '' && fromName.trim() !== ''

  const handleSubmit = async () => {
    if (!isFilled) return

    await fetch(`${API_BASE}/api/guestbook/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        author: fromName,
        recipient: toName,
        content: message,
      }),
    })

    setToName('')
    setMessage('')
    setFromName('')

    onSubmitted?.(fromName)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[360px] aspect-square flex justify-center items-center">
        <div className="absolute w-[78%] h-[75%] bg-[#fff]" />

        <img
          src={MainFrame}
          alt="방명록 작성"
          className="absolute w-full h-full object-cover -mt-[12px] -mb-[8px]"
        />

        <div className="relative flex flex-col w-[82%] max-w-[280px] p-[18px]">
          {/* To */}
          <div className="flex gap-[4px] items-center">
            <p className="text-[20px]">To.</p>
            <input
              type="text"
              placeholder="받는 사람"
              value={toName}
              onChange={(e) => setToName(e.target.value)}
              maxLength={7}
              className="text-[15px] placeholder:text-[#999] outline-none leading-[20px] flex-1 min-w-0"
            />
          </div>

          {/* 메시지 */}
          <textarea
            placeholder="새로운 여정을 시작하는 학생들에게 응원과 축하의 메시지를 남겨주세요!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={136}
            className="w-full h-[48vw] max-h-[160px] min-h-[120px] mt-[8px] mb-[16px] text-[15px] placeholder:text-[#999] outline-none resize-none"
          />

          {/* From */}
          <div className="flex items-center w-full box-border">
            <div className="flex items-center gap-[4px] flex-1 min-w-0">
              <p className="text-[20px] whitespace-nowrap">From.</p>
              <input
                type="text"
                placeholder="보내는 사람"
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                maxLength={7}
                className="text-[15px] placeholder:text-[#999] outline-none flex-1 min-w-0 leading-[20px] "
              />
            </div>

            <p className="ml-[8px] text-[12px] text-[#999] shrink-0">
              {message.length}/136
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className={`w-full max-w-[328px] h-[48px] rounded-[40px] text-[#FFF] text-center text-[20px] font-bold ${isFilled ? 'bg-[#56493A] cursor-pointer' : 'bg-[#DDD]'}`}
      >
        Send
      </button>
    </div>
  )
}

export default GuestBookWrite
