import React from "react";
import { useState } from "react";

import TwoLineOption from "../components/common/TwoLineOption";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { saveInsight } from "../redux/actions/microexperience-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { saveSteps } from "../redux/actions/microexperience-action";
const FeedBackFormTwo = ({ microexperience, careerLevelId, levelNumber }) => {
  const dispatch = useDispatch();

  const { saveInsightLoading, saveStepsLoading } = useSelector(
    (state) => state.microexperience
  );
  const navigate = useNavigate();

  const stepsData = microexperience[0]?.studentinsights || [];
  const [selected, setSelected] = useState([]);

  const handleSelect = (insight) => {
    setSelected((prev) => {
      const isSelected = prev.some((item) => item._id === insight._id);
      if (isSelected) {
        return prev.filter((item) => item._id !== insight._id);
      } else {
        return [...prev, insight];
      }
    });
  };

  // const handleContinue = () => {
  //   if (selected.length > 0) {
  //     const payload = {
  //       selectedInsight: selected.map(insight => ({
  //         studentInsightId: insight._id,
  //         icon: insight.icon,
  //         studentInsight: insight.studentInsight
  //       })),
  //       careerLevelId: microexperience[0]?.studentinsights[0]?.careerLevelId
  //     };
  //      const saveStepsPayload = {
  //       careerLevelId : careerLevelId,
  //       route: "/student-choice",
  //       levelPercent : "42",
  //      }
  //      dispatch(saveSteps(saveStepsPayload))
  //     dispatch(saveInsight(payload)).then((res) => {

  //       if (res.payload && res.payload.code === 201 || res.payload.statusCode === 200) {
  //               navigate(`/survey-page?careerLevelId=${microexperience[0]?.studentinsights[0]?.careerLevelId}`);
  //       }
  //       });
  //   }

  // };

  const handleContinue = async () => {
    if (selected.length > 0) {
      const payload = {
        selectedInsight: selected.map((insight) => ({
          studentInsightId: insight._id,
          icon: insight.icon,
          studentInsight: insight.studentInsight,
        })),
        careerLevelId: microexperience[0]?.studentinsights[0]?.careerLevelId,
      };

      const saveStepsPayload = {
        careerLevelId: careerLevelId,
        route: `/student-choice?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}`,
        levelPercent: "5",
      };

      const saveStepsRes = await dispatch(saveSteps(saveStepsPayload));
      const saveInsightRes = await dispatch(saveInsight(payload));

      const isSaveStepsSuccess =
        saveStepsRes.payload?.code === 200 ||
        saveStepsRes.payload?.code === 201;

      const isSaveInsightSuccess =
        saveInsightRes.payload?.code === 200 ||
        saveInsightRes.payload?.code === 201;

      if (isSaveStepsSuccess && isSaveInsightSuccess) {
        navigate(
          `/survey-page?careerLevelId=${microexperience[0]?.studentinsights[0]?.careerLevelId}&levelNumber=${levelNumber}`
        );
      }
    }
  };
  return (
    <div className="text-center space-y-4 ">
      <h2 className="font-bold text-[20px]">What guided your choice most?</h2>
      <p className="text-[#066146]">
        Select <span className="font-bold">all</span> that apply.
      </p>
      <h3 className="text-lg font-bold text-[#24A57F]">I focused on:</h3>
      <div className="h-[260px] overflow-y-auto flex flex-col gap-2">
        {stepsData.map((insight, ind) => (
          <TwoLineOption
            key={insight._id}
            option={insight.studentInsight}
            selected={selected.some((item) => item._id === insight._id)}
            onSelect={() => handleSelect(insight)}
            img={insight.icon}
          />
        ))}
      </div>
      <Button
        disabled={saveInsightLoading || saveStepsLoading}
        onClick={handleContinue}
      >
        {saveInsightLoading || saveStepsLoading ? (
          <LoadingSpinner size={20}></LoadingSpinner>
        ) : (
          "Continue"
        )}
      </Button>
    </div>
  );
};

export default FeedBackFormTwo;
