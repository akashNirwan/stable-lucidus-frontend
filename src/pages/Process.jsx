import React from "react";
import ProcessCrousel from "../components/encylopedia/ProcessCrousel";
import { ArrowRight, Lock } from "lucide-react";

const Process = () => {
  const steps = [
    {
      title: "What Do They Do?",
      status: "locked",
    },
    {
      title: "Where Do They Work?",
      status: "locked",
    },
  ];
  return (
    <div className="text-white">
      <ProcessCrousel />
      <h2 className="text-[#C2B1FF]">Lessons</h2>

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
                <div className="h-6 w-6 rounded-full bg-[#5E35F1]"></div>
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

export default Process;
