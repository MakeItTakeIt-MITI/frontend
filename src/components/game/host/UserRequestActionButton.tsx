import { RequestButtonProp } from "../../../interface/gameInterface";

export const UserRequestActionButton = ({
  textOne,
  textTwo,
  backgroundColor,

  userId,
}: RequestButtonProp) => {
  const handleConfirmToGame = (userId: number) => {
    // updateParticipationStatus(participantsData?.data.id, userId);
    console.log(userId);
  };

  return (
    // || handleRemoveFromGame || handleCopyClipBoard
    <button
      onClick={() => handleConfirmToGame(userId)}
      style={{
        backgroundColor,
      }}
      className="flex flex-col items-center justify-center w-[48px] h-[40px]  text-white rounded-lg text-[12px] font-bold"
    >
      <span>{textOne}</span>
      <span>{textTwo}</span>
    </button>
  );
};
