// import { Link, useNavigate } from 'react-router-dom'
// import Logo from '/mainlogo.png'
// import backgroundImg from '../assets/mainback.png'

// const NotFoundPage = () => {
//   const navigate = useNavigate()

//   return (
//     <div
//       className="relative min-h-screen w-full flex items-center justify-center font-[Pretendard] bg-cover bg-center"
//       style={{ backgroundImage: `url(${backgroundImg})` }}
//     >
//       {' '}
//       <div className="mx-auto flex min-h-svh w-full max-w-[435px] bg-black/40 flex-col">
//         {/* 헤더 */}
//         {/* <Header /> */}

//         {/* 본문 */}
//         <main
//           className="flex flex-1 items-center justify-center px-5 py-10"
//           aria-labelledby="notfound-title"
//         >
//           <div className="w-full rounded-2xl bg-[#f7f7f7] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
//             <div className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-xl ring-1 ring-black/5">
//               <img
//                 src={Logo}
//                 alt="페이지를 찾을 수 없습니다"
//                 className="h-full w-full object-contain"
//                 loading="lazy"
//                 draggable={false}
//               />
//             </div>

//             <h1
//               id="notfound-title"
//               className="mb-3 text-center text-[22px] font-bold tracking-tight text-[#3e352d]"
//             >
//               페이지를 찾을 수 없습니다
//             </h1>
//             {/* <p className="mb-6 text-center text-[14px] leading-6 text-[#5b4e42]">
//               주소가 바뀌었거나 삭제되었을 수 있습니다. 아래 버튼으로 이동해
//               주세요.
//             </p> */}

//             <div className="flex items-center justify-center gap-3 mt-5">
//               <button
//                 type="button"
//                 onClick={() => navigate(-1)}
//                 className="cursor-pointer inline-flex items-center justify-center rounded-xl border border-[#B19D87] px-4 py-2 text-sm font-medium text-[#6F5E4B] outline-none transition-[transform,box-shadow,background] hover:bg-[#efe9e2] focus-visible:ring-2 focus-visible:ring-[#B19D87] active:scale-[0.98]"
//               >
//                 이전 페이지
//               </button>
//               <Link
//                 to="/"
//                 className="inline-flex items-center justify-center rounded-xl bg-[#6F5E4B] px-4 py-2 text-sm font-semibold text-white outline-none transition-[transform,box-shadow,background] hover:bg-[#5f513f] focus-visible:ring-2 focus-visible:ring-[#B19D87] active:scale-[0.98]"
//               >
//                 홈으로 가기
//               </Link>
//             </div>

//             {/* 보조 링크: 필요 시 숨김 가능 */}
//             <div className="mt-6 text-center">
//               <Link
//                 to="/about/map"
//                 className="text-[13px] text-[#6F5E4B] underline underline-offset-4 hover:text-[#5f513f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B19D87] rounded-sm px-1"
//               >
//                 전시 안내 보기
//               </Link>
//             </div>
//           </div>
//         </main>

//         {/* 푸터(선택): 작은 카피라이트 */}
//         <footer className="pb-6 text-center text-xs text-white">
//           © 2025_WISCOM
//         </footer>
//       </div>
//     </div>
//   )
// }

// export default NotFoundPage

import { Link, useNavigate } from 'react-router-dom'
import Logo from '/mainlogo.png'
import backgroundImg from '../assets/mainback.png'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center font-[Pretendard] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* 배경 전체 오버레이 */}
      <div
        className="absolute inset-0 bg-black/40 pointer-events-none"
        aria-hidden
      />

      {/* 콘텐츠 래퍼: 오버레이 위에 올라오도록 z-10 */}
      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[435px] flex-col">
        {/* 본문 */}
        <main
          className="flex flex-1 items-center justify-center px-5 py-10"
          aria-labelledby="notfound-title"
        >
          <div className="w-full rounded-2xl bg-[#f7f7f7] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
            <div className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-xl ring-1 ring-black/5">
              <img
                src={Logo}
                alt="페이지를 찾을 수 없습니다"
                className="h-full w-full object-contain"
                loading="lazy"
                draggable={false}
              />
            </div>

            <h1
              id="notfound-title"
              className="mb-3 text-center text-[22px] font-bold tracking-tight text-[#3e352d]"
            >
              페이지를 찾을 수 없습니다
            </h1>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="cursor-pointer inline-flex items-center justify-center rounded-xl border border-[#B19D87] px-4 py-2 text-sm font-medium text-[#6F5E4B] outline-none transition-[transform,box-shadow,background] hover:bg-[#efe9e2] focus-visible:ring-2 focus-visible:ring-[#B19D87] active:scale-[0.98]"
              >
                이전 페이지
              </button>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-xl bg-[#6F5E4B] px-4 py-2 text-sm font-semibold text-white outline-none transition-[transform,box-shadow,background] hover:bg-[#5f513f] focus-visible:ring-2 focus-visible:ring-[#B19D87] active:scale-[0.98]"
              >
                홈으로 가기
              </Link>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/about/map"
                className="rounded-sm px-1 text-[13px] text-[#6F5E4B] underline underline-offset-4 hover:text-[#5f513f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B19D87]"
              >
                전시 안내 보기
              </Link>
            </div>
          </div>
        </main>

        {/* 푸터 */}
        <footer className="pb-6 text-center text-xs text-white/70">
          © 2025_WISCOM
        </footer>
      </div>
    </div>
  )
}

export default NotFoundPage
