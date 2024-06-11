import miti from "../../assets/MITI_logo.svg";

export const LoadingPage = () => {
  return (
    <div className=" laptop:hidden mobile:block fixed z-[99999] top-0 bottom-0 right-0 left-0 h-full w-full">
      <div className="flex items-center justify-center h-full w-full">
        <img src={miti} alt="MITO logo" />
        <h1>MITI</h1>
      </div>
    </div>
  );
};
