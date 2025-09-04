import React from "react";
import { useOutletContext } from "react-router-dom";

const EncylopediaTab = () => {
  const { state, setState } = useOutletContext();

  let content;
  switch (state) {
    case 0:
      content = (
        <div className="text-white font-semibold text-[32px] text-center">
          Oversee financial planning, budgeting, & reporting
        </div>
      );
      break;
    case 1:
      content = (
        <div className="text-white font-semibold text-[32px] text-center">
          Make strategic decisions about spending & investments
        </div>
      );
      break;
    case 2:
      content = (
        <div className="text-white font-semibold text-[32px] text-center">
          Analyze data to identify trends, risks & opportunities
        </div>
      );
      break;
    case 3:
      content = (
        <div className="text-white font-semibold text-[32px] text-center">
          Present financial strategies to CEOs, boards & investors
        </div>
      );
      break;
    case 4:
      content = (
        <div className="text-white font-semibold text-[32px] text-center">
          Ensure legal compliance
        </div>
      );
      break;
    default:
      content = (
        <div className="text-white font-semibold text-[32px] text-center">
          No data
        </div>
      );
  }

  return (
    <div
      className="h-screen flex justify-center items-center cursor-pointer"
      onClick={() => setState((prev) => (prev + 1) % 5)}
    >
      {content}
    </div>
  );
};

export default EncylopediaTab;
