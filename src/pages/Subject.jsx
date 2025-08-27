import React, { useState } from "react";
import Button from "../components/common/Button";
import TwoLineOption from "../components/common/TwoLineOption";
const Subject = ({ setStep, stepsData }) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <div className="text-center flex flex-col gap-3">
      <h2 className="font-bold text-[20px]">{stepsData.title}</h2>
      <h3 className="text-gray-600">{stepsData.subtitle}</h3>
      <h4 className="text-[#24A57F] font-medium">I want to:</h4>

      <div className="max-h-[420px] overflow-y-auto grid gap-2">
        {stepsData.options.map((option, ind) => (
          <TwoLineOption
            key={ind}
            option={option.title}
            optionSub={option.description}
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

export default Subject;
