interface ModalProp {
  handleRemoveFromGame: (arg: number) => void;
  userId: number;
}

export const ModalRemoveUserFromMatch = ({
  handleRemoveFromGame,
  userId,
}: ModalProp) => {
  return (
    <div className=" h-full   fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
      <div className="bg-white   border border-gray-400 rounded-lg  tablet:w-[340px] mobile:w-full mobile:h-[236px]  p-4 flex  flex-col justify-between items-center text-[14px] ">
        <h4 className="font-bold text-[16px]">호스트님!</h4>
        <p className="text-center px-12 text-[14px]">
          참여 취소 버튼을 누르면 해당 게스트는 다시 매치에 참가할 수 없게 돼요
          또한 참여 취소 후 꼭 환불 금액을 지정된 계좌에 입금해주세요
        </p>
        <div className="w-full flex gap-2 text-center rounded-lg h-[50px] ">
          <button
            onClick={() => handleRemoveFromGame(userId)}
            className="w-full bg-[#4065F6] text-white rounded-lg"
          >
            네, 알겠어요
          </button>
        </div>
      </div>
    </div>
  );
};
