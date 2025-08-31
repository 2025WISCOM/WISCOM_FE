interface DetailNavProps {
  onPrev?: () => void
  onNext?: () => void
  prevDisabled?: boolean
  nextDisabled?: boolean
}

export default function DetailNav({
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
}: DetailNavProps) {
  return (
    <div className="flex items-center justify-between text-[#6F5E4B]">
      <button
        type="button"
        onClick={onPrev}
        disabled={prevDisabled}
        className="flex items-center gap-2 text-sm disabled:opacity-40 cursor-pointer"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 6L9 12L15 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[20px] font-bold">Prev</span>
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="flex items-center gap-2 text-sm disabled:opacity-40 cursor-pointer"
      >
        <span className="text-[20px] font-bold">Next</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 6L15 12L9 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}
