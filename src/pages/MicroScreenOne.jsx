import React from "react";
import Button from "../components/common/Button";
import { useOutletContext } from "react-router-dom";
const MicroIntoScreenOne = ({ setScreen, data }) => {
  return (
    <div className="grid gap-2 relative">
      {data?.questionintros?.[0]?.titleOne && (
        <div className=" fixed top-[-150px] left-0 mx-6 text-center text-white leading-[140%] bg-glass p-3 rounded-lg z-50">
          {data?.questionintros?.[0]?.titleOne}
        </div>
      )}
      <div className="text-center text-[20px] text-[#3618A3] font-bold ">
        {data?.questionintros?.[0]?.titleTwo}
      </div>
      <div className="text-center">
        {data?.questionintros?.[0]?.description?.map((item, index) => (
          <p key={index} className="mb-[12px] last:mb-2 text-[16px]">
            {item.description}
          </p>
        ))}
      </div>
      <Button onClick={() => setScreen(2)}>
        {data?.questionintros?.[0]?.buttonName}
      </Button>
    </div>
  );
};

export default MicroIntoScreenOne;
