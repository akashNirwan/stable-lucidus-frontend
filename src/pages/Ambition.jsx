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
import { useSearchParams } from "react-router-dom";
const Ambition = ({ stepsData }) => {
  const [text, setText] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isInitialSelectionDone, setIsInitialSelectionDone] = useState(false);
  const [searchParams] = useSearchParams();
  const gradeId = searchParams.get("gradeId");
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
    if (isDataLoaded && StudentData && !isInitialSelectionDone) {
      const { ambitions } = getSelectedIds(StudentData);
      if (ambitions) {
        setText(ambitions);
      }
    }
  }, [isDataLoaded, StudentData, isInitialSelectionDone]);

  // const handleChange = (e) => {
  //   setText(e.target.value);
  // };

  const handleNext = () => {
    if (!text.trim()) return;

    const payload = {
      ambitions: text.trim(),
    };

    dispatch(updateAmbition(payload)).then((res) => {
      if (res.payload && res.payload.code === 200) {
        navigate("/loading-careers");
      }
    });
  };

  const handleBack = () => {
    navigate(`/questions/skills-care?gradeId=${gradeId}`);
  };

  return StudentDataLoading && !isDataLoaded ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="text-center flex flex-col gap-3  h-[72vh]">
      {/* Back Button */}
      <div className="flex items-center justify-start ">
        <div className="flex-row space-y-4">
          <h2 className="font-bold text-[20px]">
            What are your <span className="text-[#5E35F1]">ambitions?</span>
          </h2>
          <h3 className="text-[#066146] text-[14px] leading-[120%] mb-4">
            {stepsData.subtitle}
          </h3>
        </div>
      </div>

      <div className="h-[32vh] lg:h-[40vh] overflow-y-auto flex flex-col gap-2">
        <textarea
          placeholder={stepsData.highlight}
          className="placeholder:text-center w-full h-full border bg-[#EFEAFF] border-[#7B56FF] placeholder:text-[#7B56FF] text-[#7B56FF] rounded-md p-3 resize-none focus:placeholder-transparent"
          value={text}
          onChange={(e) => {
    
    let value = e.target.value.slice(0, 500);

    
    value = value.replace(/\s+/g, " ");

   
    value = value.replace(/^\s/, "");

    setText(value);
  }}
  maxLength={500}
        />

        {/* Character count */}
        {/* <div className="text-right text-sm text-gray-500">
          {text.length} characters
        </div> */}
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
          isActive={text.trim().length > 0}
          onClick={handleNext}
          disabled={loading || text.trim().length === 0}
        >
          {loading ? (
            <LoadingSpinner size="20px" color="green" />
          ) : (
            "Show Me Careers"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Ambition;
