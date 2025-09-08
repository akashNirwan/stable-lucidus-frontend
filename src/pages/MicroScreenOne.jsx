import React from "react";
import Button from "../components/common/Button";
const MicroIntoScreenOne = ({ setScreen, data }) => {
  return (
    <div className="grid gap-2">
      <h3 className="font-bold text-[20px] text-center">
        {data?.career?.[0]?.career}
      </h3>
      <p className="text-center text-[#042119]">
        {data?.career?.[0]?.description}
      </p>
      <p className="text-center text-[#042119]">
        {data?.questionintros?.[0]?.titleOne}
      </p>
      <p className="text-center text-[#042119]">
        {data?.questionintros?.[0]?.titleTwo}
      </p>
      <Button onClick={() => setScreen(2)}>
        {data?.questionintros?.[0]?.buttonName}
      </Button>
    </div>
  );
};

export default MicroIntoScreenOne;
