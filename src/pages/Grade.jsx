import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Button from "../components/common/Button";
import OptionButton from "../components/common/OptionButton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGrades,
  updateGrades,
  fetchStudentData,
} from "../redux/actions/student-onboarding-action";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { getSelectedIds, getPreSelectedItems } from "../utils/getSelectedIds";

const Grade = ({ setStep, stepsData }) => {
  const dispatch = useDispatch();
  const { grades, loading, gradeLoading, StudentData } = useSelector(
    (state) => state.student
  );
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(fetchGrades()),
        dispatch(fetchStudentData()),
      ]);
      setIsDataLoaded(true);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (isDataLoaded && grades && StudentData && !selectedGrade) {
      const { selectedGradeIds } = getSelectedIds(StudentData);
      const preSelectedGrades = getPreSelectedItems(grades, selectedGradeIds);

      if (preSelectedGrades.length > 0) {
        setSelectedGrade(preSelectedGrades[0]);
      }
    }
  }, [isDataLoaded, grades, StudentData, selectedGrade]);

  // const handleSelect = (grade) => {
  //   setSelectedGrade(grade);
  // };

  const handleSelect = (gradeId) => {
    const selected = grades.find((grade) => grade._id === gradeId);
    setSelectedGrade(selected);
  };

  const handleNext = () => {
    if (!selectedGrade) return;

    dispatch(
      updateGrades({
        gradeId: [selectedGrade._id],
      })
    ).then((res) => {
      if (res.payload && res.payload.code === 201) {
        navigate(`/questions/figure-out?gradeId=${selectedGrade._id}`);
      }
    });
  };

  return loading && !isDataLoaded ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="text-center flex flex-col gap-3 ">
      <h2 className="font-bold text-[20px]">
        What <span className="text-[#5f35f1]">grade</span> are you in?
      </h2>
      {/* <h3 className="text-gray-600">{stepsData.subtitle}</h3> */}
      <h3 className="text-[#066146]">
        Select any <span className="font-bold">one.</span>{" "}
      </h3>
      <h4 className="text-[#24A57F] font-bold">I am in:</h4>

      <div className=" h-[37vh] overflow-y-auto flex flex-col gap-2">
        {Array.isArray(grades) &&
          grades.map((grade) => (
            <OptionButton
              key={grade._id}
              option={`${grade.grade}th Grade`}
              selected={selectedGrade?._id}
              onSelect={handleSelect}
              optionId={grade._id}
            />
          ))}
      </div>

      <Button
        type="button"
        isActive={!!selectedGrade}
        onClick={handleNext}
        disabled={loading || gradeLoading}
      >
        {gradeLoading ? <LoadingSpinner size="20px" /> : "Next"}
      </Button>
    </div>
  );
};

export default Grade;
