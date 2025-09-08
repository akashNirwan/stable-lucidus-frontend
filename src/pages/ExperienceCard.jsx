"use client";
import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveCareer } from "../redux/actions/dashboard-action";
import { useDispatch } from "react-redux";

const CareerExperienceCard = ({careerData, savedCareer,careerId }) => {

const dispatch = useDispatch()


  const [activeBtn, setActiveBtn] = useState("experience");
   const navigate = useNavigate()
  const handleExperienceClick = () => {
    setActiveBtn("experience");

     navigate(`/micro-intro?careerId=${careerId}`);;
  };




  const getImageSrc = () => {
    if (careerData?.image && careerData.image !== "tests.com") {
      return careerData.image;
    }
    return "/assets/lvl-1.svg"; 
  };

  const handlebookmark = ()=>{
      const payload = {
        careerId : careerId
      }

      dispatch(saveCareer(payload)); 
  }


  const handlemore = ()=>{
    navigate(`/encyclopedia?careerId=${careerId}`)
  }
  return (
    <div className="h-[350px] w-[320px] mx-auto rounded-2xl relative shadow-lg overflow-hidden">
      <div className="h-[250px] w-full">
        <img
          src={getImageSrc()}
          alt={careerData?.career || "career"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute bottom-0 left-0 h-[120px] w-full bg-white rounded-2xl">
        <div className="flex m-4 justify-between items-center">
          <div className="text-xl text-[#042119] font-semibold">
            {careerData?.career || "Career"}
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <button onClick={handlebookmark}>
               <Bookmark size={18} fill="#24A57F"  />
            </button>
           
          </div>
        </div>

        <div className="flex justify-between mt-2 px-4">
          <button
            onClick={handlemore}
            className={`py-[10px] px-[28px] rounded-xl flex items-center justify-center font-medium transition ${
              activeBtn === "more"
                ? "bg-[#24A57F] text-white"
                : "text-[#24A57F] "
            }`}
          >
            More
          </button>

          <button
            onClick={handleExperienceClick}
            className={`py-[10px] px-[28px] rounded-xl flex items-center justify-center font-medium transition ${
              activeBtn === "experience"
                ? "bg-[#24A57F] text-white"
                : "text-[#24A57F] "
            }`}
          >
            Experience It
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerExperienceCard;
