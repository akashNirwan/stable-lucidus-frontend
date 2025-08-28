import React from "react";
import School from "./School";
import { useOutletContext } from "react-router-dom";
import { stepsData } from "../assets/question";
import FigureOut from "./FigureOut";
import Grade from "./Grade";
import Subject from "./Subject";
import Skills from "./Skills";
import SkillsCare from "./SkillsCare";
import Ambition from "./Ambition";

const Question = () => {
  const { step, setStep } = useOutletContext();
  const stepComponents = {
    1: <School setStep={setStep} stepsData={stepsData[0]} />,
    2: <Grade setStep={setStep} stepsData={stepsData[1]} />,
    3: <FigureOut setStep={setStep} stepsData={stepsData[2]} />,
    4: <Subject setStep={setStep} stepsData={stepsData[3]} />,
    5: <Skills setStep={setStep} stepsData={stepsData[4]} />,
    6: <SkillsCare setStep={setStep} stepsData={stepsData[5]} />,
    7: <Ambition stepsData={stepsData[6]} />,
  };
  return (
    <div>
      <div>{stepComponents[step] || <div>Invalid step</div>}</div>
    </div>
  );
};

export default Question;
