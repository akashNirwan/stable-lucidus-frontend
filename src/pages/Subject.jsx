import React, { useState, useEffect } from "react";
import Button from "../components/common/Button";
import TwoLineOption from "../components/common/TwoLineOption";
import {
  fetchSubjects,
  updateSubjects,
} from "../redux/actions/student-onboarding-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";










const Subject = ({ setStep, stepsData }) => {
   const [searchParams] = useSearchParams();
    const navigate = useNavigate()
  const dispatch = useDispatch();
  const { subjects, loading, SubjectsLoading } = useSelector(
    (state) => state.student
  );
 const [selectedSubjects, setSelectedSubjects] = useState([]);
const gradeId = searchParams.get("gradeId");
 


useEffect(() => {
    if (gradeId) {
      dispatch(fetchSubjects(gradeId));
    }
  }, [dispatch, gradeId]);

   const handleSelect = (subject) => {
    setSelectedSubjects((prev) =>
      prev.some((s) => s._id === subject._id)
        ? prev.filter((s) => s._id !== subject._id) // already selected → remove
        : [...prev, subject] // add new
    );
  };

  const handleNext = () => {
    if (selectedSubjects.length === 0) return;

    const payload = {
      subjectId: selectedSubjects.map((s) => s._id),
    };

    dispatch(updateSubjects(payload)).then((res) => {
      if (res.payload && res.payload.code === 201) {
        navigate("/questions/skills")
      }
    });
  };

  return loading ? (
     <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size={64} />
        </div>
  ) : (
      <div className="text-center flex flex-col gap-3">
      <h2 className="font-bold text-[20px]">{stepsData.title}</h2>
      <h3 className="text-gray-600">{stepsData.subtitle}</h3>
      <h4 className="text-[#24A57F] font-medium">I want to:</h4>

      <div className="max-h-[420px] overflow-y-auto grid gap-2">
         {Array.isArray(subjects) &&
          subjects.map((subject) => (
            <TwoLineOption
              key={subject._id}
              option={subject.subject}
              optionSub={subject.description}
              img={subject.icon}
              selected={selectedSubjects.some((s) => s._id === subject._id)}
              onSelect={() => handleSelect(subject)}
            />
          ))}
      </div>

      <Button
        type="button"
        isActive={selectedSubjects.length > 0}
        onClick={handleNext}
        disabled={SubjectsLoading || loading}
      >
       {SubjectsLoading ? <LoadingSpinner size="20px" /> : "Next"}
             
      </Button>
    </div>
  )
};

export default Subject;
