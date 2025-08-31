export interface GuestbookItemDTO {
  id: number
  author: string
  recipient: string
  content: string
  createdAt: string
}

export interface GuestbookApiResult {
  guestbooks: GuestbookItemDTO[]
  listSize: number
  totalPage: number
  totalElements: number
  isFirst: boolean
  isLast: boolean
}

export interface GuestbookApiResponse {
  isSuccess: boolean
  code: string
  message: string
  result: GuestbookApiResult
}

const API_BASE = import.meta.env.VITE_API_BASE_URL

export async function fetchGuestbooks(
  page: number,
  size: number,
): Promise<GuestbookApiResult> {
  const res = await fetch(`${API_BASE}/api/guestbook?page=${page}&size=${size}`)
  if (!res.ok) throw new Error(`Failed to fetch guestbooks: ${res.status}`)
  const data: GuestbookApiResponse = await res.json()
  if (!data.isSuccess) throw new Error(data.message || 'API error')
  return data.result
}

export async function searchGuestbooks(
  keyword: string,
  page: number,
  size: number,
): Promise<GuestbookApiResult> {
  const params = new URLSearchParams({
    keyword,
    page: String(page),
    size: String(size),
  })
  const res = await fetch(`${API_BASE}/api/guestbook/search?${params}`)
  if (!res.ok) throw new Error(`Failed to search guestbooks: ${res.status}`)
  const data: GuestbookApiResponse = await res.json()
  if (!data.isSuccess) throw new Error(data.message || 'API error')
  return data.result
}
