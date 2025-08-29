import React, { useState, useEffect } from "react";
import Button from "../components/common/Button";
import OptionButton from "../components/common/OptionButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrades, updateGrades } from "../redux/actions/student-onboarding-action";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const Grade = ({ setStep, stepsData }) => {
   const dispatch = useDispatch();
  const { grades, loading ,gradeLoading,} = useSelector((state) => state.student);
  const navigate = useNavigate()
const [selectedGrade, setSelectedGrade] = useState(null);
   useEffect(() => {
    dispatch(fetchGrades());
  }, [dispatch]);


  const handleSelect = (grade) => {
    setSelectedGrade(grade)
  };
  const handleNext = () => {
    if (!selectedGrade) return;

    dispatch(
      updateGrades({
        gradeId: [selectedGrade._id], 
      })
    ).then((res) => {
      if (res.payload && res.payload.code === 201) {
        navigate(`/questions/figure-out?gradeId=${selectedGrade._id}`)
      }
    });
  };



  return loading ? (
 <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
   
  ): (

     <div className="text-center flex flex-col gap-3">
      {/* Title & Subtitle */}
      <h2 className="font-bold text-[20px]">{stepsData.title}</h2>
      <h3 className="text-gray-600">{stepsData.subtitle}</h3>
      <h4 className="text-[#24A57F] font-medium">I am in:</h4>

      {/* Options */}
      <div className="h-[320px] overflow-y-auto flex flex-col gap-2">
        {Array.isArray(grades) &&
          grades.map((grade) => (
            <OptionButton
              key={grade._id}
              option={grade.grade} 
              selected={selectedGrade?.grade}
              onSelect={() => handleSelect(grade)}
            />
          ))}
      </div>

      {/* Next Button */}
      <Button
        type="button"
        isActive={!!selectedGrade}
        onClick={handleNext}
        disabled={loading || gradeLoading}
      >
        {gradeLoading ? <LoadingSpinner size="20px" /> : "Next"}
      </Button>
    </div>
  )
};

export default Grade;
