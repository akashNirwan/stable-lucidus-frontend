import React from "react";
import School from "./School";
import { useOutletContext } from "react-router-dom";
import { stepsData } from "../assets/question";
import FigureOut from "./FigureOut";
import Grade from "./Grade";
const Question = () => {
  const { step, setStep } = useOutletContext();
  const stepComponents = {
    1: <School setStep={setStep} stepsData={stepsData[0]} />,
    2: <Grade setStep={setStep} stepsData={stepsData[1]} />,
    3: <FigureOut setStep={setStep} stepsData={stepsData[2]} />,
  };
  return (
    <div>
      <div>{stepComponents[step] || <div>Invalid step</div>}</div>
    </div>
  );
};

export default Question;
