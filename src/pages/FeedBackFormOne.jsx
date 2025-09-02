import React from "react";
import Button from "../components/common/Button";
const FeedBackFormOne = ({ setCurrentStepIndex }) => {
  return (
    <div className="">
      <h2 className="text-center font-bold text-xl">A Net That Protects</h2>
      <div className="text-center space-y-4 border border-[#4ED0AA] rounded-2xl p-4 mt-4 bg-[#e0ffef]">
        <div className="text-[12px] text-[#034230] px-2 py-1  rounded-2xl w-fit mx-auto bg-[#4ED0AA]">
          DECISION OUTCOME
        </div>
        <p className="text-[14px]">
          Zuri’s 3 children missed weeks of school last year due to
          mosquito-borne illness. One night, she had to rush the youngest for an
          expensive hospital visit.
        </p>
        <p className="text-[14px]">
          By recommending Mosquito Nets, you helped prevent another health
          crisis.
        </p>
        <p className="text-[14px]">
          In Microfinance, protecting families from medical debt often matters
          more than immediate income.
        </p>
      </div>
      <div className="text-center space-y-4 border border-[#5E35F1] rounded-2xl p-4 mt-4 bg-[#EFEAFF]">
        <div className="text-[12px] text-[#034230] px-2 py-1  rounded-2xl w-fit mx-auto bg-[#C2B1FF]">
          FOOD FOR THOUGHT
        </div>
        <p className="text-[14px]">
          Without a water filter, stomach illness is still a risk. Without
          light, studying after sunset stays a struggle.
        </p>
      </div>
      <Button onClick={() => setCurrentStepIndex(1)} className="mt-4">
        Continue
      </Button>
    </div>
  );
};

export default FeedBackFormOne;
