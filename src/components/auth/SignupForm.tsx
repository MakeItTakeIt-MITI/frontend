import { useForm } from "react-hook-form";
import { userRegisterSchema } from "../../modals/userSignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterField } from "../../interface/usersInterface";
import { userSignup, userValidation } from "../../api/userAuth";

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterField>({ resolver: zodResolver(userRegisterSchema) });

  const handleValidateEmail = () => {
    userValidation({ email: getValues("email") });
  };
  const handleValidateNick = () => {
    userValidation({ nickname: getValues("nickname") });

    // userValidation(nicknameValue);
  };
  const onSubmit = (data: RegisterField) => {
    // console.log(JSON.stringify(data));
    console.log(data);

    // try {
    //   userRegisterSchema.parse(data);
    //   userSignup(data);
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <form
      className="flex flex-col gap-6  mobile:w-full tablet:px-[5rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="email" className="text-[12px] text-[#1c1c1c]">
          이메일
        </label>
        <input
          className=" h-[58px] p-4 bg-[#F7F7F7] rounded-lg"
          type="email"
          id="email"
          placeholder="이메일을 입력해주세요."
          {...register("email", {
            required: true,
          })}
        />
        <button
          onClick={handleValidateEmail}
          type="button"
          className="absolute right-2 bottom-2.5 text-[14px] text-white bg-[#4065F6] w-[81px] h-[36px] rounded-[8px]"
        >
          중복확인
        </button>
      </div>
      {errors.email?.message && (
        <p className=" text-red-500">{errors.email?.message}</p>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-[12px] text-[#1c1c1c]">
          비빌번호
        </label>
        <input
          className=" h-[58px] p-4 bg-[#F7F7F7] rounded-lg"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          id="password-check"
          {...register("password", {
            required: true,
          })}
        />
      </div>
      {errors.password?.message && (
        <p className=" text-red-500">{errors.password?.message}</p>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="password_check" className="text-[12px] text-[#1c1c1c]">
          비빌번호 확인
        </label>
        <input
          className=" h-[58px] p-4 bg-[#F7F7F7] rounded-lg"
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요."
          id="password_check"
          {...register("password_check", {
            required: true,
          })}
        />
      </div>
      {errors.password_check?.message && (
        <p className=" text-red-500">{errors.password_check?.message}</p>
      )}
      <div className="flex flex-col gap-2 ">
        <label htmlFor="name" className="text-[12px] text-[#1c1c1c]">
          이름
        </label>
        <input
          className=" h-[58px] p-4 bg-[#F7F7F7] rounded-lg"
          type="text"
          id="name"
          placeholder="이름을 입력해주세요."
          {...register("name", {
            required: true,
          })}
        />
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="nickname" className="text-[12px] text-[#1c1c1c]">
          닉네임
        </label>
        <input
          className=" h-[58px] p-4 bg-[#F7F7F7] rounded-lg"
          type="text"
          id="nickname"
          placeholder="닉네임을 입력해주세요."
          {...register("nickname", {
            required: true,
          })}
        />
        <button
          onClick={handleValidateNick}
          type="button"
          className="absolute right-2 bottom-2.5 text-[14px] text-white bg-[#4065F6] w-[81px] h-[36px] rounded-[8px]"
        >
          중복확인
        </button>
      </div>
      {errors.nickname?.message && (
        <p className=" text-red-500">{errors.nickname?.message}</p>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="birthday" className="text-[12px] text-[#1c1c1c]">
          생년월일
        </label>
        <input
          className=" h-[58px] p-4 bg-[#F7F7F7] rounded-lg"
          type="date"
          id="birthday"
          {...register("birthday", {
            required: true,
          })}
        />
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="phone_number" className="text-[12px] text-[#1c1c1c]">
          핸드폰 번호
        </label>
        <input
          className=" h-[58px] p-4 bg-[#F7F7F7] rounded-lg"
          type="string"
          id="phone_number"
          pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
          placeholder="000-0000-0000"
          {...register("phone_number", {
            required: true,
          })}
        />
        <button
          type="button"
          className="absolute right-2 bottom-2.5 text-[14px] text-white bg-[#4065F6] w-[81px] h-[36px] rounded-[8px]"
        >
          인증하기
        </button>
      </div>
      {/* <input
        className=" h-[58px] p-4 bg-[#F7F7F7] rounded-lg"
        type="number"
        placeholder="인증번호"
        {...register("confirmation_code", {
          required: true,
        })}
      /> */}
      <button
        type="submit"
        className=" h-[58px] p-4 bg-[#4065F6] rounded-lg text-white"
      >
        가입하기
      </button>
    </form>
  );
};
