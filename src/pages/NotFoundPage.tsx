import Header from '../components/Header'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full flex justify-center bg-[#313131] font-[Pretendard]">
      <div className="w-full max-w-[400px] flex flex-col min-h-screen relative">
        {/* 헤더 */}
        <Header />

        {/* 본문 */}
        <main className="flex-grow bg-[#f5f5f5] px-6 py-10 text-center">
          <h1 className="text-2xl font-bold text-[#3e352d] mb-4">
            ❌ 페이지를 찾을 수 없습니다 ❌
          </h1>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            홈으로 돌아가기
          </a>
        </main>
      </div>
    </div>
  )
}

export default NotFoundPage
