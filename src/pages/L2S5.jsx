import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { saveSteps } from "../redux/actions/microexperience-action";

const L2S5 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { saveStepsLoading } = useSelector((state) => state.microexperience);

  // Static content
  const careerLevelId = "1234567890";
  const titleOne = "Choose the right path for your future";
  const titleTwo = "Think wisely and make your decision count.";
  const buttonName = "Continue";

  const handleNext = () => {
    const payload = {
      careerLevelId,
      route: `/micro-intro?careerLevelId=${careerLevelId}`,
      levelPercent: "5",
    };

    dispatch(saveSteps(payload)).then((res) => {
      if (res?.payload?.code === 200 || res?.payload?.code === 201) {
        navigate(`/level?careerLevelId=${careerLevelId}`);
      }
    });
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[url(/assets/badge-bg.svg)] bg-no-repeat bg-center bg-cover">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[360px] flex flex-col gap-5 p-6 z-20"
        style={{
          borderRadius: "24px 24px 0 0",
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.80) -5.54%, #FFF 50%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="text-center grid gap-4 relative">
          <h3 className="font-bold text-[20px]">{titleOne}</h3>

          <p className="text-center text-white absolute -top-[125px] left-0 w-full p-4 leading-[140%] bg-black/40 backdrop-blur-md rounded-2xl">
            "I love your research! Now we need to decide how to start helping
            these 200 families."
          </p>

          <p className="text-center text-[#042119]">{titleTwo}</p>

          <Button onClick={handleNext} disabled={saveStepsLoading}>
            {saveStepsLoading ? <LoadingSpinner size={20} /> : buttonName}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default L2S5;
