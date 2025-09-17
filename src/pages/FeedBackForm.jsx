import React from "react";
import Button from "../components/common/Button";
import FeedBackFormOne from "./FeedBackFormOne";
import FeedBackFormTwo from "./FeedBackFormTwo";
import { useOutletContext } from "react-router-dom";
import { fetchMicroexperience } from "../redux/actions/microexperience-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMemo, useEffect } from "react";


const FeedBackForm = () => {

  const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { microexperience, loading, error, saveBadgeLoading } = useSelector(
      (state) => state.microexperience
    );


     const navigate = useNavigate()
const questionId = searchParams.get("questionId");
const careerLevelId = searchParams.get("careerLevelId");
const levelNumber = searchParams.get("levelNumber");


useEffect(() => {
    if (careerLevelId) {
      dispatch(fetchMicroexperience({careerLevelId}));
    }
  }, [dispatch, searchParams]);

const selectedQuestion = useMemo(() => {
    return microexperience?.[0]?.questions?.find(
      (q) => q._id === questionId
    );
  }, [microexperience, questionId]);

 


  const { currentStepIndex, setCurrentStepIndex } = useOutletContext();
  
  const formObj = {
    // 0: <FeedBackFormOne setCurrentStepIndex={setCurrentStepIndex}  selectedQuestion={selectedQuestion}/>,
    0: <FeedBackFormTwo levelNumber={levelNumber} microexperience={microexperience} careerLevelId={careerLevelId} />,
  };
  return loading ? (
    <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size={64} />
        </div>
  ): (
      <div className="">
      {formObj[currentStepIndex] ? (
        formObj[currentStepIndex]
      ) : (
        <div>Component not found</div>
      )}
    </div>

  )
};

export default FeedBackForm;
