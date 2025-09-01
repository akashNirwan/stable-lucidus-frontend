import React from "react";
import Button from "../components/common/Button";
const MicroIntoScreenOne = ({ setScreen }) => {
  return (
    <div className="grid gap-4">
      <h3 className="font-bold text-[20px] text-center">
        {" "}
        You're a Trainee Microfinance Specialist in rural Kenya.
      </h3>
      <p className="text-center text-[#042119]">
        Your organization manages a $200,000 regional budget for small loans.
      </p>
      <p className="text-center text-[#042119]">
        You are introduced to Zuri, a mother of three, who needs a $33 loan.
      </p>
      <Button onClick={() => setScreen(2)}>Talk to Zuri</Button>
    </div>
  );
};

export default MicroIntoScreenOne;
