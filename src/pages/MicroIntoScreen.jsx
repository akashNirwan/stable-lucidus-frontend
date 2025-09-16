import React, { useState, useEffect } from "react";
import MicroIntoScreenOne from "./MicroScreenOne";
import MicroIntoScreenTwo from "./MicroIntoScreenTwo";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMicroexperience } from "../redux/actions/microexperience-action";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useOutletContext } from "react-router-dom";
const MicroIntoScreen = () => {
  const { screen, setScreen, setVideoUrl } = useOutletContext();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { microexperience, loading, error } = useSelector(
    (state) => state.microexperience
  );

  const careerId = searchParams.get("careerId");
  const careerLevelId = searchParams.get("careerLevelId");
  const levelNumber = searchParams.get("levelNumber");

  // useEffect(() => {

  //     if (careerId) {
  //       dispatch(fetchMicroexperience(careerId));
  //     }
  //   }, [dispatch, searchParams]);

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

  useEffect(() => {
    if (experienceData?.questionintros && setVideoUrl) {
      const currentVideoUrl = experienceData?.questionintros[screen - 1]?.image;
      {console.log(experienceData?.questionintros[screen - 1]?.image, "experiencedata");
      }
      if (currentVideoUrl) {
        setVideoUrl(currentVideoUrl);
        {console.log(setVideoUrl, "video. url");
        }
      }
    }
  }, [screen, experienceData, setVideoUrl]);

 
  

// useEffect(() => {
//     console.log("🔥 useEffect TRIGGERED");
//     console.log("=== VIDEO URL DEBUG ===");
//     console.log("setVideoUrl function:", setVideoUrl);
//     console.log("experienceData:", experienceData);
//     console.log("experienceData?.questionintros:", experienceData?.questionintros);
//     console.log("current screen:", screen);
//     console.log("screen - 1 (array index):", screen - 1);
    
//     if (experienceData?.questionintros && setVideoUrl) {
//       const currentVideoUrl = experienceData.questionintros[screen - 1]?.image;
//       console.log("currentVideoUrl:", currentVideoUrl);
//       console.log("questionintros[0]:", experienceData.questionintros[0]);
//       console.log("questionintros[1]:", experienceData.questionintros[1]);
      
//       if (currentVideoUrl) {
//         console.log("✅ Setting video URL to:", currentVideoUrl);
//         setVideoUrl(currentVideoUrl);
//       } else {
//         console.log("❌ No video URL found for current screen");
//       }
//     } else {
//       console.log("⚠️ Missing data or setVideoUrl function");
//       console.log("experienceData?.questionintros exists:", !!experienceData?.questionintros);
//       console.log("setVideoUrl exists:", !!setVideoUrl);
//     }
//     console.log("=== END DEBUG ===");
//   }, [screen, experienceData, setVideoUrl]);
  



  const screenComponent = {
    1: <MicroIntoScreenOne setScreen={setScreen} data={experienceData} />,
    2: <MicroIntoScreenTwo levelNumber={levelNumber} setScreen={setScreen} data={experienceData} />,
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
