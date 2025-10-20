interface TeamCardProps {
  image: string
  teamName: string
  members: string[]
}

const TeamCard = ({ image, teamName, members }: TeamCardProps) => {
  return (
    <div className="flex flex-col items-center text-center w-[150px] h-[250px]">
      <img
        src={image}
        alt={teamName}
        className="w-[100px] h-[100px] object-contain mb-2"
      />

      <p className="text-sm font-semibold text-[#6F5E4B] h-[22px] flex items-center justify-center">
        {teamName}
      </p>

      <ul className="mt-2 space-y-1 text-sm text-black leading-[18px]">
        {members.map((m, idx) => (
          <li key={idx}>{m}</li>
        ))}
      </ul>
    </div>
  )
}

export default TeamCard
