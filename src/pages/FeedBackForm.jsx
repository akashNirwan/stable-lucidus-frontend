import React from "react";
import Button from "../components/common/Button";
import FeedBackFormOne from "./FeedBackFormOne";
import FeedBackFormTwo from "./FeedBackFormTwo";
import { useOutletContext } from "react-router-dom";
const FeedBackForm = () => {
  const { currentStepIndex, setCurrentStepIndex } = useOutletContext();
  console.log(currentStepIndex);
  const formObj = {
    0: <FeedBackFormOne setCurrentStepIndex={setCurrentStepIndex} />,
    1: <FeedBackFormTwo />,
  };
  return (
    <div className="">
      {formObj[currentStepIndex] ? (
        formObj[currentStepIndex]
      ) : (
        <div>Component not found</div>
      )}
    </div>
  );
};

export default FeedBackForm;
