import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Button from "../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSdg,
  updateSdg,
  fetchStudentData,
} from "../redux/actions/student-onboarding-action";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { getSelectedIds, getPreSelectedItems } from "../utils/getSelectedIds";

const SkillsCare = ({ setStep, stepsData }) => {
  const dispatch = useDispatch();
  const { sdgs, loading, SdgsLoading, StudentData } = useSelector(
    (state) => state.student
  );
  const [selected, setSelected] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([dispatch(fetchSdg()), dispatch(fetchStudentData())]);
      setIsDataLoaded(true);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (isDataLoaded && sdgs && StudentData && selected.length === 0) {
      const { selectedSdgIds } = getSelectedIds(StudentData);
      const preSelectedSdgs = getPreSelectedItems(sdgs, selectedSdgIds);

      if (preSelectedSdgs.length > 0) {
        setSelected(preSelectedSdgs.slice(0, 3));
      }
    }
  }, [isDataLoaded, sdgs, StudentData, selected.length]);

  const handleSelect = (sdg) => {
    if (selected.some((s) => s._id === sdg._id)) {
      setSelected(selected.filter((item) => item._id !== sdg._id));
    } else {
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
        navigate("/questions/ambition");
      }
    });
  };

  const handleBack = () => {
    navigate("/questions/skills");
  };

  return loading && !isDataLoaded ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="text-center flex flex-col gap-3">
      {/* Back Button */}
      <div className="flex items-center justify-start mb-2">
        <h2 className="font-bold text-[20px]">{stepsData.title}</h2>
      </div>

      <h3 className="text-[#066146]">{stepsData.subtitle}</h3>
      <h4 className="text-[#24A57F] font-medium">I care about:</h4>

      {/* Selection Counter */}
      {/* <p className="text-sm text-gray-500">
        Selected: {selected.length}/3{" "}
        {selected.length === 3 && "(Maximum reached)"}
      </p> */}

      <div className="h-[370px] overflow-y-auto grid grid-cols-3 gap-2">
        {Array.isArray(sdgs) &&
          sdgs.map((sdg, i) => {
            const isSelected = selected.some((s) => s._id === sdg._id);
            const canSelect = selected.length < 3 || isSelected;

            return (
              <div
                key={sdg._id}
                onClick={() => canSelect && handleSelect(sdg)}
                className={`relative w-[92px] h-[92px] rounded-lg cursor-pointer overflow-hidden
            ${!canSelect ? "opacity-50 cursor-not-allowed" : ""}
          `}
              >
                {/* Image */}
                <img
                  src={sdg.image}
                  alt={sdg.sdg}
                  className="w-full h-full object-cover"
                />

                {/* Visible Highlight overlay */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-lg bg-[#4823CF]/40 border-2 border-[#4823CF] shadow-[0_0_10px_rgba(72,35,207,0.7)]" />
                )}

                {/* Label */}
                <span className="font-medium flex items-center truncate gap-2 px-2 absolute top-0 left-0 z-10 text-white rounded">
                  <span className="text-[24px]">{i + 1}</span>
                  <span>{sdg.sdg}</span>
                </span>
              </div>
            );
          })}
      </div>

      <div className="flex gap-3 ">
        <Button
          type="button"
          onClick={handleBack}
          className="bg-white !text-[#0F8864] border !border-[#0F8864] !w-[60%]"
        >
          {"Previous"}
        </Button>

        <Button
          type="button"
          isActive={selected.length > 0}
          onClick={handleNext}
          disabled={SdgsLoading || loading}
        >
          {SdgsLoading ? <LoadingSpinner size="20px" /> : "Show Me Careers"}
        </Button>
      </div>
    </div>
  );
};

export default SkillsCare;
