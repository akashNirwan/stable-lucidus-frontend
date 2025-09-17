import React from "react";
import Button from "../components/common/Button";
import { fetchMicroexperience } from "../redux/actions/microexperience-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { saveSteps } from "../redux/actions/microexperience-action";

const FeedBackFormOne = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { microexperience, loading, saveStepsLoading } = useSelector(
    (state) => state.microexperience
  );
  

  const navigate = useNavigate();
  const questionId = searchParams.get("questionId");
  const careerLevelId = searchParams.get("careerLevelId");
  const levelNumber = searchParams.get("levelNumber");
 
  const userBadgeCount = microexperience?.[0]?.userBadgeCount
 
  
  const completedCareerLevelCount = microexperience?.[0]?.completedCareerLevelCount;
  


    const levelPercent = levelNumber === "1"? "5" : levelNumber === "2" ? "30" : "0";
  useEffect(() => {
    if (careerLevelId) {
      dispatch(fetchMicroexperience({ careerLevelId }));
    }
  }, [dispatch, searchParams]);

  const selectedQuestion = useMemo(() => {
    return microexperience?.[0]?.questions?.find((q) => q._id === questionId);
  }, [microexperience, questionId]);

  // const handleClick = () => {
  //   const payload = {
  //     careerLevelId: careerLevelId,
  //     route: `/feedbackform?careerLevelId=${careerLevelId}&questionId=${questionId}&completedCareerLevelCount=${completedCareerLevelCount}&levelNumber=${levelNumber}`,
  //     levelPercent: levelPercent,
  //   };

  //   dispatch(saveSteps(payload)).then((res) => {
  //     if (
  //       res.payload &&
  //       (res.payload.code === 200 || res.payload.code === 201)
  //     ) {
  //       if (levelNumber === "2") {
  //       // Special route when levelNumber is 2
  //       navigate(`/micro-intro-Level-two?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}&questionId=${questionId}`);
  //     }else if ([0, 2, 4].includes(completedCareerLevelCount)) {
  //         navigate(
  //           `/badge-earned?careerLevelId=${careerLevelId}&questionId=${questionId}&completedCareerLevelCount=${completedCareerLevelCount}&levelNumber=${levelNumber}`
  //         );
  //       } else {
  //         navigate(
  //           `/student-choice?questionId=${questionId}&careerLevelId=${careerLevelId}&levelNumber=${levelNumber}`
  //         );
  //       }
        
  //     }
  //   });
  // };

  // const    handleClick = ()=>{

  //   navigate(`/badge-earned?careerLevelId=${careerLevelId}&questionId=${questionId}`)
  // }

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
          // If levelNumber is 2 and userBadgeCount is anything else, go to micro-intro-Level-two
          navigate(`/micro-intro-Level-two?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}&questionId=${questionId}`);
        } else {
          // Default case - go to student-choice
          navigate(
            `/student-choice?questionId=${questionId}&careerLevelId=${careerLevelId}&levelNumber=${levelNumber}`
          );
        }
      }
    });
  };

  return loading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="">
      <h2 className="text-center font-bold text-xl">A Net That Protects</h2>
      <div className="text-center space-y-4 border border-[#4ED0AA] rounded-2xl p-4 mt-4 bg-[#e0ffef]">
        <div className="text-[12px] text-[#034230] px-2 py-1 font-semibold rounded-2xl w-fit mx-auto bg-[#4ED0AA]">
          DECISION OUTCOME
        </div>
        <div
          className="text-[14px]"
          dangerouslySetInnerHTML={{
            __html: selectedQuestion?.decisionOutCome || "",
          }}
        />
      </div>
      <div className="text-center space-y-4 border border-[#5E35F1] rounded-2xl p-4 mt-4 bg-[#EFEAFF]">
        <div className="text-[12px] text-[#034230] px-2 py-1 font-semibold rounded-2xl w-fit mx-auto bg-[#C2B1FF]">
          FOOD FOR THOUGHT
        </div>
       <div
          className="text-[14px]"
          dangerouslySetInnerHTML={{
            __html: selectedQuestion?.foodForThought || "",
          }}
        />
      </div>
      
      <Button
        onClick={handleClick}
        disabled={saveStepsLoading}
        className="mt-4"
      >
        {saveStepsLoading ? (
          <LoadingSpinner size={20} color="green"> </LoadingSpinner>
        ) : (
          "Next"
        )}
      </Button>
    </div>
  );
};

export default FeedBackFormOne;
