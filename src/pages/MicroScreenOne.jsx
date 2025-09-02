import React from "react";
import Button from "../components/common/Button";
const MicroIntoScreenOne = ({ setScreen , data}) => {

 
   
  return (
    <div className="">
      <h3>
        {data?.career?.[0]?.career }
      </h3>
      <p>
        {data?.career?.[0]?.description }
      </p>
      <p>
        {data?.questionintros?.[0]?.titleOne}
      </p>
      <p>
        {data?.questionintros?.[0]?.titleTwo }
      </p>
      <Button onClick={() => setScreen(2)}>
        {data?.questionintros?.[0]?.buttonName }
      </Button>
    </div>
  );
};

export default MicroIntoScreenOne;
