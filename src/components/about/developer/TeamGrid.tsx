import { useEffect, useState, useMemo } from 'react'
import TeamCard from './TeamCard'
import { fetchWorkList } from '../../../apis/about/team'
import type { WorkItem } from '../../../apis/about/team'

const isKorean = (s: string) => /[가-힣]/.test(s) && !/[A-Za-z]/.test(s)

const collatorKo = new Intl.Collator('ko-KR', {
  sensitivity: 'base',
  numeric: true,
})
const collatorEn = new Intl.Collator('en', {
  sensitivity: 'base',
  numeric: true,
})

const compareTeamName = (a: WorkItem, b: WorkItem) => {
  const aName = a.teamName?.normalize('NFC') ?? ''
  const bName = b.teamName?.normalize('NFC') ?? ''
  const aKo = isKorean(aName)
  const bKo = isKorean(bName)

  if (aKo && !bKo) return -1
  if (!aKo && bKo) return 1

  return aKo
    ? collatorKo.compare(aName, bName)
    : collatorEn.compare(aName, bName)
}

const TeamGrid = () => {
  const [teams, setTeams] = useState<WorkItem[]>([])

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchWorkList()

        setTeams([...data].sort(compareTeamName))
      } catch (error) {
        console.error('팀 데이터를 불러오는 데 실패했습니다:', error)
      }
    }
    loadTeams()
  }, [])

  const sortedTeams = useMemo(() => [...teams].sort(compareTeamName), [teams])

  return (
    <div className="grid grid-cols-2 gap-8 mt-8 place-items-center mb-8 auto-rows-[250px]">
      {sortedTeams.map((team) => (
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
