import { useEffect, useState } from "react";
import { NavigateToPrevContainer } from "../../components/NavigateToPrevContainer";
import downArrow from "../../assets/Chevron_Down_MD.svg";
import useUserDataStore from "../../store/useUserDataStore";
import { useGetBankTransferHistory } from "../../hooks/account/useGetBankTransferHistory";
import { NoListFoundMessageBox } from "../../components/common/NoListFoundMessageBox";
import { Link } from "react-router-dom";

export const BankTransferHistoryPage = () => {
  const [defaultTabName, setDefaultTabName] = useState("전체 보기");
  const [gameStatusQuery, setGameStatusQuery] = useState("");
  const [openList, setOpenList] = useState(false);
  const { userId } = useUserDataStore();

  const { data: bankTransferHistoryData } = useGetBankTransferHistory(userId);

  useEffect(() => {
    if (defaultTabName === "전체 보기") {
      setGameStatusQuery("");
    } else if (defaultTabName === "정산 완료") {
      setGameStatusQuery("open");
    } else if (defaultTabName === "부분 정산") {
      setGameStatusQuery("closed");
    } else if (defaultTabName === "대기중") {
      setGameStatusQuery("canceled");
    }
  }, [defaultTabName, gameStatusQuery]);

  const tabList = ["전체보기", "정산 완료", "부분 정산", "대기중"];
  const handleOpenList = () => setOpenList(!openList);
  const handleChangeTab = (tab: string) => setDefaultTabName(tab);

  return (
    <section className="laptop:my-[69px] mobile:mb-16">
      <NavigateToPrevContainer children="송금 내역" />

      <div className="laptop:w-[593px] mobile:w-full mx-auto flex flex-col gap-[22px] ">
        <div>
          <h1 className="text-[26px] w-full font-bold laptop:block mobile:hidden">
            송금하기
          </h1>
          <div className="flex justify-between items-center w-full p-3 border border-gray-200 rounded-lg">
            <span className="text-xs text-[#333]">💰 나의 지갑</span>
            <p className="text-end	text-sm  w-[230px] font-bold">₩ 130,000</p>
            <Link
              to="payment"
              className="w-[85px] h-[36px] flex items-center justify-center text-xs bg-[#4065F5] text-white rounded-lg"
            >
              송금하기
            </Link>
          </div>
        </div>
        <div className="flex justify-between">
          <h1 className="text-[26px] w-full font-bold laptop:block mobile:hidden">
            송금 내역
          </h1>
          <div className="flex justify-end w-full ">
            <div
              onClick={handleOpenList}
              style={{
                borderRadius: !openList ? "8px 8px 8px 8px" : "8px 8px 0px 0px",
              }}
              className="flex items-center  w-[90px] h-[32px] py-2.5 px-1.5 bg-[#f7f7f7]  relative hover:cursor-pointer"
            >
              <p className="text-[14px]">{defaultTabName}</p>
              <img
                src={downArrow}
                alt="open tab icon"
                style={{ rotate: openList ? "180deg" : "0deg" }}
              />

              {openList && tabList && (
                <ul className="absolute left-0 top-8 w-full bg-[#f7f7f7] text-[#969696] text-[14px]  px-2 py-1 flex flex-col gap-1 rounded-br-lg">
                  {tabList.map((tab) => {
                    return (
                      <li
                        onClick={() => handleChangeTab(tab)}
                        className="hover:cursor-pointer"
                      >
                        {tab}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div
          style={{ scrollbarWidth: "thin" }}
          className="overflow-y-auto laptop:w-[593px] bg-[#FBFBFB]  laptop:h-[653px] mobile:h-full   mobile:w-full mx-auto   p-3 rounded-lg  "
        >
          {bankTransferHistoryData?.data.page_content.length === 0 ? (
            <NoListFoundMessageBox
              title="송금 내역이 없습니다."
              content="송금 요청을 통해 정산금을 받아보세요!"
            />
          ) : (
            <>
              {bankTransferHistoryData?.data.page_content.map((page: any) => {
                <div key={page.id}>
                  <div className="flex items-center justify-between py-[15px]">
                    <span className="text-xs text-[#99999999]">
                      {page.created_at}
                    </span>
                    <span className="font-bold text-[#4065F5]">
                      {page.amount}
                    </span>
                    <span>{page.status}</span>
                  </div>
                  <hr />
                </div>;
              })}
            </>
          )}
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};