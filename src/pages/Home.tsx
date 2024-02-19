import banner from "../assets/banner-2.svg";
import { Hero } from "../components/main/Hero";
import { AdvertisementBanner } from "../components/AdvertisementBanner";

import { KakaoMap } from "../components/kakao/KakaoMap";

import { GameDetailCard } from "../components/main/mobile/GameDetailCard";
import { DatesListContainer } from "../components/main/DatesListContainer";
import { useGetGamesDataQuery } from "../hooks/useGetGamesDataQuery";
import { DateSelectorBox } from "../components/main/browser/DateSelectorBox";
import { Link } from "react-router-dom";
import { GameDetailField } from "../interface/gameInterface";

export const Home = () => {
  const { data: allGamesData } = useGetGamesDataQuery();

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
            <DateSelectorBox />
            <div className="mobile:hidden tablet:block px-4 py-2 flex flex-col gap-4 rounded-lg bg-[#FBFBFB]  h-[409px] overflow-y-scroll">
              {allGamesData?.data.map((game: GameDetailField) => {
                return (
                  <>
                    <Link
                      to={`/games/detail/${game.id}`}
                      key={game.id}
                      className=""
                    >
                      <div className="flex flex-col gap-1 ">
                        <h2 className="font-bold text-[18px] truncate">
                          {game.title}{" "}
                        </h2>
                        <p className="text-[14px] text-gray-500">
                          {`${game.startdate} ${game.starttime.slice(
                            0,
                            -3
                          )} ~ ${game.endtime.slice(0, -3)}`}
                        </p>
                        <p className="text-[14px] text-red-500 font-bold">
                          {game.fee.toLocaleString("ko-KR", {
                            style: "currency",
                            currency: "KRW",
                          })}
                        </p>
                      </div>
                    </Link>
                    <hr className="w-full bg-[#ECECEC] " />
                  </>
                );
              })}
            </div>
          </div>{" "}
          <KakaoMap allGamesData={allGamesData} />
          <DatesListContainer />
        </div>
      </div>
      {/* <div className=" flex mobile:flex-col  mobile:gap-4 tablet:flex-row tablet:flex-wrap  items-center   "> */}
      <GameDetailCard />
      {/* </div> */}

      <AdvertisementBanner />
    </div>
  );
};
