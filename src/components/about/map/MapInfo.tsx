const MapInfo = () => {
  return (
    <div className="bg-[#F3F0ED] text-[#3A2F26] px-6 pt-5 pb-24 space-y-10 text-sm leading-relaxed">
      <div>
        <h2 className="font-semibold text-[22px] text-[#927D67]">
          Venue Guide{' '}
          <span className="text-[#8F7860] text-[15px]">전시장 안내</span>
        </h2>
        <p className="mt-2 text-[15px] font-bold">장소</p>
        <p className="text-[15px]">
          서울특별시 도봉구 마들로13길 84 서울 창업허브 창동
        </p>

        <p className="mt-2 text-[15px] font-bold">일시</p>
        <p className="text-[15px]">2025. 10. 30. (목) - 2025. 10. 31. (금)</p>
      </div>

      <div>
        <h2 className="font-semibold text-[22px] text-[#927D67]">
          Getting Here{' '}
          <span className="text-[#8F7860] text-[15px]">교통편</span>
        </h2>
        <p className="mt-2 text-[15px] font-bold">지하철</p>
        <p className="text-[15px]">1, 4호선 창동역</p>
        <p className="mt-2 text-[15px] font-bold">버스</p>
        <p className="text-[15px]">1119, 노원 15, 도봉 01, 도봉 08, 도봉 09</p>
      </div>

      <div>
        <h2 className="font-semibold text-[22px] text-[#927D67]">
          Parking Information{' '}
          <span className="text-[#8F7860] text-[15px]">주차장</span>
        </h2>
        <p className="mt-2 text-[15px] font-bold">주차장</p>
        <p className="text-[15px]"> 지하주차장 이용 가능</p>
        <p className="mt-2 text-[15px] font-bold">주차비</p>
        <p className="text-[15px]">
          {' '}
          하루에 최대 만 원 (30분 무료, 이후 10분당 500원)
          <br />
          만차 시, 창동 공영 주차장을 이용해주시기 바랍니다.
        </p>
      </div>
    </div>
  )
}

export default MapInfo
