import kakaoMsgIcon from "../../assets/kakao_msg_icon.svg";

interface KakaoLoginProp {
  children: string;
}

export const KakaoLoginButton = ({ children }: KakaoLoginProp) => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <div className="relative  mobile:w-full tablet:w-[600px]">
      <button
        className="w-full bg-[#FAE64D] h-[48px]  rounded-lg text-[14px] font-bold"
        onClick={kakaoLogin}
        role="kakao-login-btn"
      >
        {children}{" "}
      </button>
      <img
        src={kakaoMsgIcon}
        alt="kakao icon"
        className="absolute left-3 top-3"
      />
    </div>
  );
};
