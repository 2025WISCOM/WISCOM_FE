interface Props {
  title: string
  subtitle: string
  teamName: string
  members: string[]
  description: string
}

export default function WorkExplan({
  title,
  subtitle,
  teamName,
  members,
  description,
}: Props) {
  return (
    <div className="mx-auto mt-2 max-w-[420px] text-center">
      <h3 className="text-[22px] font-semibold tracking-tight text-[#8F7860]">
        {title}
      </h3>
      <p className="mt-1 text-[15px] text-[#8F7860]">{subtitle}</p>

      <hr className="mx-auto my-4 w-[86%] border-t border-[#B19D87]" />
      <div className="text-[15px] text-[#000000]">
        <span className="font-semibold">팀 명 | {teamName}</span>
      </div>
      <div className="mt-2 text-[15px] text-[#000000]">
        {members.join('  ')}
      </div>
      <hr className="mx-auto my-4 w-[86%] border-t border-[#B19D87]" />

      <p className="mx-auto w-[86%] text-left text-[15px] leading-6 text-[#000000]">
        {description}
      </p>
    </div>
  )
}
