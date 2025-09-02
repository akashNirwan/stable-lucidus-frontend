import React from "react";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Header = ({data}) => {
    const navigate = useNavigate()
     const careerId = data?.careerId
   const handleBack = () => {
    navigate(`/micro-intro?careerId=${careerId}`);
  };

  return (
    <header className="p-6 pb-0">
      <div className="w-[20px] h-[24px]">
        <img src="/assets/header_logo.svg" alt="logo" className="size-full" />
      </div>
      <div className="flex justify-between text-white py-6">
        <div>
          <FaArrowLeft onClick={handleBack} />
        </div>
        <div>
          <button className="bg-[#7B5CFF] text-white text-xs font-semibold px-4 py-1 rounded-full">
            LEVEL 1
          </button>
        </div>
        <div>
          <FaTimes />
        </div>
      </div>
    </header>
  );
};

export default Header;
