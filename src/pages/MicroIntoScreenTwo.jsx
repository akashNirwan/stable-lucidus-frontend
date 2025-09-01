import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const MicroIntoScreenTwo = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center grid gap-4">
      <h3 className="font-bold text-[20px] text-center">A Tough Call</h3>
      <p className="text-center text-[#042119]">
        This is your first solo loan assignment. Think through the options
        carefully.
      </p>

      <Button onClick={() => navigate("/level")}>Help Zuri</Button>
    </div>
  );
};

export default MicroIntoScreenTwo;
