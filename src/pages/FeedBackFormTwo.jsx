import React from "react";
import { useState } from "react";
import OptionButton from "../components/common/OptionButton";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
const FeedBackFormTwo = () => {
  const navigate = useNavigate();
  const stepsData = [
    "Limited Resurces",
    "Limited Reorces",
    "Limited Resores",
    "Limited Resorces",
    "Limited Resources",
  ];
  const [selected, setSelected] = useState([]);
  const handleSelect = (option) => {
    setSelected(option);
  };
  return (
    <div className="text-center space-y-4 ">
      <h2 className="font-bold text-[20px]">What guided your choice most?</h2>
      <p>Select all that apply.</p>
      <h3 className="text-lg font-bold text-[#24A57F]">I focused on:</h3>
      <div className="h-[350px] overflow-y-auto flex flex-col gap-2">
        {stepsData.map((option, ind) => (
          <OptionButton
            key={ind}
            option={option}
            selected={selected}
            onSelect={handleSelect}
          />
        ))}
      </div>
      <Button onClick={() => navigate("/survey-page")}>Continue</Button>
    </div>
  );
};

export default FeedBackFormTwo;
