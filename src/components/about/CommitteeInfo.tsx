const CommitteeInfo = () => {
  return (
    <section className="px-5 py-6">
      <h3 className="text-[15px] leading-[28px] font-semibold mb-6 text-[#8F7860] text-center">
        COMMITTEE
        <br />
        제35회 컴퓨터공학전공
        <br />
        졸업전시준비위원회
      </h3>

      <ul className="text-[12px] leading-[20px] text-[#000000] space-y-1">
        <li className="flex">
          <span className="w-20">위원장</span>
          <span>김희원</span>
        </li>
        <li className="flex">
          <span className="w-20">부위원장</span>
          <span>박효진</span>
        </li>
        <li className="flex">
          <span className="w-20">디자인</span>
          <span>이한비</span>
        </li>
        <li className="flex">
          <span className="w-20">기획</span>
          <span>김미주 김희원 박효진 이채은 장은선 황민지</span>
        </li>
        <li className="flex">
          <span className="w-20">프론트엔드</span>
          <span>김미주 김진효 김희원 박효진</span>
        </li>
        <li className="flex">
          <span className="w-20">백엔드</span>
          <span>김은서 장다연 하늘새미 황민지</span>
        </li>
      </ul>
    </section>
  )
}

export default CommitteeInfo
