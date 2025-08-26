import React, { useState } from "react";
import Button from "../components/common/Button";
import OptionButton from "../components/common/OptionButton";
const FigureOut = ({ setStep, stepsData }) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <div className="text-center flex flex-col gap-3">
      <h2 className="font-bold text-[20px]">{stepsData.title}</h2>
      <h3 className="text-gray-600">{stepsData.subtitle}</h3>
      <h4 className="text-[#24A57F] font-medium">I want to:</h4>

      <div className="h-[320px] overflow-y-auto flex flex-col gap-2">
        {stepsData.options.map((option, ind) => (
          <OptionButton
            key={ind}
            option={option}
            selected={selected}
            onSelect={handleSelect}
            img={"/assets/lvl-1.svg"}
          />
        ))}
      </div>

      <Button
        type="button"
        isActive={!!selected}
        onClick={() => setStep((prev) => prev + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default FigureOut;
