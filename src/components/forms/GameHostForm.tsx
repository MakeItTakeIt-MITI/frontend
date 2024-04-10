import { useForm } from "react-hook-form";
import {
  AddressField,
  Court,
  GameHostField,
} from "../../interface/gameInterface";
import { useEffect, useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useHostGameMutation } from "../../hooks/useHostGameMutation";
import { useCourtDetailsQuery } from "../../hooks/useCourtDetailsQuery";

export const GameHostForm = ({ setShowModal }) => {
  const { handleSubmit, register, setValue, watch, formState } =
    useForm<GameHostField>();
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  // const [exisitingAddresses, setExistingAddresses] = useState("");

  // tanstack query
  const courtAddress = watch("court.address") || "";
  console.log(courtAddress);
  const { data: getCourtInformation, refetch } =
    useCourtDetailsQuery(courtAddress);
  // console.log(getCourtInformation);

  const { mutate: hostGameMutation } = useHostGameMutation();

  if (getCourtInformation) {
    console.log(getCourtInformation.data.page_content);
  }

  // useEffect to check address when component mounts or existingCourtAddresses change

  useEffect(() => {
    const startDate = startDateTime.split("T")[0];
    const startTime = startDateTime.split("T")[1];
    const endDate = endDateTime.split("T")[0];
    const endTime = endDateTime.split("T")[1];
    // const fullAddress = courtAddress;

    setValue("starttime", startTime);
    setValue("startdate", startDate);
    setValue("enddate", endDate);
    setValue("endtime", endTime);

    const emptyAddressList: string[] = [];
    // if address already exists, automatically add address_detail
    getCourtInformation?.data.page_content.map((address: Court) => {
      if (courtAddress === address.address) {
        // setValue("court.address_detail", address.address_detail);
        console.log("true");
        emptyAddressList.push(address.address_detail);
        setShowModal(true);
      } else {
        // setValue("court.address_detail", "");
        console.log("false");
      }
    });
    console.log(emptyAddressList);

    refetch();
  }, [
    courtAddress,
    refetch,
    setValue,
    startDateTime,
    endDateTime,
    getCourtInformation,
    setShowModal,
  ]);

  const handleOpenAddressBox = useDaumPostcodePopup();

  const handleComplete = (data: AddressField) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setValue("court.address", fullAddress);
  };

  const handleClick = () => {
    handleOpenAddressBox({ onComplete: handleComplete });
  };

  const onSubmit = (data: GameHostField) => {
    hostGameMutation(data);
  };

  return (
    <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className=" text-[#999] ">
          경기 제목
        </label>

        <input
          type="text"
          id="title"
          placeholder="경기 제목을 입력해주세요."
          className=" h-[50px] px-4 py-[17px] rounded-lg bg-[#F7F7F7] w-full"
          {...register("title", {
            required: true,
          })}
        />
      </div>
      {/* Game start date and time */}
      <div className="flex flex-col gap-2">
        <label className="text-[#999]">경기 시작</label>
        <div className="flex gap-2 w-full">
          <div className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] text-[#969696] w-full rounded-lg ">
            {startDateTime.length > 1 ? startDateTime.split("T")[0] : null}{" "}
            {startDateTime.length > 1
              ? startDateTime.split("T")[1]
              : "경기 시간을 선택해주세요."}
          </div>

          <input
            type="datetime-local"
            id="start_date"
            required
            className=" w-[54px] h-[50px] p-4 py-[17px] bg-[#DFEFFE] text-[#999] rounded-lg "
            onChange={(e) => setStartDateTime(e.target.value)}
          />

          <input
            hidden
            type="text"
            id="start_date"
            className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] w-full"
            {...register("startdate", {})}
          />
          <input
            hidden
            type="text"
            id="start_time"
            className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] rounded-lg"
            {...register("starttime", {})}
          />
        </div>
      </div>
      {/* 경기 종료 */}
      <div className="flex flex-col gap-2 justify-center ">
        <label className="text-[#999]">경기 종료</label>

        <div className="flex items-center gap-2 w-full">
          <div className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] text-[#969696] w-full rounded-lg ">
            {/* {endDateTime.split("T")[0]} {endDateTime.split("T")[1]} */}
            {endDateTime.length > 1 ? endDateTime.split("T")[0] : null}{" "}
            {endDateTime.length > 1
              ? endDateTime.split("T")[1]
              : "경기 시간을 선택해주세요."}
          </div>
          <input
            type="datetime-local"
            placeholder="Select date and time"
            required
            onChange={(e) => setEndDateTime(e.target.value)}
            className="w-[54px] h-[50px] p-4 py-[17px] bg-[#DFEFFE] text-[#999] rounded-lg "
          />

          <input
            hidden
            type="text"
            id="end_date"
            className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] "
            {...register("enddate", {})}
          />
          <input
            hidden
            type="text"
            id="endtime"
            className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] rounded-lg"
            step={900}
            {...register("endtime", {})}
          />
        </div>
      </div>
      {/* game address */}
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="address" className=" text-[#999] ">
          경기 주소
        </label>

        <div className=" h-[50px] p-4 truncate   bg-[#F7F7F7] text-[#969696]  w-full rounded-lg  pr-[120px]">
          {watch("court.address")}
        </div>
        <input
          hidden
          // className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] rounded-lg"
          type="text"
          {...register("court.address")}
          // value={watch("court.address")}
          readOnly
          placeholder="주소를 검색해주세요."
        />
        <button
          type="button"
          onClick={handleClick}
          className=" w-[81px] h-9 absolute  right-2 bottom-2 text-[14px] bg-[#4065f6] text-[#FFF] font-[400]  rounded-lg"
        >
          주소찾기
        </button>
      </div>
      {/* address detail */}
      <div className="flex flex-col gap-2">
        <label htmlFor="address_detail" className=" text-[#999]">
          상세 주소
        </label>
        <input
          type="text"
          id="address_detail"
          className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] rounded-lg"
          placeholder="상세 주소를 입력해주세요."
          {...register("court.address_detail")}
        />
      </div>
      {/* court name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className=" text-[#999]">
          경기장 이름
        </label>

        <input
          type="text"
          id="title"
          placeholder="경기장 이름을 입력해주세요"
          className=" h-[50px] px-4 py-[17px] rounded-lg bg-[#F7F7F7] w-full"
          {...register("court.name", {
            required: true,
          })}
        />
      </div>

      {/* max participants */}
      <div className="flex gap-4  items-center mobile:justify-between ">
        <div className="flex flex-col gap-2 tablet:w-full">
          <label htmlFor="max_players" className=" text-[#999]">
            총 모집 인원
          </label>
          <input
            type="number"
            id="max_players"
            placeholder="00 명"
            className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] rounded-lg  w-full text-center font-bold"
            {...register("max_invitation", {
              required: true,
            })}
          />
        </div>

        {/* recruiting participants */}
        <div className="flex flex-col gap-2 tablet:w-full">
          <label htmlFor="min_players" className=" text-[#999]">
            최소 모집 인원
          </label>
          <input
            type="number"
            id="min_players"
            placeholder="00 명"
            className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] w-full rounded-lg text-center font-bold"
            {...register("min_invitation", {
              required: true,
            })}
          />
        </div>
      </div>

      {/* participation fee */}
      <div className="flex w-full px-0 flex-col gap-2">
        <label htmlFor="fee" className=" text-[#999]">
          참가비
        </label>
        <input
          type="number"
          id="fee"
          placeholder="경기 참여비를 입력해주세요."
          className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] rounded-lg"
          {...register("fee", {
            required: true,
          })}
        />
      </div>
      {/* information */}
      <div className="flex flex-col gap-2">
        <label htmlFor="announcement" className=" text-[#999]">
          추가 정보
        </label>
        <textarea
          id="announcement"
          placeholder="주차 4자리 가능, 샤워 불가, 4 vs 4, 파란 유니폼 지참, 남녀 모두 참가 가능한 매치입니다"
          className="w-full   mobile:text-[14px] tablet:text-[16px] px-4 py-3 bg-[#F7F7F7] rounded-lg "
          {...register("info")}
        />
      </div>

      {/* <hr className="h-[8px] w-full bg-gray-200" /> */}

      {/* <h4 className="font-bold">경기 정보</h4> */}

      <button
        disabled={!formState.isValid}
        style={{
          backgroundColor: !formState.isValid ? "#969696" : "#4065F6",
        }}
        type="submit"
        className=" w-full h-[50px] rounded-[8px] text-white"
      >
        매치 생성하기
      </button>
    </form>
  );
};
