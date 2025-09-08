import React from "react";
import { ArrowLeft } from "lucide-react";
import ProgressBar from "../components/common/ProgressBar";
const RoadMap = () => {
  return (
    <div className="text-white">
      <div className="bg-[#0f0630] min-h-screen text-white p-4">
        <div className="flex items-center gap-2 mb-6">
          <ArrowLeft className="w-5 h-5" />
          <h1 className="text-lg font-semibold">
            Chief Financial Officer (CFO)
          </h1>
        </div>

        <div className="bg-gradient-to-r from-[#2c0f65] to-[#1a0b44] rounded-2xl px-4 flex items-center gap-4 w-fit">
          <div className="w-[100px] h-[80px]">
            <img
              src="/road-map-robot.svg"
              alt="astronaut"
              className="w-full h-full "
            />
          </div>

          <p className="text-base font-medium max-w-xs">
            Kickstart your career exploration in Grade 9!
          </p>
        </div>
        <ProgressBar />
      </div>
    </div>
  );
};

export default RoadMap;
