const MapInfo = () => {
  return (
    <div className="bg-[#F3F0ED] text-[#3A2F26] px-6 pt-10 pb-24 space-y-10 text-sm leading-relaxed">
      <div>
        <h2 className="font-semibold text-[17px] text-[#927D67]">
          Venue Guide <span className="text-[#3A2F26]">전시장 안내</span>
        </h2>
        <p className="mt-2">
          장소
          <br />
          서울특별시 도봉구 마들로13길 84 서울 창업허브 창동
        </p>
        <p className="mt-2">
          일시
          <br />
          2024. 10. 29. (화) - 2024. 12. 21. (수)
        </p>
      </div>

      <div>
        <h2 className="font-semibold text-[17px] text-[#927D67]">
          Getting Here <span className="text-[#3A2F26]">교통편</span>
        </h2>
        <p className="mt-2">
          지하철
          <br />
          1, 4호선 창동역
        </p>
        <p className="mt-2">
          버스
          <br />
          1119, 노원 15, 도봉 01, 도봉 08, 도봉 09
        </p>
      </div>

      <div>
        <h2 className="font-semibold text-[17px] text-[#927D67]">
          Parking Information <span className="text-[#3A2F26]">주차장</span>
        </h2>
        <p className="mt-2">
          주차장
          <br />
          지하주차장 이용 가능
        </p>
        <p className="mt-2">
          주차비
          <br />
          하루에 최대 만 원 (30분 무료, 이후 10분당 500원)
          <br />
          만차 시, 창동 공영 주차장을 이용해주시기 바랍니다.
        </p>
      </div>
    </div>
  )
}

export default MapInfo
