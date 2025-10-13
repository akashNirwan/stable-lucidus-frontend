import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { saveSteps } from "../redux/actions/microexperience-action";
import { fetchMicroexperience } from "../redux/actions/microexperience-action";
import { useSearchParams } from "react-router-dom";

const MicroIntroLevelSecond = () => {
  const [searchParams] = useSearchParams();

  const careerLevelId = searchParams.get("careerLevelId");
  const levelNumber = searchParams.get("levelNumber");
  const questionId = searchParams.get("questionId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { microexperience, loading, saveStepsLoading } = useSelector(
    (state) => state.microexperience
  );

  const Data = microexperience?.[0]?.questionintrostwo?.[0];

  useEffect(() => {
    if (careerLevelId) {
      dispatch(fetchMicroexperience({ careerLevelId }));
    }
  }, [dispatch, careerLevelId]);

  const handleNext = () => {
    const payload = {
      careerLevelId,
      route: `/micro-intro-level-two?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}&questionId=${questionId}`,
      levelPercent: "30",
    };

    dispatch(saveSteps(payload)).then((res) => {
      if (res?.payload?.code === 200 || res?.payload?.code === 201) {
        navigate(
          `/drag-and-drop?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}&questionId=${questionId}`
        );
      }
    });
  };

  return loading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="relative w-full min-h-screen overflow-hidden bg-[url(/assets/badge-bg.svg)] bg-no-repeat bg-center bg-cover">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full md:max-w-[420px] md:mx-auto h-full object-cover z-0"
      >
        <source src={Data?.image} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="fixed bottom-0 left-0 right-0 w-full md:max-w-[420px] md:mx-auto flex flex-col gap-5 p-6 z-20"
        style={{
          borderRadius: "24px 24px 0 0",
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.80) -5.54%, #FFF 50%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="text-center grid gap-4 relative">
          {/* <h3 className="font-bold text-[20px]">{Data?.titleOne}</h3> */}

          <p className="text-center text-white absolute -top-[130px] left-0 w-full p-4 leading-[140%] bg-black/40 backdrop-blur-md rounded-2xl">
            {Data?.titleOne}
          </p>

          <div
            className="text-center "
            dangerouslySetInnerHTML={{ __html: Data?.titleTwo }}
          ></div>

          <Button onClick={handleNext} disabled={saveStepsLoading}>
            {saveStepsLoading ? (
              <LoadingSpinner size={20} color="green" />
            ) : (
              Data?.buttonName
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default MicroIntroLevelSecond;
