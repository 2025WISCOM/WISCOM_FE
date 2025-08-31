type Team = {
  id: number
  projectName: string
  shortDescription: string
  members: string[]
}

interface StudioCardProps {
  studio: string
  teams: Team[]
}

const StudioCard = ({ studio, teams }: StudioCardProps) => {
  const colors: Record<string, string> = {
    'Studio 1': '#3C2A4D',
    'Studio 2': '#1E3A5F',
    'Studio 3': '#2D5869',
    'Studio 4': '#5B5B5B',
    'Studio 5': '#243D1A',
    'Studio 6': '#635F37',
    'Studio 10': '#533434',
  }

  return (
    <div className="mt-[40px] px-[20px]">
      <div
        style={{ backgroundColor: colors[studio] }}
        className="w-max h-[32px] px-[8px] py-[4px] text-center text-[#fff] text-[15px] font-medium leading-[24px] mb-[21px]"
      >
        {studio}
      </div>

      <div className="flex flex-col gap-[28px]">
        {teams.map((team, idx) => (
          <div key={team.id} className="flex flex-col gap-[4px]">
            <div className="text-[#BDAD9B] text-[22px] font-medium leading-[32px]">
              {idx + 1}
            </div>

            <div className="text-[#000] text-[15px] font-medium leading-[24px] px-[2px]">
              {team.projectName} : {team.shortDescription}
            </div>

            <div className="w-full h-[1px] bg-[#BDAD9B]"></div>

            <div className="text-[#000] text-[15px] font-normal leading-[24px] flex gap-[5px] px-[2px]">
              {team.members.map((member, idx) => (
                <div key={idx}>{member}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudioCard
