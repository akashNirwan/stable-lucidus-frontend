import { X } from "lucide-react";
import { fetchMicroexperience } from "../../redux/actions/microexperience-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../common/LoadingSpinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NextLevelModal({ open, onClose ,careerLevelId}) {
      const navigate = useNavigate();
  
   const dispatch = useDispatch();
       const { microexperience, loading ,saveStepsLoading} = useSelector(
         (state) => state.microexperience
       );
 const NextLevel =  microexperience?.[0]?.nextlevels?.[0]
  const careerId =   microexperience?.[0]?.career?.[0]?._id 
       
 useEffect(() => {
     if (careerLevelId) {
       dispatch(fetchMicroexperience({careerLevelId}));
     }
   }, [dispatch]);

  // console.log(microexperience?.[0]?.career?.[0]?._id,"career id");
  
  

    const nextLevelNumber = NextLevel?.buttonName?.match(/\d+/)?.[0] || "";


   const  handleClick = ()=>{
     navigate(`/micro-intro?careerId=${careerId}&levelNumber=${nextLevelNumber}`)
   }
       
  if (!open) return null;

  return loading ? (
      <div className="flex items-center justify-center min-h-[400px]">
                      <LoadingSpinner size={64} />
                    </div>
  ) : (

      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-[#4C3AE3] font-bold text-lg mb-2">
          {NextLevel?.title}
        </h2>

        {/* Subtitle */}
        <p className="text-gray-800 mb-6">
          {NextLevel?.description}
        </p>

        {/* CTA Button */}
        <button
          onClick={handleClick}
          className="w-full py-3 bg-[#24A57F] text-white font-semibold rounded-lg hover:bg-[#1e896a] transition"
        >
          {NextLevel?.buttonName}
        </button>
      </div>
    </div>
  )
}
