import Frame from '../../assets/guestbook_sub.svg'

interface GuestBookItemProps {
  toName: string
  fromName: string
  message: string
  onClick?: () => void
}

const GuestBookItem = (props: GuestBookItemProps) => {
  return (
    <div
      className="relative inline-block w-[156px] h-[156px]"
      onClick={props.onClick}
    >
      <div className="absolute inset-[4px] bg-white" />
      <img
        src={Frame}
        alt="방명록"
        className="absolute w-full h-full object-contain"
      />
      <div className="absolute flex flex-col py-[26px] px-[24px] text-[12px] text-[#000]">
        <p>To. {props.toName}</p>
        <p className="my-[4px] h-[64px] leading-[16px] line-clamp-4 overflow-hidden text-ellipsis">
          {props.message}
        </p>
        <p>From. {props.fromName}</p>
      </div>
    </div>
  )
}

export default GuestBookItem
