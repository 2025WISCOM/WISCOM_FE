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

const stampEntries = Object.entries(
  import.meta.glob('/src/assets/우표*.png', {
    eager: true,
    import: 'default',
    query: '?url',
  }),
) as Array<[string, string]>

const stampImages = stampEntries
  .sort(([a], [b]) => {
    const na = Number(a.match(/우표(\d+)\.png$/)?.[1] ?? 0)
    const nb = Number(b.match(/우표(\d+)\.png$/)?.[1] ?? 0)
    return na - nb
  })
  .map(([, url]) => url)

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
    <div className="grid grid-cols-2 gap-2 mt-8 place-items-center mb-8 auto-rows-[250px] mx-6">
      {sortedTeams.map((team, idx) => {
        const img =
          stampImages.length > 0 ? stampImages[idx % stampImages.length] : ''
        return (
          <TeamCard
            key={team.id}
            image={img}
            teamName={team.teamName}
            members={team.developers.map((dev) => dev.name)}
          />
        )
      })}
    </div>
  )
}

export default TeamGrid
