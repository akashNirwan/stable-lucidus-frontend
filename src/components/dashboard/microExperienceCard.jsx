import React from "react";
import { ArrowRight } from "lucide-react"; // install lucide-react if not already
import { useNavigate } from "react-router-dom";
const CareerCard = ({ data }) => {
  const navigate = useNavigate();

  const careerLevel = data?.careerlevels?.[0]?.careerLevel || "Level 1";
  const careerName = data?.careerlevels?.[0]?.careers?.[0]?.career || "Career";
  const careerImage = data?.careerlevels?.[0]?.careers?.[0]?.image;
  const levelPercent = data?.levelPercent || "0";
  const careerLevelId = data?.careerLevelId;
  const currentRoute = data?.route;

  const getNextRoute = () => {
    if (!currentRoute) {
      return `/micro-intro?careerLevelId=${careerLevelId}`;
    }

    if (currentRoute.startsWith("/micro-intro")) {
      return `/level?careerLevelId=${careerLevelId}`;
    } else if (currentRoute.startsWith("/level")) {
      const urlParams = new URLSearchParams(currentRoute.split("?")[1]);
      const questionId = urlParams.get("questionId");
      const completedCareerLevelCount =
        urlParams.get("completedCareerLevelCount") || "0";

      return questionId
        ? `/feedbackform?careerLevelId=${careerLevelId}&questionId=${questionId}&completedCareerLevelCount=${completedCareerLevelCount}`
        : `/level?careerLevelId=${careerLevelId}`;
    } else if (currentRoute.startsWith("/feedbackform")) {
      const urlParams = new URLSearchParams(currentRoute.split("?")[1]);
      const questionId = urlParams.get("questionId");
      const completedCareerLevelCount =
        urlParams.get("completedCareerLevelCount") || "0";

      // Check if completedCareerLevelCount is 0, 2, or 4
      if (
        completedCareerLevelCount === "0" ||
        completedCareerLevelCount === "2" ||
        completedCareerLevelCount === "4"
      ) {
        return `/badge-earned?careerLevelId=${careerLevelId}&questionId=${questionId}&completedCareerLevelCount=${completedCareerLevelCount}`;
      } else {
        return `/student-choice?questionId=${questionId}&careerLevelId=${careerLevelId}`;
      }
    } else if (currentRoute.startsWith("/badge-earned")) {
      const urlParams = new URLSearchParams(currentRoute.split("?")[1]);
      const questionId = urlParams.get("questionId");
      return `/student-choice?questionId=${questionId}&careerLevelId=${careerLevelId}`;
    } else if (currentRoute.startsWith("/student-choice")) {
      return `/survey-page?careerLevelId=${careerLevelId}`;
    }

    // Default fallback
    return `/micro-intro?careerLevelId=${careerLevelId}`;
  };

  // const getNextRoute = () => {
  //   if (!currentRoute) {
  //     return `/micro-intro?careerLevelId=${careerLevelId}`;
  //   }

  //   if (currentRoute.startsWith("/micro-intro")) {
  //     return `/level?careerLevelId=${careerLevelId}`;
  //   } else if (currentRoute.startsWith("/level")) {
  //     const urlParams = new URLSearchParams(currentRoute.split("?")[1]);
  //     const questionId = urlParams.get("questionId");
  //     return questionId
  //       ? `/feedbackform?careerLevelId=${careerLevelId}&questionId=${questionId}`
  //       : `/level?careerLevelId=${careerLevelId}`;
  //   } else if (currentRoute.startsWith("/feedbackform")) {
  //     const urlParams = new URLSearchParams(currentRoute.split("?")[1]);
  //     const questionId = urlParams.get("questionId");
  //     return `/badge-earned?careerLevelId=${careerLevelId}&questionId=${questionId}`;
  //   } else if (currentRoute.startsWith("/badge-earned")) {
  //     const urlParams = new URLSearchParams(currentRoute.split("?")[1]);
  //     const questionId = urlParams.get("questionId");
  //     return `/student-choice?questionId=${questionId}&careerLevelId=${careerLevelId}`;
  //   } else if (currentRoute.startsWith("/student-choice")) {
  //     return `/survey-page?careerLevelId=${careerLevelId}`;
  //   }

  //   // Default fallback
  //   return `/micro-intro?careerLevelId=${careerLevelId}`;
  // };

  const handleArrowClick = () => {
    const nextRoute = getNextRoute();
    console.log("Navigating to:", nextRoute); // Debug log
    navigate(nextRoute);
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-2 w-full max-w-[425px] mx-auto gap-6">
      <div className="flex items-start gap-2">
        {/* Image Wrapper */}

        <div className="w-20 h-20 rounded-lg overflow-hidden ">
          {careerImage && careerImage !== "tests.com" ? (
            <img
              src={careerImage}
              alt="career"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="/assets/sdg/image-1.svg"
              alt="img"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex flex-col">
          <h3 className=" font-semibold text-gray-800 min-h-[48px]">
            {careerName}
          </h3>

          <div className="mt-2 w-[160px]">
            <div className="h-2 bg-purple-200 rounded-full">
              <div
                className="h-2 bg-[#24A57F] rounded-full shrink-0"
                style={{ width: `${levelPercent}%` }}
              />
            </div>

            <div className="flex justify-between mt-1 text-xs font-medium">
              <span className="text-[#5E35F1]">{careerLevel}</span>
              <span className="text-[#5E35F1]">{levelPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow Button */}
      <button
        onClick={handleArrowClick}
        className="h-12 w-12 flex items-center justify-center rounded-full bg-[#24A57F] text-white shadow"
      >
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default CareerCard;
