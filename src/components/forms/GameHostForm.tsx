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

export const GameHostForm = () => {
  const { handleSubmit, register, setValue, watch, formState } =
    useForm<GameHostField>();
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  // tanstack query
  const courtAddress = watch("court.address") || "";
  const { data: getAddressDetail, refetch } =
    useCourtDetailsQuery(courtAddress);
  const { mutate: hostGameMutation, isError } = useHostGameMutation();

  //
  useEffect(() => {
    const startDate = startDateTime.split("T")[0];
    const startTime = startDateTime.split("T")[1];
    const endDate = endDateTime.split("T")[0];
    const endTime = endDateTime.split("T")[1];
    const fullAddress = courtAddress;

    setValue("starttime", startTime);
    setValue("startdate", startDate);
    setValue("enddate", endDate);
    setValue("endtime", endTime);

    // if address already exists, automatically add address_detail
    getAddressDetail?.data.map((address: Court) => {
      if (fullAddress === address.address) {
        setValue("court.address_detail", address.address_detail);
      } else {
        setValue("court.address_detail", "");
      }
    });

    refetch();
  }, [
    courtAddress,

    refetch,
    setValue,
    startDateTime,
    endDateTime,
    getAddressDetail,
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
    console.log(data);

    hostGameMutation(data);
  };

  return (
    <form
      className="flex flex-col gap-4  justify-between mobile:w-full  mobile:text-[14px] tablet:text-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h4 className="font-bold tablet:text-2xl tablet:text-center">
        경기 정보
      </h4>
      {isError && (
        <div>
          <p className="text-red-500 text-center">매치 생성에 실패했습니다.</p>
          <p className="text-red-500 text-center">
            입력한 정보를 다시 한번 확인해주세요.
          </p>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className=" text-[#999] ">
          경기 제목
        </label>

        <input
          type="text"
          id="title"
          placeholder="ex.) 수원 매탄 공원 4 vs 4 (주차 12자리)"
          className=" h-[50px] px-4 py-[17px] rounded-lg bg-[#F7F7F7] w-full"
          {...register("title", {
            required: true,
          })}
        />
      </div>
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

      <div className="flex flex-col gap-2">
        <label className="text-[#999]">경기 시작</label>
        <div className="flex gap-2 w-full">
          <div className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] w-full rounded-lg ">
            {startDateTime.split("T")[0]} {startDateTime.split("T")[1]}
          </div>
          <input
            type="datetime-local"
            id="start_date"
            required
            className="w-[54px] h-[50px] p-4 py-[17px] bg-[#F7F7F7] text-[#999] rounded-lg "
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

      <div className="flex flex-col gap-2 justify-center ">
        <label className="text-[#999]">경기 종료</label>

        <div className="flex items-center gap-2 w-full">
          <div className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] w-full rounded-lg ">
            {endDateTime.split("T")[0]} {endDateTime.split("T")[1]}
          </div>
          <input
            type="datetime-local"
            placeholder="Select date and time"
            required
            onChange={(e) => setEndDateTime(e.target.value)}
            className="w-[54px] h-[50px] p-4 py-[17px] bg-[#F7F7F7] text-[#999] rounded-lg "
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

      <div className="flex flex-col gap-2 relative">
        <label htmlFor="address" className=" text-[#999]">
          경기 주소
        </label>

        <input
          className="input-primary pr-[99px]"
          type="text"
          {...register("court.address")}
          value={watch("court.address")}
          readOnly
          placeholder="경기장 주소를 입력해주세요."
        />
        <button
          type="button"
          onClick={handleClick}
          className=" w-[81px] h-9 absolute  right-2 bottom-2.5 text-[14px] bg-[#4065f6] text-[#FFF] font-[400]  rounded-lg"
        >
          주소찾기
        </button>
      </div>

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

      <div className="flex gap-4  items-center mobile:justify-between ">
        <div className="flex flex-col gap-2 tablet:w-full">
          <label htmlFor="max_players" className=" text-[#999]">
            총 모집 인원
          </label>
          <input
            type="number"
            id="max_players"
            placeholder="00명"
            className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] rounded-lg  w-full text-center font-bold"
            {...register("max_invitation", {
              required: true,
            })}
          />
        </div>
        <div className="flex flex-col gap-2 tablet:w-full">
          <label htmlFor="min_players" className=" text-[#999]">
            최소 모집 인원
          </label>

          <input
            type="number"
            id="min_players"
            placeholder="00명"
            className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] w-full rounded-lg text-center font-bold"
            {...register("min_invitation", {
              required: true,
            })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="announcement" className=" text-[#999]">
          추가 정보
        </label>
        <textarea
          id="announcement"
          placeholder="주차 4자리 가능, 샤워 불가, 4 vs 4, 파란 유니폼 지참, 남녀 모두 참가 가능한 매치입니다"
          className="w-full   mobile:text-[14px] tablet:text-[16px] px-4 py-3 bg-[#F7F7F7] rounded-lg "
          {...register("info", {
            required: true,
          })}
        />
      </div>

      <hr className="h-[8px] w-full bg-gray-200" />

      <h4 className="font-bold">경기 정보</h4>
      <div className="flex w-full px-0 flex-col gap-2">
        <label htmlFor="fee" className=" text-[#999]">
          참여비
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

      <div className="flex items-center mobile:justify-between tablet:justify-center gap-4 tablet:w-full">
        <div className="flex flex-col gap-2 tablet:w-full">
          <h5 className="text-[#969696] ">예금 은행</h5>
          <input
            placeholder="우리은행"
            {...register("account_bank", {
              required: true,
            })}
            className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] w-full rounded-lg text-center font-[500]"
          />
        </div>
        <div className="flex flex-col gap-2 tablet:w-full">
          <h5 className="text-[#969696]">예금주</h5>
          <input
            placeholder="홍길동"
            {...register("account_holder", {
              required: true,
            })}
            className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] w-full rounded-lg text-center font-[500]"
          />
        </div>
      </div>

      <div className="flex w-full px-0 flex-col gap-2">
        <label htmlFor="account_number" className=" text-[#999]">
          계좌번호
        </label>
        <input
          type="text"
          id="account_number"
          placeholder="'-'을 제외한 계좌번호를 입력해주세요."
          className=" h-[50px] p-4 py-[17px] bg-[#F7F7F7] rounded-lg"
          {...register("account_number", {
            required: true,
          })}
        />
      </div>

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
