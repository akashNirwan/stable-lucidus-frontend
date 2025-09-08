import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const MicroIntoScreenTwo = ({ data }) => {
  const navigate = useNavigate();

  const careerLevelId = data?._id;

  return (
    <div className="text-center grid gap-4 relative">
      <h3 className="font-bold text-[20px] text-center">
        {data?.questionintros?.[1]?.titleOne}
      </h3>
      <p className="text-center text-white absolute -top-[125px] left-0 leading-[140%]">
        "I really need your help. There are three things my family needs... I
        need your help in making the right choice on how to utilise the $33
        loan."
      </p>

      <p className="text-center text-[#042119]">
        {data?.questionintros?.[1]?.titleTwo}
      </p>

      <Button onClick={() => navigate(`/level?careerLevelId=${careerLevelId}`)}>
        {data?.questionintros?.[1]?.buttonName}
      </Button>
    </div>
  );
};

export default MicroIntoScreenTwo;
