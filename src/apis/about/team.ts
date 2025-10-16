const API_BASE = import.meta.env.VITE_API_BASE_URL

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
  developers: Developer[]
}

export const fetchWorkList = async (): Promise<WorkItem[]> => {
  const res = await fetch(`${API_BASE}/api/workList?category=All`)
  const data = await res.json()
  return data.result
}
