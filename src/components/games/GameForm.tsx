import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface OperateGame {
  startdate: string;
  starttime: string;
  enddate: string;
  endtime: string;
  min_invitation: number;
  max_invitation: number;
  address: string;
  address_detail: string;
  title: string;
  fee: number;
  info: string;
}

export const GameForm = () => {
  const { register, handleSubmit } = useForm<OperateGame>();
  const navigate = useNavigate();

  const onSubmit = (data: OperateGame) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-4 mobile:text-[12px] tablet:text-[16px] "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mx-auto flex items-center gap-2">
        <label htmlFor="">주소</label>
        <input
          className="mobile:w-[250px] mobile:mx-auto tablet:w-[350px] h-[35px] bg-[#F3F5F7] rounded-lg border border-gray-200 p-2"
          type="text"
          placeholder="주소"
          {...register("address", {
            required: true,
          })}
        />
      </div>
      <div className="mx-auto flex items-center gap-2">
        <label htmlFor="">상세주소</label>
        <input
          className="mobile:w-[250px] mobile:mx-auto tablet:w-[350px] h-[35px] bg-[#F3F5F7] rounded-lg border border-gray-200 p-2"
          type="text"
          placeholder="상세주소"
          {...register("address_detail", {
            required: true,
          })}
        />
      </div>
      <div className="mx-auto flex items-center gap-2">
        <label htmlFor="">경기 제목</label>
        <input
          className="mobile:w-[250px] mobile:mx-auto tablet:w-[350px] h-[35px] bg-[#F3F5F7] rounded-lg border border-gray-200 p-2"
          type="text"
          placeholder="제목"
          {...register("title", {
            required: true,
          })}
        />
      </div>
      <div className="mx-auto flex items-center gap-2">
        <label htmlFor="경기 시작">경기 시작</label>
        <input
          className="mobile:w-[150px] mobile:mx-auto tablet:w-[350px] h-[35px] bg-[#F3F5F7] rounded-lg border border-gray-200 p-2"
          type="date"
          placeholder="경기 시작"
          {...register("startdate", {
            required: true,
          })}
        />
        <input
          className="mobile:w-[100px] mobile:mx-auto tablet:w-[350px] h-[35px] bg-[#F3F5F7] rounded-lg border border-gray-200 p-2"
          type="time"
          placeholder="경기 시작"
          {...register("startdate", {
            required: true,
          })}
        />
      </div>
      <div className="mx-auto flex items-center gap-2">
        <label htmlFor="경기 시작">경기 종료</label>
        <input
          className="mobile:w-[150px] mobile:mx-auto tablet:w-[250px] h-[35px] bg-[#F3F5F7] rounded-lg border border-gray-200 p-2"
          type="date"
          placeholder="경기 시작"
          {...register("startdate", {
            required: true,
          })}
        />
        <input
          className="mobile:w-[100px] mobile:mx-auto tablet:w-[250px] h-[35px] bg-[#F3F5F7] rounded-lg border border-gray-200 p-2"
          type="time"
          placeholder="경기 시작"
          {...register("startdate", {
            required: true,
          })}
        />
      </div>
      <div className="mx-auto flex items-center gap-2">
        <label htmlFor="">최소 참여자</label>
        <input
          className="mobile:w-[250px] mobile:mx-auto tablet:w-[350px] h-[35px] bg-[#F3F5F7] rounded-lg border border-gray-200 p-2"
          type="number"
          {...register("address", {
            required: true,
          })}
        />
      </div>
      <div className="mx-auto flex items-center gap-2">
        <label htmlFor="">최대 참여자</label>
        <input
          className="mobile:w-[250px] mobile:mx-auto tablet:w-[350px] h-[35px] bg-[#F3F5F7] rounded-lg border border-gray-200 p-2"
          type="number"
          {...register("address", {
            required: true,
          })}
        />
      </div>
      <div className="mx-auto flex items-center gap-2">
        <label htmlFor="">참여비</label>
        <input
          className="mobile:w-[250px] mobile:mx-auto tablet:w-[350px] h-[35px] bg-[#F3F5F7] rounded-lg border border-gray-200 p-2"
          type="number"
          {...register("fee", {
            required: true,
          })}
        />
      </div>
      <div className="mx-auto flex items-center gap-2">
        <label htmlFor="">전달사항</label>
        <input
          className="mobile:w-[250px] mobile:mx-auto tablet:w-[350px] h-[35px] bg-[#F3F5F7] rounded-lg border border-gray-200 p-2"
          type="textbox"
          {...register("info", {
            required: true,
          })}
        />
      </div>
      <button className="bg-[#4065F6] mobile:w-[250px]  mobile:mx-auto tablet:w-[350px]  text-white p-[0.5rem] rounded-lg	">
        경기 만들기
      </button>
    </form>
  );
};
