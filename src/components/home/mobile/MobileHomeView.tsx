// import { KakaoMap } from "../../kakao/KakaoMap";
import { KakaoMap } from "../../kakao/KakaoMap";
import { GameDetailCard } from "./MobileViewGameList";
import { DateListContainer } from "./DateListContainer";
// import { MobileGameDetailCard } from "./MobileGameDetailCard";

export const MobileHomeView = () => {
  return (
    <div className="mobile:block tablet:hidden laptop:hidden flex flex-col px-2">
      <KakaoMap />
      {/* <MobileKakaoMap /> */}

      <DateListContainer />
      <div className="mx-[16px] mt-[20px] mb-[30px]">
        <span>16개의 매치</span>
      </div>
      <div className="mx-[16px] flex flex-col gap-4">
        <GameDetailCard />
      </div>
    </div>
  );
};
