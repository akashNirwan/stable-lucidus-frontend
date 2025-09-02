"use client";
import React, { useState } from "react";
import { Bookmark } from "lucide-react";

const CareerExperienceCard = () => {
  const [activeBtn, setActiveBtn] = useState("experience");

  const handleExperienceClick = () => {
    setActiveBtn("experience");
    // 👉 Replace this with navigation, modal, or API call
    alert("Experience It clicked 🚀");
  };

  return (
    <div className="h-[350px] w-[320px] mx-auto rounded-2xl relative shadow-lg overflow-hidden">
      {/* Image Section */}
      <div className="h-[250px] w-full">
        <img
          src="/assets/lvl-1.svg"
          alt="career"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Bottom Section */}
      <div className="absolute bottom-0 left-0 h-[120px] w-full bg-white rounded-2xl">
        {/* Title Row */}
        <div className="flex m-4 justify-between items-center">
          <div className="text-xl text-[#042119] font-semibold">
            Hydrologist
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Bookmark size={18} fill="#24A57F" />
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex justify-between mt-2 px-4">
          <button
            onClick={() => setActiveBtn("more")}
            className={`py-[10px] px-[28px] rounded-xl flex items-center justify-center font-medium transition ${
              activeBtn === "more"
                ? "bg-[#24A57F] text-white"
                : "text-[#24A57F] "
            }`}
          >
            More
          </button>

          <button
            onClick={handleExperienceClick}
            className={`py-[10px] px-[28px] rounded-xl flex items-center justify-center font-medium transition ${
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
