import TeamCard from './TeamCard'
import stamp from '../../../assets/teamstamp.png'

const TeamGrid = () => {
  const teams = [
    {
      image: stamp,
      teamName: '팀명팀명팀명팀명',
      members: ['김덕우', '김덕우', '김덕우', '김덕우', '김덕우', '김덕우'],
    },
    {
      image: stamp,
      teamName: '팀명팀명팀명팀명',
      members: ['김덕우', '김덕우', '김덕우', '김덕우', '김덕우', '김덕우'],
    },
    {
      image: stamp,
      teamName: '팀명팀명팀명팀명',
      members: ['김덕우', '김덕우', '김덕우', '김덕우', '김덕우', '김덕우'],
    },
    {
      image: stamp,
      teamName: '팀명팀명팀명팀명',
      members: ['김덕우', '김덕우', '김덕우', '김덕우', '김덕우', '김덕우'],
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-8 mt-8 place-items-center mb-8">
      {teams.map((team, idx) => (
        <TeamCard
          key={idx}
          image={team.image}
          teamName={team.teamName}
          members={team.members}
        />
      ))}
    </div>
  )
}

export default TeamGrid
