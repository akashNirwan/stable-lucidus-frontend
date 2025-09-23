import PathCrousel from "../components/encylopedia/PathCrousel";
import CareerCard from "../components/dashboard/microExperienceCard";
import RelatedCareerCard from "../components/dashboard/RelatedCareerCard";
import { ArrowRight, Lock } from "lucide-react";
import { fetchRecommendedCareer } from "../redux/actions/encyclopedia-action";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const Path = () => {

  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const { loading, recommendedCareer } = useSelector((state) => state.encyclopedia);

  console.log(recommendedCareer, "recommended career ");
  
  const steps = [
    {
      title: "Where Do They Work?",
      status: "locked",
    },
  ];


   useEffect(() => {
      const careerId = searchParams.get("careerId");
      if (careerId) {
        dispatch(fetchRecommendedCareer(careerId));
      }
    }, [dispatch, searchParams]);




 
  return  loading ? (

     <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size={64} />
        </div>
    
  ) : (

<div className="text-white grid gap-2">
      <PathCrousel />
      <h2>Lesson</h2>

      <div className=" overflow-hidden overflow-y-auto grid mt-2 gap-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex items-center justify-between w-full max-w-[600px] rounded-lg gap-4"
          >
            <div className="flex items-center gap-3 bg-[#2a1760] rounded-full  px-4 py-3 w-full">
              {step.status === "active" ? (
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="h-6 w-6 rounded-full border-1 border-white"></div>
                    <div className="h-[26px] w-[26px] rounded-full border-4 border-green-400 border-l-transparent absolute -top-px left-0 "></div>
                  </div>
                </div>
              ) : (
                <div className="h-6 w-6 rounded-full bg-purple-600"></div>
              )}
              <span className="text-white font-medium ">{step.title}</span>
            </div>

            {step.status === "active" ? (
              <div
                className="h-8 w-8 flex items-center justify-center rounded-full shrink-0 bg-[#0F8864] text-white"
                onClick={() =>
                  navigate(`/encylopedia-todo?LessonId=${step.lessonId}`)
                }
              >
                <ArrowRight size={18} />
              </div>
            ) : (
              <div className="h-8 w-8 flex items-center justify-center rounded-full shrink-0 bg-purple-800 text-white">
                <Lock size={18} />
              </div>
            )}
          </div>
        ))}
      </div>
      <h2>Related Career Path</h2>
      <div className="flex gap-2 overflow-x-auto w-full max-w-[355px]">
        {recommendedCareer?.map((career) => (
          <div key={career._id} className="shrink-0">
            <RelatedCareerCard 
              career={career.career} 
              image={career.image}
            />
          </div>
        ))}
      </div>
    </div>

  )
};

export default Path;
