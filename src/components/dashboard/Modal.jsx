import { X } from "lucide-react";
import { fetchMicroexperience } from "../../redux/actions/microexperience-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../common/LoadingSpinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function NextLevelModal({ open, onClose, careerLevelId }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { microexperience, loading, saveStepsLoading } = useSelector(
    (state) => state.microexperience
  );
  const NextLevel = microexperience?.[0]?.nextlevels?.[0];
  const careerId = microexperience?.[0]?.career?.[0]?._id;

  useEffect(() => {
    if (careerLevelId) {
      dispatch(fetchMicroexperience({ careerLevelId }));
    }
  }, [dispatch]);

  const nextLevelNumber = NextLevel?.buttonName?.match(/\d+/)?.[0] || "";

  const handleClick = () => {
    if (nextLevelNumber === "3") {
         onClose();
         navigate("/dashboard/explorecareers")
      toast("Level 3 is Coming Soon..", {
                icon: "⌛",
                style: {
                  borderRadius: "8px",
                  background: "#FEF3C7",
                  color: "#92400E",
                  border: "1px solid #F59E0B",
                },
                className: "font-medium",
                duration: 2000,
              });
            
     
    } else {
      navigate(
        `/micro-intro?careerId=${careerId}&levelNumber=${nextLevelNumber}`
      );
    }
  };

  const handleRetryClick = () => {
    navigate(`/micro-intro?careerLevelId=${careerLevelId}`);
  };

  if (!open) return null;

  return loading ? (
    <div className="flex items-center justify-center min-h-[400px] ">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 ">
      <div className="relative bg-white rounded-2xl shadow-lg p-6 w-80 text-center max-w-[315px] mx-auto">
        {/* Close Button */}
        <button
          onClick={() => {
    onClose();
    navigate("/dashboard/explorecareers"); 
  }}
          className="absolute top-3 right-5 text-[#A187FF] opacity-80 py-3"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-[#4C3AE3] font-bold text-[20px] mb-2 mt-6">
          {NextLevel?.title}
        </h2>

        {/* Subtitle */}
        <p className="text-[#042119]  font-bold text-[20px]">
          {NextLevel?.description}
        </p>
        {nextLevelNumber === "3" ? (
          <p className="text-[#042119] my-3">
            Send a request to unlock Level 3.
          </p>
        ) : (
          ""
        )}

        <div className="flex items-center justify-between gap-2 ">
          <button
            onClick={handleRetryClick}
            className="w-full py-3 text-[#0F8864] border border-[#0F8864]  font-semibold rounded-lg  "
          >
            Retry Level
          </button>

          <button
            onClick={handleClick}
            className="w-full py-3 bg-[#0F8864] text-white font-semibold rounded-lg hover:bg-[#1e896a] transition"
          >
            {NextLevel?.buttonName}
          </button>
        </div>
      </div>
    </div>
  );
}
