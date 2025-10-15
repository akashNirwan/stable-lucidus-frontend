import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveFeedback } from "../redux/actions/microexperience-action";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { saveSteps } from "../redux/actions/microexperience-action";
import { motion } from "framer-motion";
export default function CareerSurvey() {
  const dispatch = useDispatch();
  const { saveFeedbackLoading, saveStepsLoading } = useSelector(
    (state) => state.microexperience
  );

  const [searchParams] = useSearchParams();
  const careerLevelId = searchParams.get("careerLevelId");
  const levelNumber = searchParams.get("levelNumber");

  const [islike, setIsLike] = useState("");
  const navigate = useNavigate();
  const levelPercent =
    levelNumber === "1" ? "20" : levelNumber === "2" ? "50" : "0";
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
      route: `/survey-page?careerLevelId=${careerLevelId}&levelNumber?${levelNumber}&Modal=true`,
      levelPercent: levelPercent,
    };

    setIsLike(choice);

    const saveStepsRes = await dispatch(saveSteps(payload));
    const saveFeedbackRes = await dispatch(
      saveFeedback({
        likeDislike: choice === "like" ? "Like" : "Dislike",
        careerLevelId: careerLevelId,
      })
    );

    const isSaveStepsSuccess =
      saveStepsRes.payload?.code === 200 || saveStepsRes.payload?.code === 201;

    const isSaveFeedbackSuccess =
      saveFeedbackRes.payload?.code === 200 ||
      saveFeedbackRes.payload?.code === 201;

    if (isSaveStepsSuccess && isSaveFeedbackSuccess) {
      navigate(
        `/dashboard/explorecareers?careerLevelId=${careerLevelId}&Modal=true&levelNumber=${levelNumber}`
      );
    }
  };
  return saveFeedbackLoading || saveStepsLoading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="relative h-[100dvh] flex flex-col items-center  text-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/how-feel-bg.svg')] bg-cover bg-center h-screen w-full">
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

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 mt-12">
        <h2 className="text-white text-xl font-semibold leading-snug">
          Did this experience help you <br /> understand this career better?
        </h2>

        <div className="flex flex-col gap-6">
          <div onClick={() => handleChoice("like")}>
            <img src="/survey-yes.svg" alt="love it" />
          </div>
          <div onClick={() => handleChoice("dislike")}>
            <img src="/survey-no.svg" alt="not like" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <motion.img
          src="/Astronaut6.svg"
          alt="Astronaut"
          className="mx-auto"
          animate={{
            y: [0, -20, 0], // float up and down
          }}
          transition={{
            duration: 4, // smooth timing
            repeat: Infinity, // loop forever
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
