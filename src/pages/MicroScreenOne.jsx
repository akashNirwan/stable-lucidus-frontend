import React from "react";
import Button from "../components/common/Button";
import { useOutletContext } from "react-router-dom";
const MicroIntoScreenOne = ({ setScreen, data }) => {
  return (
    <div className="grid gap-2">
      <div
        dangerouslySetInnerHTML={{
          __html: data?.questionintros?.[0]?.titleOne,
        }}
        className="text-center text-white absolute -top-[135px] left-0 mx-6 leading-[140%] bg-[#13093466] opacity-60 p-3 rounded-lg"
      ></div>
      <div
        className="text-center "
        dangerouslySetInnerHTML={{
          __html: data?.questionintros?.[0]?.titleTwo,
        }}
      ></div>
      <Button onClick={() => setScreen(2)}>
        {data?.questionintros?.[0]?.buttonName}
      </Button>
    </div>
  );
};

export default MicroIntoScreenOne;
