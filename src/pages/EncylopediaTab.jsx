



import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchLesson } from "../redux/actions/encyclopedia-action";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useSearchParams } from "react-router-dom";

const EncylopediaTab = () => {
  const dispatch = useDispatch();
  const [searchparams] = useSearchParams();
  const { lessonLoading, lesson } = useSelector(
    (state) => state.encyclopedia
  );

  const { state, setState } = useOutletContext();

  useEffect(() => {
    const LessonId = searchparams.get("LessonId");
    if (LessonId) {
      dispatch(fetchLesson(LessonId));
    }
  }, [dispatch, searchparams]);

  
  const getCurrentLessonDetail = () => {
    if (lesson && lesson.length > 0) {
     
      const currentIndex = state % lesson.length;
      return lesson[currentIndex];
    }
    return null;
  };

  const currentLesson = getCurrentLessonDetail();
  
  
  const totalSteps = lesson ? lesson.length : 5;

  return (
    <>
      {lessonLoading ? (
        <div className="h-screen flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : !lesson || lesson.length === 0 ? (
        <div className="h-screen flex justify-center items-center cursor-pointer"
             onClick={() => setState((prev) => (prev + 1) % (stepsCount || 5))}>
          <div className="text-white font-semibold text-[32px] text-center">
            No lesson data available
          </div>
        </div>
      ) : (
        <div
          className="h-screen flex justify-center items-center cursor-pointer"
          onClick={() => setState((prev) => (prev + 1) % totalSteps)}
        >
          <div className="text-white font-semibold text-[32px] text-center px-4">
            {currentLesson ? currentLesson.detail : "No data"}
          </div>
        </div>
      )}
    </>
  );
};

export default EncylopediaTab;