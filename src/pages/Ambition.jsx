import React, { useState } from "react";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
const FigureOut = ({ stepsData }) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="text-center flex flex-col gap-3">
      <h2 className="font-bold text-[20px]">{stepsData.title}</h2>
      <h3 className="text-green-600 text-[14px]">{stepsData.subtitle}</h3>

      <div className="h-[320px] overflow-y-auto flex flex-col gap-2">
        <textarea
          placeholder={stepsData.highlight}
          className="placeholder:text-center w-full h-full border border-[#7B56FF] placeholder:text-[#7B56FF] text-[#7B56FF] rounded-md p-4"
          value={text}
          onChange={handleChange}
        />
      </div>

      <Button
        type="button"
        isActive={text.trim().length > 0}
        onClick={() => navigate("/question-load")}
        disabled={text.trim().length === 0}
      >
        Next
      </Button>
    </div>
  );
};

export default FigureOut;
