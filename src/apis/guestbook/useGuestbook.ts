import { useCallback, useEffect, useState } from 'react'
import {
  fetchGuestbooks,
  searchGuestbooks,
  type GuestbookItemDTO,
} from './guestbook'

export function useGuestbook({
  page,
  size,
  keyword,
}: {
  page: number
  size: number
  keyword: string
}) {
  const [items, setItems] = useState<GuestbookItemDTO[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const zeroBased = page - 1
      const data = keyword.trim()
        ? await searchGuestbooks(keyword.trim(), zeroBased, size)
        : await fetchGuestbooks(zeroBased, size)

      setItems(data.guestbooks)
      setTotalPages(Math.max(1, data.totalPage))
    } catch (e) {
      setError(e as Error)
    } finally {
      setLoading(false)
    }
  }, [page, size, keyword])

  useEffect(() => {
    load()
  }, [load])

  return { items, totalPages, loading, error, reload: load }
}
