import frame from '../../../assets/frame.svg'
import prof1 from '../../../assets/prof.jpg'

const CongratulationInfo = () => {
  return (
    <section className="px-5 py-6 text-[#4E3F33] text-[14px] leading-[22px]">
      {/* 첫 번째 교수님 */}
      <div className="flex flex-col items-center">
        <div className="relative w-[268px] h-[268px] mb-4">
          <img
            src={frame}
            alt="액자"
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={prof1}
              alt="최승훈 교수님"
              className="w-[176px] h-[176px] object-cover rounded-md"
            />
          </div>
        </div>

        <h3 className="text-[#8F7860] font-semibold text-[22px] mb-5">
          최승훈 교수님
        </h3>

        <div className="text-justify text-[15px] space-y-3">
          <p>2025학년도 컴퓨터공학전공 4학년 학생 여러분!</p>
          <p>위즈컴(WISCOM) 졸업작품 전시회 개최를 진심으로 축하드립니다.</p>
          <p>
            졸업 작품 완성을 위해 끝까지 노력한 열정은 그 어떤 결과물보다
            빛나며, 우리 모두의 자랑입니다. 졸업 프로젝트를 진행하면서 습득한
            전문 지식, 문제 해결 능력, 협업의 가치는 여러분의 삶에 가장 값진
            자산이 될 것입니다.
          </p>
          <p>
            여러분은 앞으로 자신감과 실력을 바탕으로 컴퓨터공학 분야에서 멋진
            활약을 펼쳐나가리라 믿어 의심치 않습니다. 다시 한번, 오늘 이 빛나는
            자리를 만든 4학년 학생 여러분께 뜨거운 박수를 보냅니다.
          </p>
          <p>그동안 정말 수고 많았습니다!</p>
        </div>
        {/* <div className="w-full border-t border-[#E1D9D1] my-8" /> */}
      </div>

      {/* 두 번째 교수님 (같은 방식 적용) */}
      {/* <div className="flex flex-col items-center">
        <div className="relative w-[268px] h-[268px] mb-4">
          <img
            src={frame}
            alt="액자"
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={prof1}
              alt="박우창 교수님"
              className="w-[176px] h-[176px] object-cover rounded-md"
            />
          </div>
        </div>

        <h3 className="text-[#8F7860] font-semibold text-[22px] mb-5">
          박우창 교수님
        </h3>

        <div className="text-justify text-[15px] space-y-3">
          <p>졸업생 여러분!</p>
          <p>
            2024학년도 컴퓨터공학전공 졸업작품 전시회인 위즈컴 개최를 진심으로
            축하드립니다.
          </p>
          <p>
            4년 동안 갈고닦은 실력을 유감없이 발휘하여 끝까지 졸업 작품 완성을
            위해 노력한 여러분 모두가 자랑스럽습니다.
          </p>
          <p>
            여러분들의 졸업 작품은 단순한 결과물을 넘어, 끊임없이 변화하는 IT
            시대를 이끌어갈 젊은 여성 인재들의 꿈과 열정을 보여주는 증표입니다.
          </p>
          <p>
            이러한 경험은 여러분의 삶에 값진 자산이 될 것입니다. 앞으로 사회에
            나가서도 자신감을 가지고 컴퓨터공학 분야에서 멋진 활약을
            펼쳐나가기를 응원합니다.
          </p>
          <p>모두들 수고 많았습니다.</p>
        </div>
      </div> */}
    </section>
  )
}

export default CongratulationInfo
