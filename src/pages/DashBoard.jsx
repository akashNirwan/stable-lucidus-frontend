import React from "react";
import { useOutletContext } from "react-router-dom";
import CareerFeed from "./CareerFeed";
const DashBoard = () => {
  const { menu, setMenu } = useOutletContext();

  const stepComponents = {
    1: <School />,
  };
  return (
    <div>
      <div>{stepComponents[menu] || <div>Invalid step</div>}</div>
    </div>
  );
};

export default DashBoard;
