import React from "react";
import Button from "../components/common/Button";
const MicroIntoScreenOne = ({ setScreen }) => {
  return (
    <div className="">
      <h3> You're a Trainee Microfinance Specialist in rural Kenya.</h3>
      <p>
        Your organization manages a $200,000 regional budget for small loans.
      </p>
      <p>
        You are introduced to Zuri, a mother of three, who needs a $33 loan.
      </p>
      <Button onClick={() => setScreen(2)}>Talk to Zuri</Button>
    </div>
  );
};

export default MicroIntoScreenOne;
