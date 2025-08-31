interface Props {
  value: string
  onChange: (next: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative w-[220px]">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="작품 명, 팀 명, 참여자 이름"
        className="w-full rounded-full border border-[#d6c9b9] bg-[#f7f2eb] px-4 py-2 pr-9 text-sm placeholder:text-[#b7a999] outline-none focus:border-[#c3a47a]"
      />
      <svg
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="11" cy="11" r="7" stroke="#8d837a" strokeWidth="2" />
        <path d="M20 20L17 17" stroke="#8d837a" strokeWidth="2" />
      </svg>
    </div>
  )
}
