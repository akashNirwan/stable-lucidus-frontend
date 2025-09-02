import React from "react";
import { useOutletContext } from "react-router-dom";
const EncyclopediaTabs = () => {
  const { activeTab, setActiveTab } = useOutletContext();
  return <div>EncyclopediaTabs</div>;
};

export default EncyclopediaTabs;
