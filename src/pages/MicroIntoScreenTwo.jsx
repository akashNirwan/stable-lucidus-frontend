import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const MicroIntoScreenTwo = ({ data }) => {
  const navigate = useNavigate();

  const careerLevelId = data?._id;
  console.log(careerLevelId, "careerLevelId");
  console.log(data?.career[0]._id, "data");

  return (
    <div className="text-center grid gap-4">
      <h3 className="font-bold text-[20px] text-center">
        {data?.questionintros?.[1]?.titleOne}
      </h3>
      <p className="text-center text-[#042119]">
        {data?.questionintros?.[1]?.titleTwo}
      </p>

      {/* Redirect to another page */}
      <Button onClick={() => navigate(`/level?careerLevelId=${careerLevelId}`)}>
        {data?.questionintros?.[1]?.buttonName}
      </Button>
    </div>
  );
};

export default MicroIntoScreenTwo;
