import React,{useEffect} from "react";
import { ArrowLeft } from "lucide-react";
import RoadmapData from "../components/common/ProgressBar";
import { fetchRoadmap } from "../redux/actions/encyclopedia-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const RoadMap = () => {
const [searchParams] = useSearchParams()
const navigate = useNavigate()
 const dispatch = useDispatch();
  const { roadmap, roadmapLoading, error } = useSelector((state) => state.encyclopedia);

  const career = roadmap?.[0]?.career?.[0]?.career
  console.log(career, "career");
    const careerId = searchParams.get("careerId")
    useEffect(() => {

    if (careerId) {
      dispatch(fetchRoadmap(careerId));
    }
  }, [dispatch, searchParams]);


  const handleArrow = ()=>{
    navigate(`/encyclopedia/purpose?careerId=${careerId}`)
  }
  return roadmapLoading ?(

     <div className="flex items-center justify-center min-h-[400px]">
           <LoadingSpinner size={64} />
         </div>
   
  ) : (

      <div className="text-white">
      <div className="bg-[#0f0630] min-h-screen text-white p-4">
        <div className="flex items-center gap-2 mb-6">
          <button onClick={handleArrow} >
             <ArrowLeft className="w-5 h-5" />
          </button>
         
          <h1 className="text-lg font-semibold">
            {career}
          </h1>
        </div>

        <div className="bg-[#261172] rounded-2xl px-4 flex items-center gap-4 w-fit">
          <div className="w-[100px] h-[80px]">
            <img
              src="/road-map-robot.svg"
              alt="astronaut"
              className="w-full h-full "
            />
          </div>

          <p className="text-base font-medium max-w-xs">
            Kickstart your career exploration in Grade 9!
          </p>
        </div>
         <RoadmapData roadmapData={roadmap} />
      </div>
    </div>

  )
};

export default RoadMap;
