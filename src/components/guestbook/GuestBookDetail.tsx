import Frame from '../../assets/guestbook_main.svg'

interface GuestBookItemProps {
  toName: string
  fromName: string
  message: string
}

const GuestBookDetail = (props: GuestBookItemProps) => {
  return (
    <div className="relative w-[360px] h-[360px] flex justify-center items-center">
      <div className="absolute w-[280px] h-[270px] bg-[#fff]" />

      <img
        src={Frame}
        alt="방명록 작성"
        className="absolute w-full h-full object-cover -mt-[12px] -mb-[8px]"
      />

      <div className="relative flex flex-col gap-[8px]">
        {/* To */}
        <div className="flex gap-[4px] items-center">
          <p className="text-[20px]">To.</p>
          <p>{props.toName}</p>
        </div>

        {/* 메시지 */}
        <p className="w-[240px] h-[168px] text-[15px] leading-[24px]">
          {props.message}
        </p>

        {/* From */}
        <div className="flex gap-[4px] items-center">
          <p className="text-[20px]">From.</p>
          <p>{props.fromName}</p>
        </div>
      </div>
    </div>
  )
}

export default GuestBookDetail
