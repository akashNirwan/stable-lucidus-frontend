import React, { useState } from "react";
import Button from "../components/common/Button";
import OptionButton from "../components/common/OptionButton";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FigureOut = ({ setStep, stepsData }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const [selected, setSelected] = useState("");
const gradeId = searchParams.get("gradeId");
  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleClick = () =>{
    navigate(`/questions/subject?gradeId=${gradeId}`)
  }
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
        onClick={handleClick}
      >
        Next
      </Button>
    </div>
  );
};

export default FigureOut;
