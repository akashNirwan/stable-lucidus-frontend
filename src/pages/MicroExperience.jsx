import React from "react";
import Header from "../components/level/header";
import Question from "../components/level/question";
import LevelCarousel from "../components/level/crousel";
import Button from "../components/common/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import { fetchMicroexperience } from "../redux/actions/microexperience-action";
const Level = () => {
const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
const { microexperience, loading, error } = useSelector(
    (state) => state.microexperience
  );
  const careerLevelId = searchParams.get("careerLevelId");
console.log(careerLevelId, "careerLevelId in level");


  useEffect(() => {
      
      if (careerLevelId) {
        dispatch(fetchMicroexperience({careerLevelId}));
      }
    }, [dispatch, searchParams]);
  const experienceData = microexperience?.[0];
 
  return loading? (
    <div className="flex items-center justify-center min-h-[400px]">
             <LoadingSpinner size={64} />
           </div>
  ):(
       <div className="bg-[#130934] min-h-screen overflow-x-hidden">
      <Header data={experienceData}/>
      <Question data={experienceData} />
      <LevelCarousel data={experienceData} careerLevelId={careerLevelId}/>
    </div>
  )
};

export default Level;
