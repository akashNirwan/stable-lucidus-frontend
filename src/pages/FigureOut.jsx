import React, { useState } from "react";
import Button from "../components/common/Button";
import OptionButton from "../components/common/OptionButton";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const FigureOut = ({ setStep, stepsData }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const gradeId = searchParams.get("gradeId");
  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleClick = () => {
    navigate(`/questions/subject?gradeId=${gradeId}`);
  };

   const handleBack = () => {
    navigate("/questions/grade");
  };



  return (
    <div className="text-center flex flex-col gap-3">

       {/* Back Button */}
      <div className="flex items-center justify-start ">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />

          
         
        </button>
        <h2 className="font-bold text-[20px]">
        What are you here to <span className="text-[#5f35f1]">figure</span> out?{" "}
      </h2>
      </div>
     
      <h3 className="text-gray-600">{stepsData.subtitle}</h3>
      <h4 className="text-[#24A57F] font-medium">I want to:</h4>

      <div className="h-[320px] overflow-y-auto flex flex-col gap-2">
        {stepsData.options.map((option, ind) => (
          <OptionButton
            key={ind}
            option={option}
            selected={selected}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <Button type="button" isActive={!!selected} onClick={handleClick}>
        Next
      </Button>
    </div>
  );
};

export default FigureOut;
