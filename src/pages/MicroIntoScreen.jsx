import React, { useState } from "react";
import MicroIntoScreenOne from "./MicroScreenOne";
import MicroIntoScreenTwo from "./MicroIntoScreenTwo";
const MicroIntoScreen = () => {
  const [screen, setScreen] = useState(1);

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
