import { useState } from "react";
import { GameHostForm } from "../../components/forms/GameHostForm";
import { NavigateToPrevContainer } from "../../components/NavigateToPrevContainer";
import { SuccessfulSubmitContainer } from "../../components/common/SuccessfulSubmitContainer";

export const HostGamePage = () => {
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  return (
    <section className="section-layer">
      <NavigateToPrevContainer children="경기 생성하기" />
      {!successfulSubmission ? (
        <div className="relative laptop:w-[495px]  laptop:min-h-[735px] mobile:h-full   mobile:w-full mx-auto  laptop:border border-gray-300 mobile:py-8    mobile:px-4 laptop:py-[50px] laptop:px-[76px] rounded-lg flex flex-col laptop:justify-center mobile:gap-0 laptop:gap-[35px] mobile:justify-between">
          <h4 className="mobile:hidden laptop:block font-bold  text-[26px]">
            경기 생성하기
          </h4>
          <GameHostForm setSuccessfulSubmission={setSuccessfulSubmission} />
        </div>
      ) : (
        <SuccessfulSubmitContainer
          header="경기 생성 완료!"
          context="아래 버튼을 통해 경기 정보를 확인하세요."
          buttonContext="경기 정보 조회"
          path="/"
        />
      )}
    </section>
  );
};
