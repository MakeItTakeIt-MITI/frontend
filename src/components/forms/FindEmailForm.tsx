import { useForm } from "react-hook-form";
import { FindEmailField } from "../../user/FindMyEmailModal";
import { useFindEmailMutation } from "../../hooks/useFindEmailMutation";

export const FindEmailForm = () => {
  const { register, handleSubmit, setValue } = useForm<FindEmailField>({});
  const { mutate, data: userData, isError, isSuccess } = useFindEmailMutation();

  const requestAuthenCode = (data: FindEmailField) => {
    mutate(data, {
      onSuccess: (userData) => {
        const authentication_token = userData?.data.authentication_token;
        localStorage.setItem("authentication_token", authentication_token);
      },
    });
    setValue("phone", "");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(requestAuthenCode)}
        className="flex gap-4 h-[60px]"
      >
        <input
          type="text"
          {...register("phone", {
            required: true,
          })}
          placeholder="'-'을 제외한 휴대폰번호를 입력해주세요."
          className="email-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
        />
        <button className=" bg-[#4065F6] w-[150px] text-white px-4 py-2 rounded-lg  ">
          {userData?.status_code === 201 ? "다시 요청" : "인증 요청"}
        </button>
      </form>
      {isSuccess && (
        <p className="text-green-500 text-center">
          인증번호가 문자로 발송되었습니다.
        </p>
      )}
      {isError && (
        <p className="text-red-500 text-center">일치 사용자 정보 조회 실패</p>
      )}
    </>
  );
};
