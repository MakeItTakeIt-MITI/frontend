import { NavigateToPrevContainer } from "../components/NavigateToPrevContainer";
import { useForm } from "react-hook-form";
import { UserEditField } from "../interface/usersInterface";
import useUserDataStore from "../store/useUserDataStore";
import {
  deleteAccount,
  userEditNickname,
  userEditPassword,
} from "../api/users";
import { useNavigate } from "react-router-dom";
import { useUserInfoQuery } from "../hooks/useUserInfoQuery";
import { LoadingPage } from "./LoadingPage";

export const UserMyPage = () => {
  const { register, watch, getValues, reset } = useForm<UserEditField>();
  const { userId } = useUserDataStore();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useUserInfoQuery(userId);

  console.log("mypage user data query", data);

  const handleDeleteAccount = () => {
    if (window.confirm("정말 계정을 삭제하기겠습니까?")) {
      alert("계정 삭제되었습니다");
      const id = data?.data.id;
      deleteAccount(id);
      localStorage.clear();
      navigate("/login");
    } else {
      alert("취소합니다.");
      return;
    }
  };

  const handleChangeNickname = () => {
    const watchNick = getValues("nickname");

    if (userId != null && watchNick != null) {
      const userEditField: UserEditField = {
        id: userId,
        nickname: watchNick,
      };
      userEditNickname(userId, userEditField);
      reset();
      refetch();
    }
  };

  const handleChangePassword = () => {
    const watchPassword = watch("password");
    const watchPasswordCheck = watch("password_check");
    const id = userId;

    if (watchPassword !== watchPasswordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (id != null && watchPassword != null && watchPasswordCheck !== null) {
      const userEditField: UserEditField = {
        id: id,
        password: watchPassword,
        password_check: watchPasswordCheck,
      };

      userEditPassword(id, userEditField);
      reset();
      refetch();
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className=" mobile:w-full tablet:w-[560px] tablet:mb-0 mx-auto mobile:mb-[4rem] py-3">
      <NavigateToPrevContainer />
      <div className="p-4 flex flex-col gap-2">
        <p className="text-xl">
          {data?.data.name} 님 ({data?.data.nickname})
        </p>
        <p>{data?.data.birthday}</p>
        <p>{data?.data.email}</p>
      </div>
      <hr className="  w-full" />

      <form className="flex flex-col gap-6  mobile:w-full mobile:p-4 ">
        <h4 className="font-bold">닉네임 수정</h4>
        <input
          type="text"
          id="nickname"
          required
          role="input-nickname"
          className=" h-[58px] p-4 bg-[#F7F7F7] rounded-lg w-full "
          placeholder={data?.data.nickname}
          {...register("nickname", {
            required: true,
          })}
        />

        <button
          className=" rounded-xl w-full  h-14 bg-[#4065f6] text-white"
          onClick={handleChangeNickname}
          type="button"
          role="change-nickname"
        >
          닉네임 수정
        </button>
        <h4 className="font-bold">비밀번호 변경</h4>

        <input
          type="password"
          id="password"
          required
          role="input-password"
          className=" h-[58px] p-4 bg-[#F7F7F7] rounded-lg w-full "
          placeholder="새로운 비밀번호를 입력해주세요."
          {...register("password", {
            required: true,
          })}
        />
        <input
          type="password"
          id="password_check"
          required
          role="input-password-confirm"
          className=" h-[58px] p-4 bg-[#F7F7F7] rounded-lg w-full "
          placeholder="확인 비밀번호를 입력해주세요."
          {...register("password_check", {
            required: true,
          })}
        />

        <button
          type="button"
          role="change-password"
          onClick={handleChangePassword}
          className="rounded-xl w-full h-14 bg-[#4065f6] text-white"
        >
          비밀번호 수정
        </button>
      </form>
      <hr className="mobile:block tablet:hidden w-full" />

      <div className="p-4 flex flex-col gap-4">
        <h4 className="font-bold">계정 삭제</h4>

        <button
          type="button"
          onClick={handleDeleteAccount}
          className=" rounded-xl w-full  h-14 bg-[#db5e5e] text-white"
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
};
