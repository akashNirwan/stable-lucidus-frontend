import React from "react";
import { ArrowRight } from "lucide-react";

const RelatedCareerCard = ({career, image}) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-3 w-full max-w-[360px] mx-auto">
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-green-400 to-teal-500 flex items-center justify-center">
          <div className="w-[80px] h-[80px]">
            <img
              src={image}
              alt={career}
              className="w-full h-full"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            {career}
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
