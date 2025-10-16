import StudioCard from './StudioCard'
import StudioLayout from './StudioLayout'

import BoothList from '../../data/boothList.json'

const FloorPlan = () => {
  return (
    <>
      <div className="pt-[20px] px-[20px]">
        <h1 className="text-[#8F7860] text-[22px] font-medium leading-[32px]">
          Exhibition Floor Plan
          <span className="ml-[8px] text-[#8F7860] text-[15px] font-medium leading-[24px]">
            부스 배치도
          </span>
        </h1>
      </div>

      <StudioLayout />

      <div className="mb-[36px]">
        {BoothList.map((list) => (
          <StudioCard key={list.id} studio={list.studio} teams={list.teams} />
        ))}
      </div>
    </>
  )
}

export default FloorPlan
