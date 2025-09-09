import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { saveSteps } from "../redux/actions/microexperience-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";

const MicroIntoScreenTwo = ({data}) => {

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
      route: `/micro-intro?careerLevelId=${careerLevelId}`,
      levelPercent : "8.33"
    };

    dispatch(saveSteps(payload)).then((res) => {
      if (res.payload && res.payload.code === 200 || res.payload.code === 201) {
        navigate(`/level?careerLevelId=${careerLevelId}`)
      }
    });
  };


  return (
    <div>
     
            <p>
              {data?.questionintros?.[1]?.titleOne}
            </p>
            <p>
              {data?.questionintros?.[1]?.titleTwo }
            </p>
            

      {/* Redirect to another page */}
      <Button onClick={handleNext}>
        {saveStepsLoading ? <LoadingSpinner size={20}></LoadingSpinner> :data?.questionintros?.[1]?.buttonName }
        
        </Button>
    </div>
  );
};

export default MicroIntoScreenTwo;
