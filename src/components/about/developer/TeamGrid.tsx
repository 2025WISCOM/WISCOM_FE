import { useEffect, useState } from 'react'
import TeamCard from './TeamCard'
import { fetchWorkList } from '../../../apis/about/team'
import type { WorkItem } from '../../../apis/about/team'

const TeamGrid = () => {
  const [teams, setTeams] = useState<WorkItem[]>([])

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchWorkList()
        setTeams(data)
      } catch (error) {
        console.error('팀 데이터를 불러오는 데 실패했습니다:', error)
      }
    }

    loadTeams()
  }, [])

  return (
    <div className="grid grid-cols-2 gap-8 mt-8 place-items-center mb-8">
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          image={team.imageUrl}
          teamName={team.teamName}
          members={team.developers.map((dev) => dev.name)}
        />
      ))}
    </div>
  )
}

export default TeamGrid
