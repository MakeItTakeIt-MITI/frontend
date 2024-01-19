// import rightArrow from "../../assets/Chevron_Left.png";
import closeButton from "../../assets/x_button.svg";
import homeIcon from "../../assets/header_home_icon.svg";
import gamesIcon from "../../assets/header_games_icon.svg";
import profileIcon from "../../assets/header_profile_icon.svg";
import viewAllIcon from "../../assets/header_all_icon.svg";

import homeIconColor from "../../assets/header_home_color.svg";
import gamesIconColor from "../../assets/header_game_color.svg";
import profileIconColor from "../../assets/header_profile_color.svg";
import viewIconColor from "../../assets/header_view_color.svg";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

interface DisplayTab {
  setDisplayTab: (arg: boolean) => boolean;
}

export const Sidebar = ({ setDisplayTab }: DisplayTab) => {
  const { isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const closeTab = () => setDisplayTab(false);

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      alert("로그아웃 되었습니다.");
      logout();
      navigate("/");
      setDisplayTab(false);
    } else {
      alert("취소합니다.");
      return;
    }
  };

  return (
    <div className="bg-gray-400 bg-opacity-50 fixed top-0 bottom-0 right-0 left-0 ">
      <div className="flex flex-col gap-2 fixed  right-0 bottom-0 left-0 h-[18rem] bg-white rounded-t-xl ">
        <div className="h-8 p-2 flex justify-end">
          <button onClick={() => setDisplayTab(false)}>
            <img src={closeButton} alt="close tab" className="w-6 " />
          </button>
        </div>
        <hr className="w-full" />
        <h4 className="text-red-600 text-center">수정중</h4>
        <div className="p-6 flex items-center  flex-wrap gap-6">
          <Link
            to="/"
            className="flex flex-col gap-1 items-center "
            onClick={closeTab}
          >
            <img src={homeIcon} alt="home icon" />
            <span className="text-[13px] text-[#969696]">홈</span>
          </Link>
          <Link
            to="/"
            className="flex flex-col gap-1 items-center "
            onClick={closeTab}
          >
            <img src={gamesIcon} alt="join game icon" />
            <span className="text-[13px] text-[#969696]">경기 참여</span>
          </Link>
          <Link
            to="/operate"
            className="flex flex-col gap-1 items-center "
            onClick={closeTab}
          >
            <img src={gamesIcon} alt="create game icon" />
            <span className="text-[13px] text-[#969696]">경기 만들기</span>
          </Link>
          <Link
            to="/login"
            className="flex flex-col gap-1 items-center "
            onClick={closeTab}
          >
            <img src={profileIcon} alt="login icon" />
            <span className="text-[13px] text-[#969696]">로그인</span>
          </Link>
          <Link
            to="/signup"
            className="flex flex-col gap-1 items-center "
            onClick={closeTab}
          >
            <img src={profileIcon} alt="signup icon" />
            <span className="text-[13px] text-[#969696]">회원가입</span>
          </Link>
          <Link
            to="/signup"
            className="flex flex-col gap-1 items-center "
            onClick={closeTab}
          >
            <img src={profileIcon} alt="signup icon" />
            <span className="text-[13px] text-[#969696]">마이페이지</span>
          </Link>
          <Link
            to="/signup"
            className="flex flex-col gap-1 items-center "
            onClick={closeTab}
          >
            <img src={profileIcon} alt="signup icon" />
            <span className="text-[13px] text-[#969696]">고객센터</span>
          </Link>
        </div>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="text-red-400">
            로그아웃
          </button>
        ) : (
          <Link onClick={closeTab} to="/login" className="text-center">
            로그인
          </Link>
        )}
      </div>
    </div>
  );
};
