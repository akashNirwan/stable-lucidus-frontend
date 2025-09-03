import React from "react";
import { fetchBadges } from "../redux/actions/dashboard-action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";



const DashBoardMenuThree = () => {
  const dispatch = useDispatch()
   const { badges, badgesLoading, error } = useSelector((state) => state.dashboard);
    useEffect(() => {
    dispatch(fetchBadges());
  }, [dispatch]);



  return badgesLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
               <LoadingSpinner size={64} />
             </div>
  ): (
       <div className="text-white ">
      <h2 className="text-center text-[#A187FF] text-[28px] font-bold">
        Badges
      </h2>
       <div className="flex flex-wrap gap-6 justify-center">
        {badges.length > 0 ? (
          badges.map((badge, index) => (
            <div
              key={badge._id || index}
              className="w-[200px] h-[200px] flex items-center justify-center bg-gray-900 rounded-2xl shadow-lg"
            >
              <img
                src={badge.badge}
                alt={`Badge ${index + 1}`}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-400">No badges available</p>
        )}
      </div>
    </div>
  )
};

export default DashBoardMenuThree;
