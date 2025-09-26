import React from "react";
import ProcessCrousel from "../components/encylopedia/ProcessCrousel";
import { ArrowRight, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Process = () => {
  const navigate = useNavigate();
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
                className="h-10 w-10 flex items-center justify-center rounded-full shrink-0 bg-[#0F8864] text-white"
                onClick={() =>
                  navigate(`/encylopedia-todo?LessonId=${step.lessonId}`)
                }
              >
                <ArrowRight size={18} />
              </div>
            ) : (
              <div className="h-10 w-10 flex items-center justify-center rounded-full shrink-0 bg-[#261172] text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="21"
                  viewBox="0 0 16 21"
                  fill="none"
                >
                  <path
                    d="M14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM8 16C6.9 16 6 15.1 6 14C6 12.9 6.9 12 8 12C9.1 12 10 12.9 10 14C10 15.1 9.1 16 8 16ZM5 7V5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7H5Z"
                    fill="#5E35F1"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Process;
