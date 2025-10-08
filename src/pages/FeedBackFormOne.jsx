import React, { useState } from "react";
import Button from "../components/common/Button";
import { fetchMicroexperience } from "../redux/actions/microexperience-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { saveSteps } from "../redux/actions/microexperience-action";
import { motion } from "framer-motion";
const FeedBackFormOne = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // delay between children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { microexperience, loading, saveStepsLoading } = useSelector(
    (state) => state.microexperience
  );

  const navigate = useNavigate();
  const questionId = searchParams.get("questionId");
  const careerLevelId = searchParams.get("careerLevelId");
  const levelNumber = searchParams.get("levelNumber");

  const userBadgeCount = microexperience?.[0]?.userBadgeCount;

  const completedCareerLevelCount =
    microexperience?.[0]?.completedCareerLevelCount;

  const levelPercent =
    levelNumber === "1" ? "5" : levelNumber === "2" ? "30" : "0";
  useEffect(() => {
    if (careerLevelId) {
      dispatch(fetchMicroexperience({ careerLevelId }));
    }
  }, [dispatch, searchParams]);

  const selectedQuestion = useMemo(() => {
    return microexperience?.[0]?.questions?.find((q) => q._id === questionId);
  }, [microexperience, questionId]);

  const handleClick = () => {
    const payload = {
      careerLevelId: careerLevelId,
      route: `/feedbackform?careerLevelId=${careerLevelId}&questionId=${questionId}&completedCareerLevelCount=${userBadgeCount}&levelNumber=${levelNumber}`,
      levelPercent: levelPercent,
    };

    dispatch(saveSteps(payload)).then((res) => {
      if (
        res.payload &&
        (res.payload.code === 200 || res.payload.code === 201)
      ) {
        // Updated navigation logic based on your requirements
        if (levelNumber === "2" && userBadgeCount === 0) {
          // If levelNumber is 2 and userBadgeCount is 0, go to badge-earned
          navigate(
            `/badge-earned?careerLevelId=${careerLevelId}&questionId=${questionId}&completedCareerLevelCount=${userBadgeCount}&levelNumber=${levelNumber}`
          );
        } else if (levelNumber === "2") {
          // If levelNumber is 2 and userBadgeCount is anything else, go to micro-intro-level-two
          navigate(
            `/micro-intro-level-two?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}&questionId=${questionId}`
          );
        } else {
          // Default case - go to student-choice
          navigate(
            `/student-choice?questionId=${questionId}&careerLevelId=${careerLevelId}&levelNumber=${levelNumber}`
          );
        }
      }
    });
  };
  const [showFood, setShowFood] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  // ⏳ Delay appearance of Food For Thought by 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowFood(true), 4000);
    return () => clearTimeout(timer);
  }, []);
  return loading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="">
      {/* 1️⃣ Title */}
      <motion.h2
        className="text-center font-bold text-xl"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        {selectedQuestion?.heading}
      </motion.h2>

      {/* 2️⃣ Decision Outcome */}
      <motion.div
        className="text-center space-y-4 border border-[#4ED0AA] rounded-2xl p-4 mt-4 bg-[#e0ffef]"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="text-[12px] text-[#034230] px-2 py-1 font-semibold rounded-2xl w-fit mx-auto bg-[#4ED0AA]">
          {levelNumber === "2" ? "YOUR RESEARCH" : "DECISION OUTCOME"}
        </div>
        <div
          className="text-[14px]"
          dangerouslySetInnerHTML={{
            __html: selectedQuestion?.decisionOutCome || "",
          }}
        />
      </motion.div>

      {/* 3️⃣ Food For Thought — delayed */}
      {showFood && (
        <motion.div
          className="text-center space-y-4 border border-[#5E35F1] rounded-2xl p-4 mt-4 bg-[#EFEAFF]"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
        >
          <div className="text-[12px] text-[#034230] px-2 py-1 font-semibold rounded-2xl w-fit mx-auto bg-[#C2B1FF]">
            FOOD FOR THOUGHT
          </div>
          <div
            className="text-[14px]"
            dangerouslySetInnerHTML={{
              __html: selectedQuestion?.foodForThought || "",
            }}
          />
        </motion.div>
      )}

      {/* 4️⃣ CTA Button — shown only after Food For Thought */}
      {showFood && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button
            onClick={handleClick}
            disabled={saveStepsLoading}
            className="my-2"
          >
            {saveStepsLoading ? (
              <LoadingSpinner size={20} color="green" />
            ) : (
              levelNumber === "2" ? "Next" : "Complete Experience"
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default FeedBackFormOne;
