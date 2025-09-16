import React from "react";
import Button from "../components/common/Button";
import { useOutletContext } from "react-router-dom";
const MicroIntoScreenOne = ({ setScreen, data }) => {
  return (
    <div className="grid gap-2">
     
     
     <div
  className="text-center"
  dangerouslySetInnerHTML={{ __html: data?.questionintros?.[0]?.titleTwo }}
></div>
      <Button onClick={() => setScreen(2)}>
        {data?.questionintros?.[0]?.buttonName}
      </Button>
    </div>
  );
};

export default MicroIntoScreenOne;
