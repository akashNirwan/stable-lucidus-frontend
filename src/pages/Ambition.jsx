import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import {
  updateAmbition,
  fetchStudentData,
} from "../redux/actions/student-onboarding-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { getSelectedIds } from "../utils/getSelectedIds";

const Ambition = ({ stepsData }) => {
  const [text, setText] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const dispatch = useDispatch();
  const { StudentDataLoading, StudentData, loading } = useSelector(
    (state) => state.student
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchStudentData()).then(() => {
      setIsDataLoaded(true);
    });
  }, [dispatch]);

  useEffect(() => {
    if (isDataLoaded && StudentData && !text) {
      const { ambitions } = getSelectedIds(StudentData);
      if (ambitions) {
        setText(ambitions);
      }
    }
  }, [isDataLoaded, StudentData, text]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleNext = () => {
    if (!text.trim()) return;

    const payload = {
      ambitions: text.trim(),
    };

    dispatch(updateAmbition(payload)).then((res) => {
      if (res.payload && res.payload.code === 200) {
        navigate("/question-load");
      }
    });
  };

  const handleBack = () => {
    navigate("/questions/skills-care");
  };

  return StudentDataLoading && !isDataLoaded ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="text-center flex flex-col gap-3">
      {/* Back Button */}
      <div className="flex items-center justify-start ">
        <button
          onClick={handleBack}
          className=" flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft
              size={20}
              className="text-violet-800 hover:text-violet-900 cursor-pointer"
            />
          </button>
        </button>
        <div className="flex-row">
          <h2 className="font-bold text-[20px]">{stepsData.title}</h2>
          <h3 className="text-green-600 text-[14px] leading-[120%]">
            {stepsData.subtitle}
          </h3>
        </div>
      </div>

      <div className="h-[340px] overflow-y-auto flex flex-col gap-2">
        <textarea
          placeholder={stepsData.highlight}
          className="placeholder:text-center w-full h-full border border-[#7B56FF] placeholder:text-[#7B56FF] text-[#7B56FF] rounded-md p-4 resize-none"
          value={text}
          onChange={handleChange}
        />

        {/* Character count */}
        <div className="text-right text-sm text-gray-500">
          {text.length} characters
        </div>
      </div>

      <Button
        type="button"
        isActive={text.trim().length > 0}
        onClick={handleNext}
        disabled={loading || text.trim().length === 0}
      >
        {loading ? <LoadingSpinner size="20px" /> : "Next"}
      </Button>
    </div>
  );
};

export default Ambition;
