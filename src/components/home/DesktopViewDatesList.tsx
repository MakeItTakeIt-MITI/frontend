import { useState } from "react";

interface DateBoxProps {
  selectingDate: Date;
  setSelectedDate: (arg: Date) => void;
}

export const DesktopViewDatesList = ({
  selectingDate,
  setSelectedDate,
}: DateBoxProps) => {
  const [displayDates, setDisplayDates] = useState(false);
  const availableDates = [];

  for (let i = 0; i < 14; i++) {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + i);
    availableDates.push(newDate);
  }

  const handleDisplayDates = () => {
    setDisplayDates(!displayDates);
  };

  const handleSelectDate = (input: Date) => {
    setSelectedDate(input);
  };

  return (
    <div className="tablet:block mobile:hidden w-[307px] ">
      <div
        onClick={handleDisplayDates}
        className="relative hover:cursor-pointer flex items-center justify-between p-4   rounded-lg bg-[#FBFBFB]"
      >
        <span className="font-bold leading-[20.8px]">
          {selectingDate.toLocaleDateString("ko-KR", {
            timeZone: "Asia/Seoul",
            year: "numeric",
            month: "numeric",
            day: "numeric",
            weekday: "long",
          })}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="10"
          viewBox="0 0 12 11"
          fill="none"
        >
          <path
            d="M10.59 0.365357L6 6.54619L1.41 0.365358L-4.61523e-07 2.26819L6 10.3654L12 2.26819L10.59 0.365357Z"
            fill="#454545"
          />
        </svg>
        <div className="absolute top-full left-0 w-full rounded-lg bg-white  ">
          {availableDates &&
            availableDates.map((date, index) => {
              return (
                <div
                  className="bg-white w-full h-full px-[1.1rem] hover:font-bold text-gray-400 hover:text-black rounded-2 "
                  key={index}
                  onClick={() => handleSelectDate(date)}
                >
                  <p className="mb-2 ">
                    {displayDates &&
                      date.toLocaleDateString("ko-KR", {
                        timeZone: "Asia/Seoul",
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        weekday: "long",
                      })}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
