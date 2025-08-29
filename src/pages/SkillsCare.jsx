import React, { useState , useEffect} from "react";
import Button from "../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchSdg, updateSdg } from "../redux/actions/student-onboarding-action";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";
const SkillsCare = ({ setStep, stepsData }) => {
const dispatch = useDispatch();
  const { sdgs, loading, SdgsLoading } = useSelector((state) => state.student);
  const [selected, setSelected] = useState([]);
const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchSdg());
  }, [dispatch]);

   const handleSelect = (sdg) => {
    if (selected.some((s) => s._id === sdg._id)) {
      // already selected → remove
      setSelected(selected.filter((item) => item._id !== sdg._id));
    } else {
      // only allow max 3
      if (selected.length < 3) {
        setSelected([...selected, sdg]);
      }
    }
  };



  const handleNext = () => {
    if (selected.length === 0) return;

    const payload = {
      sdgId: selected.map((s) => s._id),
    };

    dispatch(updateSdg(payload)).then((res) => {
      if (res.payload && res.payload.code === 201) {
        navigate("/questions/ambition")
      }
    });
  };
 

  return loading ? (
    <div className="flex items-center justify-center min-h-[400px]">
         <LoadingSpinner size={64} />
       </div>
  ) : (<div className="text-center flex flex-col gap-3">
      <h2 className="font-bold text-[20px]">{stepsData.title}</h2>
      <h3 className="text-gray-600">{stepsData.subtitle}</h3>
      <h4 className="text-[#24A57F] font-medium">I care about:</h4>

      <div className="h-[320px] overflow-y-auto grid grid-cols-3 gap-2">
        {/* {stepsData.options.map((option, ind) => {
          const isSelected = selected.includes(option);
          return (
            <div
              key={ind}
              onClick={() => handleSelect(option)}
              className={`w-[92px] h-[92px] cursor-pointer rounded-lg flex items-center justify-center
                ${isSelected ? "border-[#4823CF] border-2 bg-[#E6F8F3]" : ""}
              `}
            >
              <img
                src={option}
                alt="icons"
                className="object-center object-conver"
              />
            </div>
          );
        })} */}

        {Array.isArray(sdgs) &&
          sdgs.map((sdg) => {
            const isSelected = selected.some((s) => s._id === sdg._id);
            return (
              <div
                key={sdg._id}
                onClick={() => handleSelect(sdg)}
                className={`w-[92px] h-[92px] cursor-pointer rounded-lg flex items-center justify-center
                  ${isSelected ? "border-[#4823CF] border-2 bg-[#E6F8F3]" : ""}
                `}
              >
                <span className="font-medium truncate px-2">{sdg.sdg}</span>
              </div>
            );
          })}
      </div>

     <Button
        type="button"
        isActive={selected.length > 0}
        onClick={handleNext}
        disabled={SdgsLoading || loading}
      >
        {SdgsLoading ? <LoadingSpinner size="20px" /> : "Next"}
      </Button>
    </div> )
};

export default SkillsCare;
