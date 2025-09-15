import React from "react";

const OptionButton = ({ option, selected, optionId, onSelect, img = "" }) => {
  console.log(optionId, "optionID");
  const isSelected = optionId ? selected === optionId : selected === option;
  return (
    <button
      onClick={() => onSelect(optionId || option)}
      className={`w-full flex items-center justify-center gap-2  bg-[#EFEAFF] px-4 py-3 rounded-[12px] border truncate border-[#7B56FF] ${
        isSelected
          ? "!bg-[#4823CF] text-white"
          : "text-[#7B56FF] hover:bg-[#4823CF] hover:text-white"
      }`}
    >
      {img && (
        <img
          src={img}
          alt={option}
          className="w-5 h-5 object-contain rounded-md"
        />
      )}
      <span className="truncate">{option}</span>
    </button>
  );
};

export default OptionButton;
