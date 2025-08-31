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

export interface ImageUrl {
  id: number
  url: string
  createdAt?: string | null
  updatedAt?: string | null
}

export interface WorkDetail {
  id: number
  projectName: string
  teamName: string
  shortDescription: string
  midDescription?: string
  description?: string
  imageUrls: ImageUrl[]
  developers: Developer[]
  githubUrl?: string
  instagramUrl?: string
  prev?: number | null
  next?: number | null
}

interface ListApiResponse {
  isSuccess: boolean
  code: string
  message: string
  result: WorkItem[]
}

interface DetailApiResponse {
  isSuccess: boolean
  code: string
  message: string
  result: WorkDetail
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const toServerCategory = (c: CategoryUI): string => {
  if (c === 'WEB&APP') return 'WEB_APP'
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

  const data: ListApiResponse = await res.json()
  if (!data.isSuccess) throw new Error(data.message || 'API 실패')

  return data.result
}

/** 상세 조회 */
export async function fetchWorkDetail(
  category: CategoryUI,
  id: number,
  signal?: AbortSignal,
) {
  const url = `${BASE_URL}/api/workDetail?category=${encodeURIComponent(
    toServerCategory(category),
  )}&id=${encodeURIComponent(id)}`

  const res = await fetch(url, { signal, headers: { accept: '*/*' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const data: DetailApiResponse = await res.json()
  if (!data.isSuccess) throw new Error(data.message || 'API 실패')

  return data.result
}
