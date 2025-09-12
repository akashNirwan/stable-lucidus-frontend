import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveFeedback } from "../redux/actions/microexperience-action";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { saveSteps } from "../redux/actions/microexperience-action";

export default function CareerSurvey() {
   const dispatch = useDispatch();
    const {  saveFeedbackLoading , saveStepsLoading} = useSelector(
      (state) => state.microexperience
    );

  const [searchParams] = useSearchParams();
  const careerLevelId = searchParams.get("careerLevelId");
  console.log(careerLevelId, "careerLevelId");

  const [islike, setIsLike] = useState("");
  const navigate = useNavigate();


  
  // const handleChoice = (choice) => {

  //   const payload = {
  //     careerLevelId : careerLevelId,
  //     route : "/survey-page",
  //     levelPercent : "50"
  //   }
  //   setIsLike(choice);
     
  //   dispatch(saveSteps(payload))
  //   dispatch(
  //     saveFeedback({
  //       likeDislike: choice === "like" ? "Like" : "Dislike",
  //       careerLevelId: careerLevelId,
  //     })
  //   ).then((res) => {
       
  //       if (res.payload && res.payload.code === 201 || res.payload.statusCode === 200) {
  //              navigate("/dashboard");
  //       }
  //     });

    
   
  // };

  const handleChoice = async (choice) => {
  const payload = {
    careerLevelId: careerLevelId,
    route: "/survey-page",
    levelPercent: "20",
  };

  setIsLike(choice);
const endTime = Date.now(); 
  const saveStepsRes = await dispatch(saveSteps(payload));
  const saveFeedbackRes = await dispatch(
    saveFeedback({
      likeDislike: choice === "like" ? "Like" : "Dislike",
      careerLevelId: careerLevelId,
      endTime : endTime,
    })
  );

  const isSaveStepsSuccess =
    saveStepsRes.payload?.code === 200 ||
    saveStepsRes.payload?.code === 201;

  const isSaveFeedbackSuccess =
    saveFeedbackRes.payload?.code === 200 ||
    saveFeedbackRes.payload?.code === 201;

  if (isSaveStepsSuccess && isSaveFeedbackSuccess) {
    navigate("/dashboard");
  }
};
  return saveFeedbackLoading || saveStepsLoading ? (
               <div className="flex items-center justify-center min-h-[400px]">
                    <LoadingSpinner size={64} />
                  </div>
  ) : (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#130934] to-[#24A57F] h-screen w-full">
        <div className="fixed inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <div
              key={`plus-${i}`}
              className="absolute text-white text-xs opacity-80 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              ✦
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-6 flex gap-2">
        <div className="w-42 h-2 bg-white rounded-full" />
        <div className="w-42 h-2 bg-white rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        <h2 className="text-white text-xl font-semibold leading-snug">
          How do you feel about learning <br /> more about this career?
        </h2>

        <div className="flex flex-col gap-6">
          <div onClick={() => handleChoice("like")}>
            <img src="/love-it.svg" alt="love it" />
          </div>
          <div onClick={() => handleChoice("dislike")}>
            <img src="/not-like.svg" alt="not like" />
          </div>
        </div>
      </div>

      <div className="absolute -bottom-10">
        <img
          src="/survey-robot.svg"
          alt="Astronaut"
          className="mx-auto w-[300px] h-[300px]"
        />
      </div>
    </div>
  );
}
