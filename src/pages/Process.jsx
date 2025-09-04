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
    {
      title: "Where Do They Work?",
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
      <h2>Lessons</h2>

      <div className=" h-[182px] overflow-hidden overflow-y-auto grid gap-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex items-center justify-between w-full max-w-sm rounded-full bg-[#2a1760] px-4 py-3"
          >
            <div className="flex items-center gap-3">
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
              <span className="text-white font-medium">{step.title}</span>
            </div>

            {step.status === "active" ? (
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-500 text-white">
                <ArrowRight size={18} />
              </div>
            ) : (
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-purple-800 text-white">
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
