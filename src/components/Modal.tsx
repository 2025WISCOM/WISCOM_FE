interface ModalProps {
  title: string
  content: string
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ title, content, setShowModal }: ModalProps) => {
  return (
    <div className="absolute inset-0 bg-black/70 px-[28px] flex items-center justify-center">
      <div className="px-[18px] pt-[32px] pb-[12px] w-full h-[204px] rounded-[8px] bg-[#fff] flex flex-col justify-between">
        <div className="flex flex-col items-center px-[4px]">
          <p className="text-[#8F7860] text-[22px] font-semibold leading-[32px]">
            {title}
          </p>
          <p className="text-black text-[15px] font-medium leading-[24px] mt-[4px] text-center whitespace-pre-wrap">
            {content}
          </p>
        </div>

        <button
          onClick={() => setShowModal(false)}
          className="py-[9px] px-[58px] flex justify-center items-center h-[40px] w-full rounded-[4px] bg-[#9D8469] text-[#fff] text-15px font-normal leading-[20px] cursor-pointer"
        >
          확인
        </button>
      </div>
    </div>
  )
}

export default Modal
