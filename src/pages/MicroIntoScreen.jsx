import React from "react";
import MicroIntoScreenOne from "./MicroScreenOne";
import MicroIntoScreenTwo from "./MicroIntoScreenTwo";
import { useOutletContext } from "react-router-dom";
const MicroIntoScreen = () => {
  const { screen, setScreen } = useOutletContext();
  const screenComponent = {
    1: <MicroIntoScreenOne setScreen={setScreen} />,
    2: <MicroIntoScreenTwo setScreen={setScreen} />,
  };

  return (
    <div className="flex items-center justify-center">
      {screenComponent[screen] ?? <div>Unavailable</div>}
    </div>
  );
};

export default MicroIntoScreen;
