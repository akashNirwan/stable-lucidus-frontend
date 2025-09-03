import React from "react";
import { useOutletContext } from "react-router-dom";
import Purpose from "./Purpose";
import Process from "./Process";
import Path from "./Path";
import Prediction from "./Prediction";
const EncyclopediaTabs = () => {
  const { activeTab, setActiveTab } = useOutletContext();
  const tabContent = {
    Purpose: <Purpose />,
    Process: <Process />,
    Path: <Path />,
    Prediction: <Prediction />,
  };
  return (
    <div>
      {tabContent[activeTab] ? tabContent[activeTab] : <div>not found</div>}
    </div>
  );
};

export default EncyclopediaTabs;
