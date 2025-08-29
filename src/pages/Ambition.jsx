import React, { useState } from "react";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { updateAmbition } from "../redux/actions/student-onboarding-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";




const FigureOut = ({ stepsData }) => {
  const [text, setText] = useState("");
  
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.student);
  const navigate = useNavigate();

   const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleNext = () => {
    if (!text.trim()) return;

    const payload = {
      ambitions: text.trim(),
    };

    dispatch(updateAmbition(payload)).then((res) => {
      if (res.payload && res.payload.code === 200) {
        navigate("/question-load");
      }
    });
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
        onClick={handleNext}
        disabled={loading || text.trim().length === 0}
      >
        {loading ?  <LoadingSpinner size="20px" />  : "Next"}
      </Button>
    </div>
  );
};

export default FigureOut;
