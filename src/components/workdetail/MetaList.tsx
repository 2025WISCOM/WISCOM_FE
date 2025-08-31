interface MetaRow {
  label: string
  value: string
}

interface MetaListProps {
  rows: MetaRow[]
}

export default function MetaList({ rows }: MetaListProps) {
  return (
    <div className="w-full px-5">
      <table className="w-full border-collapse">
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="align-top">
              {/* 라벨 영역 */}
              <td className="w-[70px] py-1 pr-4 text-[14px] font-medium text-[#42372C] whitespace-nowrap">
                {row.label}
              </td>
              {/* 값 영역 */}
              <td className="py-1 text-[14px] text-black">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
