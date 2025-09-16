import React, { useEffect, useState } from "react";
import Button from "../components/common/Button";
import {
  saveBadge,
  fetchLevelBadges,
} from "../redux/actions/microexperience-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { saveSteps } from "../redux/actions/microexperience-action";

const BadgeEarned = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { saveBadgeLoading, saveStepsLoading, levelBadge, levelBadgeLoading } =
    useSelector((state) => state.microexperience);
  const navigate = useNavigate();

  console.log(levelBadge, "level badge ");

  const careerLevelId = searchParams.get("careerLevelId");
  const questionId = searchParams.get("questionId");

  const completedCareerLevelCount = parseInt(
    searchParams.get("completedCareerLevelCount")
  );

  useEffect(() => {
    dispatch(fetchLevelBadges());
  }, [dispatch]);

  const selectedBadge =
    levelBadge?.data?.find(
      (b) =>
        (completedCareerLevelCount === 0 && b.badgeName === "The Explorer") ||
        (completedCareerLevelCount === 2 && b.badgeName === "The Voyager") ||
        (completedCareerLevelCount === 4 && b.badgeName === "The Wayfarer")
    ) || null;

  let IncomingBadgeName = "";

  if (completedCareerLevelCount === 0) {
    IncomingBadgeName = "Explorer";
  } else if (completedCareerLevelCount === 2) {
    IncomingBadgeName = "Voyager";
  } else if (completedCareerLevelCount === 4) {
    IncomingBadgeName = "Wayfarer";
  }

  const handleNext = async () => {
    const payload = {
      careerLevelId: careerLevelId,
      badge: selectedBadge.image,
      badgeName: selectedBadge.badgeName,
    };

    const saveStepPayload = {
      careerLevelId: careerLevelId,
      route: `/badge-earned?questionId=${questionId}&careerLevelId=${careerLevelId}`,
      levelPercent: "5",
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

  return levelBadgeLoading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="w-full h-screen bg-[url('/assets/badge-bg.svg')] bg-cover bg-center">
      <div className="w-full h-full p-4 flex flex-col">
        {/* Header */}
        <div className="w-[20px] h-[24px]">
          <img src="/assets/header_logo.svg" alt="logo" className="size-full" />
        </div>

        {/* Content and Button */}
        <div className="flex flex-col justify-between flex-1">
          {/* Centered content */}
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <h2 className="text-[#4ED0AA] font-bold text-3xl mb-6">
              You're an {IncomingBadgeName}
            </h2>

            {selectedBadge && (
              <img
                src={selectedBadge.image}
                alt={selectedBadge.badgeName}
                className="mx-auto mb-6"
              />
            )}

            <p className="text-white">
              Keep exploring to unlock more
              <br /> achievements!
            </p>
          </div>

          {/* Bottom button */}
          <div className="w-[325px] mx-auto mb-6">
            <Button
              disabled={saveBadgeLoading || saveStepsLoading}
              onClick={handleNext}
              className="w-full"
            >
              {saveBadgeLoading || saveStepsLoading ? (
                <LoadingSpinner size={20} />
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeEarned;
