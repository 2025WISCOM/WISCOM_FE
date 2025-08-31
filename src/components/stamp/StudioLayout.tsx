const StudioLayout = () => {
  return (
    <div className="mt-[16px] px-[20px]">
      <div className="h-[160px] border border-[1px] border-[#BDAD9B] relative text-[#fff] text-[12px] font-medium leading-[16px]">
        <div className="absolute top-[10px] left-0 w-[80px] h-[32px] bg-[#533434] flex items-center justify-center">
          Studio 10
        </div>

        <div className="absolute top-[23px] right-0 w-[80px] h-[32px] bg-[#635F37] flex items-center justify-center">
          Studio 6
        </div>

        <div className="absolute top-[59px] right-0 w-[80px] h-[32px] bg-[#243D1A] flex items-center justify-center">
          Studio 5
        </div>

        <div className="absolute left-[8px] bottom-0 w-[55px] h-[80px] bg-[#3C2A4D] flex items-center justify-center">
          Studio 1
        </div>

        <div className="absolute left-[67px] bottom-0 w-[55px] h-[80px] bg-[#1E3A5F] flex items-center justify-center">
          Studio 2
        </div>

        <div className="absolute left-[126px] bottom-0 w-[64px] h-[55px] bg-[#2D5869] flex items-center justify-center">
          Studio 3
        </div>

        <div className="absolute right-0 bottom-0 w-[104px] h-[55px] bg-[#5B5B5B] flex items-center justify-center">
          Studio 4
        </div>
      </div>
    </div>
  )
}

export default StudioLayout
