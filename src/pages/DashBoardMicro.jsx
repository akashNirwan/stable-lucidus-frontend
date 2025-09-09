import React from "react";
import CareerCard from "../components/dashboard/microExperienceCard";
import { fetchDashboardMicroexperience } from "../redux/actions/dashboard-action";
import { useEffect } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";

const DashBoardMicro = () => {
  



  const dispatch = useDispatch();
  const { 
    dashboardMicroexperience, 
    dashboardMicroexperienceLoading, 
    error 
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardMicroexperience());
  }, [dispatch]);





  return dashboardMicroexperienceLoading ? (

     <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size={64} />
        </div>
    
  ) : (

      <div className="space-y-4 h-[520px] overflow-y-auto">
      {dashboardMicroexperience?.map((item) => (
        <CareerCard 
          key={item._id}
          data={item}
        />
      ))}
    </div>

  )
};

export default DashBoardMicro;
