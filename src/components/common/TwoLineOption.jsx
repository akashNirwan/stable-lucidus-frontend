
import React from "react";

const TwoLineOption = ({ option, selected, onSelect, img = "", optionSub }) => {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex flex-col items-center justify-center min-h-[60px] bg-[#EFEAFF] px-4 py-2 rounded-xl border truncate border-[#7B56FF] transition-all duration-200 ${
        selected
          ? "!bg-[#4823CF] text-white"
          : "text-[#7B56FF] hover:bg-[#4823CF] hover:text-white"
      }`}
    >
      <div className="flex items-center justify-center gap-1">
        {/* {img && (
          <img
            src={img}
            alt={option}
            className="w-5 h-5 object-contain rounded-md"
          />
        )} */}

        {img && (
  img.startsWith('http') ? 
    <img src={img} alt={option} className="w-5 h-5 object-contain rounded-md" /> :
    <span className="text-lg">{img}</span>
)}
        <div className="truncate font-semibold">{option}</div>
      </div>
      <div className="text-xs">{optionSub}</div>
    </button>
  );
};

export default TwoLineOption;