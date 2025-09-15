"use client";
import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveCareer } from "../redux/actions/dashboard-action";
import { useDispatch } from "react-redux";

const CareerExperienceCard = ({ careerData, savedCareer, careerId }) => {
  const dispatch = useDispatch();

  const [activeBtn, setActiveBtn] = useState("experience");
  const navigate = useNavigate();
  const handleExperienceClick = () => {
    setActiveBtn("experience");

    navigate(`/micro-intro?careerId=${careerId}`);
  };

  const getImageSrc = () => {
    if (careerData?.image && careerData.image !== "tests.com") {
      return careerData.image;
    }
    return "/assets/lvl-1.svg";
  };
  const bookmark = true;
  const handlebookmark = () => {
    const payload = {
      careerId: careerId,
    };

    dispatch(saveCareer(payload));
  };

  const handlemore = () => {
    navigate(`/encyclopedia/purpose?careerId=${careerId}`);
  };

  return (
    <div className="h-[350px] w-[320px] mx-auto rounded-2xl relative shadow-lg overflow-hidden">
      <div className="h-[250px] w-full">
        <img
          src={getImageSrc()}
          alt={careerData?.career || "career"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute bottom-0 left-0 h-[120px] w-full bg-white rounded-2xl">
        <div className="flex m-4 justify-between items-center">
          <div className="text-xl text-[#042119] font-semibold">
            {careerData?.career || "Career"}
          </div>
          <div className="flex items-center gap-1 text-gray-600 ">
            <button onClick={handlebookmark} className="cursor-pointer">
              {bookmark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#24A57F"
                  viewBox="0 0 32 32"
                >
                  <path d="M22.6665 4H9.33317C7.8665 4 6.6665 5.2 6.6665 6.66667V28L15.9998 24L25.3332 28V6.66667C25.3332 5.2 24.1332 4 22.6665 4Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="none"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M22.6665 4H9.33317C7.8665 4 6.6665 5.2 6.6665 6.66667V28L15.9998 24L25.3332 28V6.66667C25.3332 5.2 24.1332 4 22.6665 4ZM22.6665 24L15.9998 21.0933L9.33317 24V8C9.33317 7.26667 9.93317 6.66667 10.6665 6.66667H21.3332C22.0665 6.66667 22.6665 7.26667 22.6665 8V24Z"
                    fill="#24A57F"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-between mt-2 px-4">
          <button
            onClick={handlemore}
            className={`py-[10px] px-[28px] rounded-xl cursor-pointer flex items-center justify-center font-medium transition ${
              activeBtn === "more"
                ? "bg-[#24A57F] text-white"
                : "text-[#24A57F] "
            }`}
          >
            More
          </button>

          <button
            onClick={handleExperienceClick}
            className={`py-[10px] px-[28px] rounded-xl cursor-pointer flex items-center justify-center font-medium transition ${
              activeBtn === "experience"
                ? "bg-[#24A57F] text-white"
                : "text-[#24A57F] "
            }`}
          >
            Experience It
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerExperienceCard;
