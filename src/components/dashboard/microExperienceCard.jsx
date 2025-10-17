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
      return `/micro-intro?careerLevelId=${careerLevelId}&levelNumber=1`;
    }

    const urlParams = new URLSearchParams(currentRoute.split("?")[1]);
    const levelNumber = urlParams.get("levelNumber") || "1";
    const questionId = urlParams.get("questionId");
    const completedCareerLevelCount =
      urlParams.get("completedCareerLevelCount") || "0";
    const questionLeveltwoId = urlParams.get("questionLeveltwoId");

    if (
      currentRoute.startsWith("/micro-intro") &&
      !currentRoute.includes("Level-two")
    ) {
      return `/level?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}`;
    }

    // Case 2: /level -> /feedbackform
    else if (
      currentRoute.startsWith("/level") &&
      !currentRoute.includes("feedbackform")
    ) {
      return `/feedbackform?careerLevelId=${careerLevelId}&questionId=${questionId}&levelNumber=${levelNumber}`;
    }

    // Case 3: /feedbackform -> conditional routing
    else if (
      currentRoute.startsWith("/feedbackform") &&
      !currentRoute.includes("level-two")
    ) {
      // Special case for levelNumber = 2
      if (levelNumber === "2" && completedCareerLevelCount === 0) {
        // If levelNumber is 2 and userBadgeCount is 0, go to badge-earned
        return `/badge-earned?careerLevelId=${careerLevelId}&questionId=${questionId}&completedCareerLevelCount=${completedCareerLevelCount}&levelNumber=${levelNumber}`;
      } else if (levelNumber === "2") {
        // If levelNumber is 2 and userBadgeCount is anything else, go to micro-intro-level-two
        return `/micro-intro-level-two?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}&questionId=${questionId}`;
      } else {
        // Default case - go to student-choice
        return `/student-choice?questionId=${questionId}&careerLevelId=${careerLevelId}&levelNumber=${levelNumber}`;
      }
    }

    // Case 4: /badge-earned -> /student-choice
    else if (currentRoute.startsWith("/badge-earned")) {
      return `/micro-intro-level-two?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}&questionId=${questionId}`;
    }

    // Case 5: /student-choice -> /survey-page
    else if (currentRoute.startsWith("/student-choice")) {
      // Note: You mentioned microexperience[0]?.studentinsights[0]?.careerLevelId
      // but that data isn't available in this component, so using current careerLevelId
      return `/survey-page?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}`;
    }

    // Case 6: /micro-intro-level-two -> /drag-and-drop
    else if (currentRoute.startsWith("/micro-intro-level-two")) {
      return `/drag-and-drop?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}&questionId=${questionId}`;
    }

    // Case 7: /drag-and-drop -> /feedbackform-level-two
    else if (currentRoute.startsWith("/drag-and-drop")) {
      return `/feedbackform-level-two?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}&questionLeveltwoId=${questionLeveltwoId}`;
    }

    // Case 8: /feedbackform-level-two -> /student-choice
    else if (currentRoute.startsWith("/feedbackform-level-two")) {
      return `/student-choice?questionId=${questionId}&careerLevelId=${careerLevelId}&levelNumber=${levelNumber}`;
    } else if (currentRoute.startsWith("/survey-page")) {
      return `/dashboard/explorecareers?careerLevelId=${careerLevelId}&Modal=true&levelNumber=${levelNumber}`;
    }

    // Default fallback
    return `/micro-intro?careerLevelId=${careerLevelId}&levelNumber=1`;
  };

  const handleArrowClick = () => {
    const nextRoute = getNextRoute();

    navigate(nextRoute);
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-3xl shadow-md p-3 w-[312px] max-w-[345px] mx-auto gap-6">
      <div className="flex items-start gap-2">
        <div className="w-20 h-20 rounded-[16px] shrink-0 overflow-hidden ">
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
          <h3 className=" font-semibold text-[#042119] min-h-[48px]">
            {careerName}
          </h3>

          <div className="mt-2 w-[124px]">
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
        className="h-12 w-12 flex items-center shrink-0 justify-center rounded-full bg-[#24A57F] text-white shadow"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clip-path="url(#clip0_112_2129)">
            <path
              d="M5 13H16.17L11.29 17.88C10.9 18.27 10.9 18.91 11.29 19.3C11.68 19.69 12.31 19.69 12.7 19.3L19.29 12.71C19.68 12.32 19.68 11.69 19.29 11.3L12.71 4.69997C12.32 4.30997 11.69 4.30997 11.3 4.69997C10.91 5.08997 10.91 5.71997 11.3 6.10997L16.17 11H5C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_112_2129">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default CareerCard;
