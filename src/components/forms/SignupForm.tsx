import { useForm } from "react-hook-form";
import { userRegisterSchema } from "../../modals/userSignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterField } from "../../interface/usersInterface";
import alertPass from "../../assets/alert_check.svg";
import alertFail from "../../assets/alert_failure.svg";

import { useState } from "react";
import { useRegisterMutation } from "../../hooks/useRegisterMutation";
import { useUserValidationMutation } from "../../hooks/useUserValidationMutation";
import { SubmitButton } from "../common/SubmitButtons";
import { ValidateInputButton } from "../common/ValidationButtons";

export const SignupForm = () => {
  const [validEmail, setValidEmail] = useState(false);
  const [validNickname, setValidNickname] = useState(false);
  const [displayEmailMsg, setDisplayEmailMsg] = useState(false);
  const [displayNickMsg, setDisplayNickMsg] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterField>({ resolver: zodResolver(userRegisterSchema) });

  const { mutate: registerMutation } = useRegisterMutation();
  const { mutate: validateMutation } = useUserValidationMutation({
    setValidEmail,
    setDisplayEmailMsg,
    setValidNickname,
    setDisplayNickMsg,
  });

  const onSubmit = (data: RegisterField) => {
    registerMutation(data);
  };

  const handleValidateEmail = () => {
    console.log("validate email");

    const email = validateMutation({ email: getValues("email") });
    console.log(email);
  };

  const handleValidateNick = () => {
    console.log("validate nick");

    validateMutation({ nickname: getValues("nickname") });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6  mobile:w-full tablet:w-[600px]"
    >
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="email" className="text-[12px] text-[#1c1c1c]">
          이메일
        </label>
        <input
          className="input-primary"
          type="email"
          id="email"
          role="input-email"
          disabled={validEmail ? true : false}
          placeholder="이메일을 입력해주세요."
          {...register("email", {
            required: true,
          })}
        />

        <ValidateInputButton
          validation={
            !validEmail ? handleValidateEmail : () => setValidEmail(false)
          }
          isValid={validEmail}
          validateFunction={handleValidateEmail}
          role={"validate-email"}
        />
      </div>
      {errors.email?.message && (
        <p className=" text-red-500">{errors.email?.message}</p>
      )}
      {validEmail && (
        <div className="flex items-center gap-1">
          <img src={alertPass} alt="email approved icon" className="w-4" />
          <p className="text-green-400 text-[13px] font-[400]">
            사용 가능한 이메일이에요!
          </p>
        </div>
      )}
      {displayEmailMsg && !validEmail && (
        <div className="flex items-center gap-1">
          <img src={alertFail} alt="email approved icon" className="w-4" />
          <p className="text-[#E92C2C] text-[13px] font-[400]">
            해당 이메일은 이미 회원으로 등록된 이메일입니다.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-[12px] text-[#1c1c1c]">
          비빌번호
        </label>
        <input
          className="input-primary"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          id="password"
          role="input-password"
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
          className="input-primary"
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요."
          id="password_check"
          role="input-password-check"
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
          className="input-primary"
          type="text"
          id="name"
          role="input-name"
          placeholder="이름을 입력해주세요."
          {...register("name", {
            required: true,
          })}
        />
        {errors.name?.message && (
          <p className=" text-red-500">유효한 이름을 입력해주세요.</p>
        )}
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="nickname" className="text-[12px] text-[#1c1c1c]">
          닉네임
        </label>
        <input
          className="input-primary"
          type="text"
          id="nickname"
          role="input-nickname"
          disabled={validNickname ? true : false}
          placeholder="닉네임을 입력해주세요."
          {...register("nickname", {
            required: true,
          })}
        />

        <ValidateInputButton
          validation={
            !validNickname ? handleValidateNick : () => setValidNickname(false)
          }
          isValid={validNickname}
          validateFunction={handleValidateNick}
          role={"validate-nickname"}
        />
      </div>
      {errors.nickname?.message && (
        <p className=" text-red-500">{errors.nickname?.message}</p>
      )}

      {validNickname && (
        <div className="flex items-center gap-1">
          <img src={alertPass} alt="approved icon" className="w-4" />
          <p className="text-green-400 text-[13px] font-[400]">
            사용 가능한 닉네임이에요!
          </p>
        </div>
      )}
      {displayNickMsg && !validNickname && (
        <div className="flex items-center gap-1">
          <img src={alertFail} alt="disapprove icon" className="w-4" />
          <p className="text-[#E92C2C] text-[13px] font-[400]">
            해당 닉네임은 이미 회원으로 등록된 닉네임입니다.
          </p>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="birthday" className="text-[12px] text-[#1c1c1c]">
          생년월일
        </label>
        <input
          className="input-primary"
          type="date"
          id="birthday"
          role="user-birthday"
          {...register("birthday", {
            required: true,
          })}
        />
        {errors.birthday?.message && (
          <p className=" text-red-500">유효한 생년월일을 입력해주세요.</p>
        )}
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="phone" className="text-[12px] text-[#1c1c1c]">
          핸드폰 번호
        </label>
        <input
          className="input-primary"
          type="string"
          id="phone"
          placeholder="'-'을 제외한 휴대폰번호를 입력해주세요."
          {...register("phone", {
            required: true,
          })}
        />
      </div>
      {errors.phone?.message && (
        <p className=" text-red-500">{errors.phone?.message}</p>
      )}

      <SubmitButton
        disabled={
          !!(
            errors.email ||
            errors.password ||
            errors.password_check ||
            errors.nickname ||
            errors.name ||
            errors.birthday ||
            errors.phone
          )
        }
        type="submit"
        role="submit"
        children="가입하기"
      />
    </form>
  );
};