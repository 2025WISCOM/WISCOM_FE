export type CategoryUI = 'ALL' | 'WEB&APP' | 'GAME' | 'AI' | 'IOT'

const TABS: CategoryUI[] = ['ALL', 'WEB&APP', 'GAME', 'AI', 'IOT']

interface Props {
  value: CategoryUI
  onChange: (next: CategoryUI) => void
}

export default function Tabs({ value, onChange }: Props) {
  return (
    <div className="w-full flex items-center justify-center gap-8 text-sm font-semibold tracking-wide">
      {TABS.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`relative pb-2 transition-colors ${
            value === t ? 'text-[#42372C]' : 'text-[#B19D87]'
          }`}
        >
          {t}
          {value === t && (
            <span className="absolute left-0 right-0 -bottom-0.5 h-[3px] bg-[#8F7860]" />
          )}
        </button>
      ))}
    </div>
  )
}
