import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { saveSteps } from "../redux/actions/microexperience-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";

const MicroIntoScreenTwo = ({data, levelNumber}) => {

  const navigate = useNavigate();

const dispatch = useDispatch()
const { saveStepsLoading } = useSelector(
    (state) => state.microexperience
  );
const careerLevelId = data?._id
console.log(careerLevelId, "careerLevelId");
console.log(data?.career[0]._id, "data");

 const handleNext = () => {
    
    
    const payload = {
      careerLevelId: careerLevelId,
      route: `/micro-intro?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}`,
      levelPercent : "5",
      
    };

    dispatch(saveSteps(payload)).then((res) => {
      if (res.payload && res.payload.code === 200 || res.payload.code === 201) {
        navigate(`/level?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}`)
      }
    });
  };


  return (
    <div className="text-center grid gap-4 relative">
      {/* <h3 className="font-bold text-[20px] text-center">
        {data?.questionintros?.[1]?.titleOne}
      </h3> */}
      <p className="text-center text-white absolute -top-[125px] left-0 leading-[140%]">
        "I really need your help. There are three things my family needs... I
        need your help in making the right choice on how to utilise the $33
        loan."
      </p>

      <p
  className="text-center "
  dangerouslySetInnerHTML={{ __html: data?.questionintros?.[1]?.titleTwo }}
></p>

      <Button onClick={handleNext} disabled={saveStepsLoading} >
        { saveStepsLoading ? <LoadingSpinner size={20}></LoadingSpinner> : data?.questionintros?.[1]?.buttonName}
      </Button>
    </div>
  );
};

export default MicroIntoScreenTwo;
