import React, { useEffect, useState } from "react";
import Button from "../components/common/Button";
import {
  fetchMicroexperience,
  saveBadge,
} from "../redux/actions/microexperience-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { saveSteps } from "../redux/actions/microexperience-action";

const BadgeEarned = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { microexperience, loading, error, saveBadgeLoading, saveStepsLoading } = useSelector(
    (state) => state.microexperience
  );
   const navigate = useNavigate()
  console.log(
    microexperience?.[0]?.questionbadges?.[0]?.badges?.[0]?.image,
    "microexperience"
  );

  const careerLevelId = searchParams.get("careerLevelId");
  const questionId = searchParams.get("questionId");
  useEffect(() => {
    if (careerLevelId) {
      dispatch(fetchMicroexperience({careerLevelId}));
    }
  }, [dispatch, searchParams]);

  // const careerLevelId = microexperience?.[0]?._id;
  // console.log(careerLevelId, "careerLevelId");

  // const handleNext = () => {
  //   const payload = {
  //     careerLevelId: careerLevelId,
  //     badge: microexperience?.[0]?.questionbadges?.[0]?.badges?.[0]?.image,
  //   };

  //   const saveStepPayload = {
  //     careerLevelId : careerLevelId,
  //     route : "badge-earned",
  //     levelPercent : "33"
  //   }
  //        dispatch(saveSteps(saveStepPayload))
  //   dispatch(saveBadge(payload)).then((res) => {
     
  //     if (res.payload && res.payload.code === 201 || res.payload.statusCode === 200) {
  //            navigate(`/student-choice?questionId=${questionId}&careerLevelId=${careerLevelId}`)
  //     }
  //   });
  // };

  const handleNext = async () => {
  const payload = {
    careerLevelId: careerLevelId,
    badge: microexperience?.[0]?.questionbadges?.[0]?.badges?.[0]?.image,
  };

  const saveStepPayload = {
    careerLevelId: careerLevelId,
    route: `/badge-earned?questionId=${questionId}&careerLevelId=${careerLevelId}`,
    levelPercent: "33",
  };

  const saveStepsRes = await dispatch(saveSteps(saveStepPayload));
  const saveBadgeRes = await dispatch(saveBadge(payload));

  const isSaveStepsSuccess =
    saveStepsRes.payload?.code === 200 || saveStepsRes.payload?.code === 201;
  const isSaveBadgeSuccess =
    saveBadgeRes.payload?.code === 200 || saveBadgeRes.payload?.code === 201;

  if (isSaveStepsSuccess && isSaveBadgeSuccess) {
    navigate(
      `/student-choice?questionId=${questionId}&careerLevelId=${careerLevelId}`
    );
  }
};

  return loading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="w-full h-screen bg-[url('/assets/badge-bg.svg')] bg-cover bg-center">
      <div className="w-full p-4  ">
        <div className="w-[20px] h-[24px]">
          <img src="/assets/header_logo.svg" alt="logo" className="size-full" />
        </div>
        <div className=" flex flex-col gap-18 w-[325px] mx-auto">
          <h2 className="text-center text-[#4ED0AA] text-bold text-3xl mt-4">
            Your're an Explorer
          </h2>
          <img
            src={`${microexperience?.[0]?.questionbadges?.[0]?.badges?.[0]?.image}`}
            alt="badge"
          />
          <p className="text-white text-center">
            Keep exploring to unlock more achievements!
          </p>
          <Button onClick={handleNext}>
            {saveBadgeLoading || saveStepsLoading ? <LoadingSpinner size={20}></LoadingSpinner> : "Continue"}
            </Button>
        </div>
      </div>
    </div>
  );
};

export default BadgeEarned;
