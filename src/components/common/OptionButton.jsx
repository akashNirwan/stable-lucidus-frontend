import React from "react";

const OptionButton = ({ option, selected, onSelect, img = "" }) => {
  return (
    <button
      onClick={() => onSelect(option)}
      className={`w-full flex items-center justify-center gap-2  bg-[#EFEAFF] px-4 py-2 rounded-xl border truncate border-[#7B56FF] ${
        selected === option
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
