import React from "react";
import { useOutletContext } from "react-router-dom";
import DashBoardMenuThree from "./Dashboard-MenuThree";
import DashBoardMenuTwo from "./Dashboard-MenuTwo";
import DashBoardMenuOne from "./Dashboard-MenuOne";
const DashBoard = () => {
  const { menu, setMenu } = useOutletContext();

  const stepComponents = {
    1: <DashBoardMenuOne />,
    2: <DashBoardMenuTwo />,
    3: <DashBoardMenuThree />,
  };
  return (
    <div>
      <div>{stepComponents[menu] || <div>Invalid step</div>}</div>
    </div>
  );
};

export default DashBoard;
