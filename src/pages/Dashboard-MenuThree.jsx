import React from "react";

const DashBoardMenuThree = () => {
  return (
    <div className="text-white ">
      <h2 className="text-center text-[#A187FF] text-[28px] font-bold">
        Badges
      </h2>
      <div className="flex flex-col items-center ">
        {[1, 2, 3, 4, 5].map((_, index) => {
          return (
            <div key={index} className="w-[200px] h-[200px]">
              <img
                src="/assets/last-badge.svg"
                alt=""
                className="w-full h-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashBoardMenuThree;
