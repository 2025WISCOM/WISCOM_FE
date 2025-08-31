import { useCallback, useEffect, useState } from 'react'
import { useGuestbook } from '../apis/guestbook/useGuestbook'
import GuestBookItem from '../components/guestbook/GuestBookItem'
import GuestBookWrite from '../components/guestbook/GuestBookWrite'
import Pagination from '../components/guestbook/Pagination'
import Footer from '../components/about/Footer'
import SearchIcon from '../assets/search.svg'
import MessageIcon from '../assets/messagenone.svg'
import GuestBookDetail from '../components/guestbook/GuestBookDetail'

const PAGE_SIZE = 6

type SelectedItem = {
  toName: string
  fromName: string
  message: string
} | null

const GuestBookPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [selected, setSelected] = useState<SelectedItem>(null)

  const { items, totalPages, reload } = useGuestbook({
    page: currentPage,
    size: PAGE_SIZE,
    keyword,
  })

  const handleSubmitted = () => {
    setKeyword('')
    setCurrentPage(1)
    reload()
  }

  const triggerSearch = () => {
    setCurrentPage(1)
    reload()
  }

  const closeModal = useCallback(() => setSelected(null), [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    if (selected) {
      document.body.classList.add('overflow-hidden')
      window.addEventListener('keydown', onKeyDown)
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('overflow-hidden')
    }
  }, [selected, closeModal])

  return (
    <div className="flex flex-col">
      <GuestBookWrite onSubmitted={handleSubmitted} />

      <div className="w-full mt-[32px]">
        <div className="flex justify-between mx-[20px] border-b border-[#B19D87]">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') triggerSearch()
            }}
            placeholder="검색어를 입력하세요"
            className="w-full text-[#000] text-[15px] placeholder:text-[#999] outline-none pl-[8px]"
          />
          <img src={SearchIcon} alt="검색" />
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-[28px] mt-[68px] mb-[80px]">
          <img src={MessageIcon} alt="방명록 없음" />
          <p className="text-center text-[#000]">
            {keyword.trim()
              ? '검색 결과가 없어요.'
              : '아직 작성된 메시지가 없어요.'}
          </p>
        </div>
      ) : (
        <div className="w-full px-[20px] mt-[20px] mb-[36px]">
          <div className="grid grid-cols-2 gap-[8px] justify-items-center">
            {items.map((g) => (
              <GuestBookItem
                key={g.id}
                toName={g.recipient}
                fromName={g.author}
                message={g.content}
                onClick={() =>
                  setSelected({
                    toName: g.recipient,
                    fromName: g.author,
                    message: g.content,
                  })
                }
              />
            ))}
          </div>
        </div>
      )}

      <Pagination
        current={currentPage}
        total={totalPages}
        onChange={setCurrentPage}
        className="mb-[48px]"
      />

      <Footer />

      {selected && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closeModal} // 배경 클릭 시 닫기
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()} // 카드 클릭은 전파 막기
          >
            <GuestBookDetail
              toName={selected.toName}
              fromName={selected.fromName}
              message={selected.message}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default GuestBookPage
