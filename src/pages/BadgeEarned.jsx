import React, { useEffect, useState } from "react";
import Button from "../components/common/Button";
import {
  fetchMicroexperience,
  saveBadge,
} from "../redux/actions/microexperience-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useSearchParams } from "react-router-dom";

const BadgeEarned = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { microexperience, loading, error, saveBadgeLoading } = useSelector(
    (state) => state.microexperience
  );

  console.log(
    microexperience?.[0]?.questionbadges?.[0]?.badges?.[0]?.image,
    "microexperience"
  );

  const careerId = searchParams.get("careerId");
  useEffect(() => {
    if (careerId) {
      dispatch(fetchMicroexperience(careerId));
    }
  }, [dispatch, searchParams]);

  const careerLevelId = microexperience?.[0]?._id;
  console.log(careerLevelId, "careerLevelId");

  const handleNext = () => {
    const payload = {
      careerLevelId: microexperience?.[0]?._id,
      badge: microexperience?.[0]?.questionbadges?.[0]?.badges?.[0]?.image,
    };

    dispatch(saveBadge(payload)).then((res) => {
      if (res.payload && res.payload.code === 201 || res.payload.code === 200) {
        alert("hii")
      }
    });
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
          <Button onClick={handleNext}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default BadgeEarned;
