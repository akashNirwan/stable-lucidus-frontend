import React from "react";
import CareerExperienceCard from "./ExperienceCard";
import { fetchSavedCareers } from "../redux/actions/dashboard-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useEffect } from "react";

const SavedCareer = () => {

  const dispatch = useDispatch();
  
  const {fetchsavedCareer ,  savedCareerLoading, error } = useSelector(
    (state) => state.dashboard
  );
    
  
  
  useEffect(() => {
    dispatch(fetchSavedCareers());
  }, [dispatch]);


  return savedCareerLoading?  (
      <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner size={64} />
          </div>
  ) : (
         
    <div className="grid gap-4 p-4">
  {fetchsavedCareer && fetchsavedCareer.length > 0 ? (
    fetchsavedCareer.map((savedCareer) => (
      <CareerExperienceCard
        key={savedCareer._id}
        careerData={savedCareer.careers[0]}
        savedCareer={savedCareer}
        careerId={savedCareer.careerId}
      />
    ))
  ) : (
    <p className="text-center text-gray-500">No data available</p>
  )}
</div>
  )
};

export default SavedCareer;
