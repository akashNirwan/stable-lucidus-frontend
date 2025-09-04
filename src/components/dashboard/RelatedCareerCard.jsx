import React from "react";
import { ArrowRight } from "lucide-react";

const RelatedCareerCard = () => {
  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-3 w-full max-w-[360px] mx-auto">
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-green-400 to-teal-500 flex items-center justify-center">
          <div className="w-[80px] h-[80px]">
            <img
              src="/assets/sdg/image-1.svg"
              alt="img"
              className="w-full h-full"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            Microfinance Specialist
          </h3>
        </div>
      </div>

      <button className="h-8 w-8 flex items-center justify-center rounded-full bg-green-500 text-white shadow">
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default RelatedCareerCard;
