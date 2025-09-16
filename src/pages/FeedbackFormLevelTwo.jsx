import React from "react";
import Button from "../components/common/Button";
import { fetchMicroexperience } from "../redux/actions/microexperience-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { saveSteps } from "../redux/actions/microexperience-action";

const FeedBackFormLevelTwo = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { microexperience, loading, saveStepsLoading } = useSelector(
    (state) => state.microexperience
  );

  const navigate = useNavigate();
  const questionId = searchParams.get("questionLeveltwoId");
  const careerLevelId = searchParams.get("careerLevelId");
  const levelNumber = searchParams.get("levelNumber");
  console.log(careerLevelId, "careerLevelId in feedback form ");
  console.log(questionId, "questionid");
  console.log(microexperience?.[0]?.questions, "microexperience");
  console.log(microexperience?.[0]?.completedCareerLevelCount, "count");
  const completedCareerLevelCount =
    microexperience?.[0]?.completedCareerLevelCount;

  useEffect(() => {
    if (careerLevelId) {
      dispatch(fetchMicroexperience({ careerLevelId }));
    }
  }, [dispatch, searchParams]);

  const selectedQuestion = useMemo(() => {
    return microexperience?.[0]?.recommendations?.find(
      (q) => q._id === questionId
    );
  }, [microexperience, questionId]);

  const handleClick = () => {
    const payload = {
      careerLevelId: careerLevelId,
      route: `/feedbackform-level-two?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}`,
      levelPercent: "30",
    };

    dispatch(saveSteps(payload)).then((res) => {
      if (
        res.payload &&
        (res.payload.code === 200 || res.payload.code === 201)
      ) {
        navigate(
          `/student-choice?questionId=${questionId}&careerLevelId=${careerLevelId}&levelNumber=${levelNumber}`
        );
      }
    });
  };

  // const    handleClick = ()=>{

  //   navigate(`/badge-earned?careerLevelId=${careerLevelId}&questionId=${questionId}`)
  // }

  return loading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="">
      <h2 className="text-center font-bold text-xl">
        {selectedQuestion?.heading}
      </h2>
      <div className="text-center space-y-4 border border-[#4ED0AA] rounded-2xl p-4 mt-4 bg-[#e0ffef]">
        <div className="text-[12px] text-[#034230] px-2 py-1 font-semibold  rounded-2xl w-fit mx-auto bg-[#4ED0AA]">
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
          <LoadingSpinner size={20}> </LoadingSpinner>
        ) : (
          "Continue"
        )}
      </Button>
    </div>
  );
};

export default FeedBackFormLevelTwo;
