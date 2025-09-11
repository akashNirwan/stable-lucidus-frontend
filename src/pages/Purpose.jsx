import React from "react";
import PurposeCrousel from "../components/encylopedia/PurposeCrousel";
import { ArrowRight, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Purpose = () => {
  const navigate = useNavigate("");
  const { predictionandPurpose, loading } = useSelector(
    (state) => state.encyclopedia
  );

  console.log(predictionandPurpose?.[0]?.encyclolessons, "prediction purpose");

  const steps =
    predictionandPurpose?.[0]?.encyclolessons.map((item, index) => ({
      title: item.lesson[0]?.lesson,
      status: index === 0 ? "active" : "locked",
      lessonId: item.lesson[0]?._id,
    })) || [];

  return (
    <div className="text-white">
      <PurposeCrousel />
      <h2>Lessons</h2>

      <div className=" overflow-hidden overflow-y-auto grid mt-2 gap-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex items-center justify-between w-full max-w-[600px] rounded-lg gap-4"
          >
            <div className="flex items-center gap-3 bg-[#2a1760] rounded-full  px-4 py-3 w-full">
              {step.status === "active" ? (
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="h-6 w-6 rounded-full border-1 border-white"></div>
                    <div className="h-[26px] w-[26px] rounded-full border-4 border-green-400 border-l-transparent absolute -top-px left-0 "></div>
                  </div>
                </div>
              ) : (
                <div className="h-6 w-6 rounded-full bg-purple-600"></div>
              )}
              <span className="text-white font-medium ">{step.title}</span>
            </div>

            {step.status === "active" ? (
              <div
                className="h-8 w-8 flex items-center justify-center rounded-full shrink-0 bg-[#0F8864] text-white"
                onClick={() =>
                  navigate(`/encylopedia-todo?LessonId=${step.lessonId}`)
                }
              >
                <ArrowRight size={18} />
              </div>
            ) : (
              <div className="h-8 w-8 flex items-center justify-center rounded-full shrink-0 bg-purple-800 text-white">
                <Lock size={18} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purpose;
