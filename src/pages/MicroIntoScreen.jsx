import React, { useState, useEffect } from "react";
import MicroIntoScreenOne from "./MicroScreenOne";
import MicroIntoScreenTwo from "./MicroIntoScreenTwo";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMicroexperience } from "../redux/actions/microexperience-action";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useOutletContext } from "react-router-dom";
const MicroIntoScreen = () => {
  const { screen, setScreen, setVideoUrl,setVideoLoading } = useOutletContext();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { microexperience, loading, error } = useSelector(
    (state) => state.microexperience
  );

  const careerId = searchParams.get("careerId");
  const careerLevelId = searchParams.get("careerLevelId");
  const levelNumber = searchParams.get("levelNumber")|| 1;



  useEffect(() => {
    if (careerId) {
      dispatch(
        fetchMicroexperience({
          careerId: careerId,
          levelNumber: levelNumber || 1,
        })
      );
    } else if (careerLevelId) {
      dispatch(
        fetchMicroexperience({
          careerLevelId: careerLevelId,
        })
      );
    }
  }, [dispatch, careerId, careerLevelId, levelNumber]);

  const experienceData = microexperience?.[0];
    const levelString = microexperience?.[0]?.careerLevel;  
// const levelNumber2 = levelString ? levelString.split('-')[1].trim() : null;  // "2"
    const levelNumber2 = levelString 
  ? parseInt(levelString.match(/\d+/)?.[0], 10) 
  : null;
  console.log(levelNumber2, "level");
  
      
    


  useEffect(() => {
  
  if (loading && setVideoUrl && setVideoLoading) {
    setVideoUrl(null);
    setVideoLoading(true);
  }
}, [loading, setVideoUrl, setVideoLoading]);

useEffect(() => {
  if (experienceData?.questionintros && setVideoUrl && setVideoLoading && !loading) {
    const currentVideoUrl = experienceData?.questionintros[screen - 1]?.image;
    
    if (currentVideoUrl) {
      setVideoUrl(currentVideoUrl);
      setTimeout(() => setVideoLoading(false), 300);
    } else {
      setVideoLoading(false);
    }
  }
}, [screen, experienceData, setVideoUrl, setVideoLoading, loading]);
 
  


  



  const screenComponent = {
    1: <MicroIntoScreenOne setScreen={setScreen} data={experienceData} />,
    2: <MicroIntoScreenTwo levelNumber={levelNumber2} setScreen={setScreen} data={experienceData} />,
  };

  return loading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="flex items-center justify-center">
      {screenComponent[screen] ?? <div>Unavailable</div>}
    </div>
  );
};

export default MicroIntoScreen;
