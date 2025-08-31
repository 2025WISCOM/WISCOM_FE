import type { CategoryUI } from '../components/works/Tabs'

export interface Developer {
  id: number
  name: string
  role: string
}

export interface WorkItem {
  id: number
  projectName: string
  imageUrl: string
  teamName: string
  developers?: Developer[]
  shortDescription: string
  midDescription: string
}

interface ApiResponse {
  isSuccess: boolean
  code: string
  message: string
  result: WorkItem[]
}

const BASE_URL = 'https://2025-wiscom-backend.store'

// UI 카테고리 → 서버 카테고리 변환
const toServerCategory = (c: CategoryUI): string => {
  if (c === 'WEB&APP') return 'WEB_APP' // ✅ 변환 처리
  return c.toLowerCase()
}

export async function fetchWorkList(
  category: CategoryUI,
  signal?: AbortSignal,
) {
  const url = `${BASE_URL}/api/workList?category=${encodeURIComponent(
    toServerCategory(category),
  )}`

  const res = await fetch(url, { signal, headers: { accept: '*/*' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const data: ApiResponse = await res.json()
  if (!data.isSuccess) throw new Error(data.message || 'API 실패')

  return data.result
}
