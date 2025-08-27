import React, { useState } from "react";
import Button from "../components/common/Button";

const SkillsCare = ({ setStep, stepsData }) => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (option) => {
    if (selected.includes(option)) {
      // If already selected → unselect
      setSelected(selected.filter((item) => item !== option));
    } else {
      // If less than 3 → add new selection
      if (selected.length < 3) {
        setSelected([...selected, option]);
      }
    }
  };

  return (
    <div className="text-center flex flex-col gap-3">
      <h2 className="font-bold text-[20px]">{stepsData.title}</h2>
      <h3 className="text-gray-600">{stepsData.subtitle}</h3>
      <h4 className="text-[#24A57F] font-medium">I care about:</h4>

      <div className="h-[320px] overflow-y-auto grid grid-cols-3 gap-2">
        {stepsData.options.map((option, ind) => {
          const isSelected = selected.includes(option);
          return (
            <div
              key={ind}
              onClick={() => handleSelect(option)}
              className={`w-[92px] h-[92px] cursor-pointer rounded-lg flex items-center justify-center
                ${isSelected ? "border-[#4823CF] border-2 bg-[#E6F8F3]" : ""}
              `}
            >
              <img
                src={option}
                alt="icons"
                className="object-center object-conver"
              />
            </div>
          );
        })}
      </div>

      <Button
        type="button"
        isActive={selected.length === 3}
        onClick={() => setStep((prev) => prev + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default SkillsCare;
