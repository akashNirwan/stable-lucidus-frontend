import React from "react";
import Button from "../components/common/Button";
const BadgeEarned = () => {
  return (
    <div className="w-full h-screen bg-[url('/assets/badge-bg.svg')] bg-cover bg-center">
      <div className="w-full p-4  ">
        <div className="w-[20px] h-[24px]">
          <img src="/assets/header_logo.svg" alt="logo" className="size-full" />
        </div>
        <div className=" flex flex-col gap-18 w-[325px] mx-auto">
          <h2 className="text-center text-[#4ED0AA] text-bold text-3xl mt-4">
            Your're an Explorer
          </h2>
          <img src="/assets/last-badge.svg" alt="badge" />
          <p className="text-white text-center">
            Keep exploring to unlock more achievements!
          </p>
          <Button>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default BadgeEarned;
