// import frameImg from '../../assets/Works.png'

// type Size = 'sm' | 'md' | 'lg'

// interface Props {
//   image: string
//   onClick?: () => void
//   size?: Size
// }

// // 액자 PNG 안쪽 영역 비율 (임시 값, PNG 실제 디자인에 맞게 조정하세요)
// const INSET = {
//   sm: { top: '14%', left: '12%', right: '12%', bottom: '14%' },
//   md: { top: '12%', left: '10%', right: '10%', bottom: '12%' },
//   lg: { top: '10%', left: '9%', right: '9%', bottom: '10%' },
// }

// export default function FrameCard({ image, onClick, size = 'md' }: Props) {
//   const wh =
//     size === 'lg'
//       ? 'h-[340px] w-[250px] max-lg:h-[300px] max-lg:w-[220px]'
//       : size === 'sm'
//         ? 'h-[240px] w-[175px] max-lg:h-[220px] max-lg:w-[160px]'
//         : 'h-[300px] w-[220px] max-lg:h-[260px] max-lg:w-[190px]'

//   const pad = INSET[size]
//   const src = image?.startsWith('http://') ? 'https://' + image.slice(7) : image

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`snap-center shrink-0 outline-none transition-transform duration-300 ${
//         size === 'lg' ? 'scale-105' : 'scale-100'
//       }`}
//     >
//       <div className={`relative ${wh}`}>
//         {/* 액자 이미지 */}
//         <img
//           src={frameImg}
//           alt="frame"
//           className="absolute inset-0 h-full w-full object-contain pointer-events-none select-none z-10"
//           draggable={false}
//         />

//         {/* 사진 - 액자 안쪽 패딩 적용 */}
//         <div
//           className="absolute flex items-center justify-center overflow-hidden rounded-sm"
//           style={{
//             top: pad.top,
//             left: pad.left,
//             right: pad.right,
//             bottom: pad.bottom,
//           }}
//         >
//           <img
//             src={src}
//             alt="work"
//             className="h-[75%] w-full object-cover"
//             loading="lazy"
//           />
//         </div>
//       </div>
//     </button>
//   )
// }

import frameImg from '../../assets/Works.png'

type Size = 'sm' | 'md' | 'lg'

interface Props {
  image: string
  onClick?: () => void
  size?: Size
  focused?: boolean // ✅ 추가
}

// 액자 PNG 안쪽 영역 비율
const INSET = {
  sm: { top: '14%', left: '12%', right: '12%', bottom: '14%' },
  md: { top: '12%', left: '10%', right: '10%', bottom: '12%' },
  lg: { top: '10%', left: '9%', right: '9%', bottom: '10%' },
}

export default function FrameCard({
  image,
  onClick,
  size = 'md',
  focused = false,
}: Props) {
  const wh =
    size === 'lg'
      ? 'h-[340px] w-[250px] max-lg:h-[300px] max-lg:w-[220px]'
      : size === 'sm'
        ? 'h-[240px] w-[175px] max-lg:h-[220px] max-lg:w-[160px]'
        : 'h-[300px] w-[220px] max-lg:h-[260px] max-lg:w-[190px]'

  const pad = INSET[size]
  const src = image?.startsWith('http://') ? 'https://' + image.slice(7) : image

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        snap-center shrink-0 outline-none transition-transform duration-300
        ${focused ? 'scale-110' : 'scale-95'}   //포커스 여부에 따라 크기 조정
      `}
    >
      <div className={`relative ${wh}`}>
        {/* 액자 이미지 */}
        <img
          src={frameImg}
          alt="frame"
          className="absolute inset-0 h-full w-full object-contain pointer-events-none select-none z-10"
          draggable={false}
        />

        {/* 사진 - 액자 안쪽 패딩 적용 */}
        <div
          className="absolute flex items-center justify-center overflow-hidden rounded-sm"
          style={{
            top: pad.top,
            left: pad.left,
            right: pad.right,
            bottom: pad.bottom,
          }}
        >
          <img
            src={src}
            alt="work"
            className="h-[75%] w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </button>
  )
}
