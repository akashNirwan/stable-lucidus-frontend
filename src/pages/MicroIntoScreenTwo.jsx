import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const MicroIntoScreenTwo = ({data}) => {
  const navigate = useNavigate();

const careerId = data?.careerId

  return (
    <div>
     
            <p>
              {data?.questionintros?.[1]?.titleOne}
            </p>
            <p>
              {data?.questionintros?.[1]?.titleTwo }
            </p>
            

      {/* Redirect to another page */}
      <Button onClick={() => navigate(`/level?careerId=${careerId}`)}>{data?.questionintros?.[1]?.buttonName }</Button>
    </div>
  );
};

export default MicroIntoScreenTwo;
