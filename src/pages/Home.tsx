import banner from "../assets/banner-2.svg";
import { Hero } from "../components/main/Hero";
import { AdvertisementBanner } from "../components/AdvertisementBanner";
import { KakaoMap } from "../components/kakao/KakaoMap";
import { DatesListContainer } from "../components/main/DatesListContainer";
import { useGetGamesDataQuery } from "../hooks/useGetGamesDataQuery";
import { DateSelectorBox } from "../components/main/browser/DateSelectorBox";
import { GameDetailField } from "../interface/gameInterface";
import { MatchListDetail } from "../components/game/MatchesListContainer";
import { useEffect, useState } from "react";
import { GameDetailCard } from "../components/main/mobile/GameDetailCard";
import { LoadingPage } from "./LoadingPage";

export const Home = () => {
  const [selectingDate, setSelectedDate] = useState(new Date());

  const formatDate = selectingDate.toISOString().split("T")[0];
  const {
    data: allGamesData,
    isPending,
    refetch,
  } = useGetGamesDataQuery(formatDate);

  useEffect(() => {
    refetch();
  }, [selectingDate, refetch]);

  if (isPending) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col gap-6  w-full tablet:px-[13rem] mx-auto  max-w-[90rem]">
      <Hero
        backgroundImage={banner}
        launchText="MITI 서비스 런칭"
        recruitText="MITI와 함께, 경기 모집부터"
        managementText="관리, 결제, 매칭까지 한번에."
      />
      <div className=" flex flex-col ">
        <div className="flex tablet:flex-row mobile:flex-col tablet:gap-10 mobile:gap-4 ">
          <div className="flex flex-col gap-4">
            <DateSelectorBox
              selectingDate={selectingDate}
              setSelectedDate={setSelectedDate}
            />
            <div className="mobile:hidden tablet:block px-4 py-2 flex flex-col gap-4 rounded-lg bg-[#FBFBFB]  h-[409px] overflow-y-scroll">
              {allGamesData?.data.map((game: GameDetailField) => {
                return (
                  <div key={game.id}>
                    <MatchListDetail game={game} />
                    <hr className="w-full bg-[#ECECEC] my-2" />
                  </div>
                );
              })}
            </div>
          </div>{" "}
          <KakaoMap allGamesData={allGamesData} />
          <DatesListContainer isPending={isPending} />
        </div>
      </div>
      <GameDetailCard />
      <AdvertisementBanner />
    </div>
  );
};
