import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { saveSteps } from "../redux/actions/microexperience-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";

const MicroIntoScreenTwo = ({ data, levelNumber }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { saveStepsLoading } = useSelector((state) => state.microexperience);
  const careerLevelId = data?._id;

  const levelPercent =
    levelNumber === "1 " ? "5" : levelNumber === "2" ? "30" : "0";

  const handleNext = () => {
    const payload = {
      careerLevelId: careerLevelId,
      route: `/micro-intro?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}`,
      levelPercent: levelPercent,
    };

    dispatch(saveSteps(payload)).then((res) => {
      if (
        (res.payload && res.payload.code === 200) ||
        res.payload.code === 201
      ) {
        navigate(
          `/level?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}`
        );
      }
    });
  };

  return (
    <div className="text-center flex flex-col gap-4 relative min-w-[325px] mx-auto">
      <div
        dangerouslySetInnerHTML={{
          __html: data?.questionintros?.[1]?.titleOne,
        }}
        className="text-center text-white w-[325px] mx-auto absolute -top-[140px] left-1/2 -translate-x-1/2 leading-[140%] bg-[#13093466] opacity-80 p-3 rounded-lg"
      ></div>
      <div
        className="text-center "
        dangerouslySetInnerHTML={{
          __html: data?.questionintros?.[1]?.titleTwo,
        }}
      ></div>

      <Button onClick={handleNext} disabled={saveStepsLoading}>
        {saveStepsLoading ? (
          <LoadingSpinner size={20} color="green"></LoadingSpinner>
        ) : (
          data?.questionintros?.[1]?.buttonName
        )}
      </Button>
    </div>
  );
};

export default MicroIntoScreenTwo;
