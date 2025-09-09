import React from "react";
import { ArrowRight } from "lucide-react"; // install lucide-react if not already
import { useNavigate } from "react-router-dom";
const CareerCard = ({data}) => {


  const navigate = useNavigate()


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

    
    if (currentRoute.startsWith('/micro-intro')) {
      return `/level?careerLevelId=${careerLevelId}`;
    } else if (currentRoute.startsWith('/level')) {
      
      const urlParams = new URLSearchParams(currentRoute.split('?')[1]);
      const questionId = urlParams.get('questionId');
      return questionId 
        ? `/feedbackform?careerLevelId=${careerLevelId}&questionId=${questionId}`
        : `/level?careerLevelId=${careerLevelId}`;
    } else if (currentRoute.startsWith('/feedbackform')) {
      const urlParams = new URLSearchParams(currentRoute.split('?')[1]);
      const questionId = urlParams.get('questionId');
      return `/badge-earned?careerLevelId=${careerLevelId}&questionId=${questionId}`;
    } else if (currentRoute.startsWith('/badge-earned')) {
      const urlParams = new URLSearchParams(currentRoute.split('?')[1]);
      const questionId = urlParams.get('questionId');
      return `/student-choice?questionId=${questionId}&careerLevelId=${careerLevelId}`;
    } else if (currentRoute.startsWith('/student-choice')) {
      return `/survey-page?careerLevelId=${careerLevelId}`;
    }

    // Default fallback
    return `/micro-intro?careerLevelId=${careerLevelId}`;
  };

  const handleArrowClick = () => {
    const nextRoute = getNextRoute();
    console.log('Navigating to:', nextRoute); // Debug log
    navigate(nextRoute);
  };


  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-3 w-full max-w-[360px] mx-auto gap-8">
      <div className="flex items-start gap-3 ">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-green-400 to-teal-500 flex items-center justify-center">
          <div className="w-[80px] h-[80px]">
            {careerImage && careerImage !== "tests.com" ? (
              <img
                src={careerImage}
                alt="career"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <img
                src="/assets/sdg/image-1.svg"
                alt="img"
                className="w-full h-full"
              />
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800">
           {careerName}
          </h3>

          <div className="mt-2 w-[180px]">
            <div className="h-2 bg-purple-200 rounded-full">
              <div className="h-2 w-[30%] bg-green-500 rounded-full" style={{ width: `${levelPercent}%` }}></div>
            </div>

            <div className="flex justify-between mt-1 text-xs font-medium">
              <span className="text-green-600">{careerLevel}</span>
              <span className="text-purple-500">{levelPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleArrowClick}  className="h-8 w-8 flex items-center justify-center rounded-full bg-green-500 text-white shadow">
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default CareerCard;
