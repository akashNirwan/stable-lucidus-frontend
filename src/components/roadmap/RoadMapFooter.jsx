import React from "react";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const RoadMapFooter = () => {
  const navigate = useNavigate()
  const[searchParams] = useSearchParams()

  const careerId = searchParams.get("careerId")
const handleClick = () =>{
  navigate(`/micro-intro?careerId=${careerId}`)
}
  return (
    <div className="p-4 rounded-t-3xl bg-white border border-b-0 flex justify-between text-black items-center w-full max-w-[750px] mx-auto">
      <Button onClick={handleClick}>Experience It</Button>
    </div>
  );
};

export default RoadMapFooter;
