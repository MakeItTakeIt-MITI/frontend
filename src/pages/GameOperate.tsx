import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";
import { GameForm } from "../components/games/GameForm";

export const GameOperate = () => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 mobile:my-[2rem] ">
      <h1 className="text-center font-bold text-2xl ">경기 만들기</h1>
      <GameForm />
    </div>
  );
};
