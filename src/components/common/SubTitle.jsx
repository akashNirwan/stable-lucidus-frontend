import React from "react";

const StatusTitle = ({ text, className = "" }) => {
  return (
    <h4 className={`text-[#24A57F] font-bold text-lg ${className}`}>{text}</h4>
  );
};

export default StatusTitle;
