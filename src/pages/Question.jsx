
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
import QuestionFinalLoad from "./QuestionFinalLoad";

const Question = ({ stepName }) => {
 
  const stepDataIndex = {
    school: 0,
    grade: 1,
    "figure-out": 2,
    subject: 3,
    skills: 4,
    "skills-care": 5,
    ambition: 6,
  };

 
  const getCurrentStepData = (step) => {
    const index = stepDataIndex[step];
    return stepsData && stepsData[index] ? stepsData[index] : {};
  };


  const stepComponents = {
    school: <School stepsData={getCurrentStepData('school')} />,
    grade: <Grade stepsData={getCurrentStepData('grade')} />,
    "figure-out": <FigureOut stepsData={getCurrentStepData('figure-out')} />,
    subject: <Subject stepsData={getCurrentStepData('subject')} />,
    skills: <Skills stepsData={getCurrentStepData('skills')} />,
    "skills-care": <SkillsCare stepsData={getCurrentStepData('skills-care')} />,
    ambition: <Ambition stepsData={getCurrentStepData('ambition')} />,
  };

  return <div>{stepComponents[stepName] || <div>Invalid step</div>}</div>;
};

export default Question;