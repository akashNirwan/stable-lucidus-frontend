import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Button from "../components/common/Button";
import TwoLineOption from "../components/common/TwoLineOption";
import {
  fetchSubjects,
  updateSubjects,
  fetchStudentData,
} from "../redux/actions/student-onboarding-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getSelectedIds, getPreSelectedItems } from "../utils/getSelectedIds";
import StatusTitle from "../components/common/SubTitle";
const Subject = ({ setStep, stepsData }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    subjects,
    loading,
    SubjectsLoading,
    StudentData,
    StudentDataLoading,
  } = useSelector((state) => state.student);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isInitialSelectionDone, setIsInitialSelectionDone] = useState(false);
  const gradeId = searchParams.get("gradeId");

  useEffect(() => {
    const fetchData = async () => {
      if (gradeId) {
        await Promise.all([
          dispatch(fetchSubjects(gradeId)),
          dispatch(fetchStudentData()),
        ]);
        setIsDataLoaded(true);
      }
    };

    fetchData();
  }, [dispatch, gradeId]);

  useEffect(() => {
    if (isDataLoaded && subjects && StudentData && !isInitialSelectionDone) {
      const { selectedSubjectIds } = getSelectedIds(StudentData);
      const preSelectedSubjects = getPreSelectedItems(
        subjects,
        selectedSubjectIds
      );

      if (preSelectedSubjects.length > 0) {
        setSelectedSubjects(preSelectedSubjects);
      }
      setIsInitialSelectionDone(true);
    }
  }, [isDataLoaded, subjects, StudentData, isInitialSelectionDone]);

  // const handleSelect = (subject) => {
  //   setSelectedSubjects((prev) =>
  //     prev.some((s) => s._id === subject._id)
  //       ? prev.filter((s) => s._id !== subject._id)
  //       : [...prev, subject]
  //   );
  // };

  const handleSelect = (subject) => {
    setSelectedSubjects((prev) => {
      const isAlreadySelected = prev.some((s) => s._id === subject._id);

      if (isAlreadySelected) {
        return prev.filter((s) => s._id !== subject._id);
      } else if (prev.length < 5) {
        return [...prev, subject];
      } else {
        return prev;
      }
    });
  };

  const handleNext = () => {
    if (selectedSubjects.length === 0) return;

    const payload = {
      subjectId: selectedSubjects.map((s) => s._id),
    };

    dispatch(updateSubjects(payload)).then((res) => {
      if (res.payload && res.payload.code === 201) {
        navigate(`/questions/skills?gradeId=${gradeId}`);
      }
    });
  };

  const handleBack = () => {
    navigate(`/questions/figure-out?gradeId=${gradeId}`);
  };

  return loading && !isDataLoaded && StudentDataLoading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="text-center flex flex-col gap-3  h-[72vh]">
      <h2 className="font-bold text-[20px] w-full">
        Pick the <span className="text-[#5f35f1]">subjects</span> that excite
        you{" "}
      </h2>

      <h3 className="text-[#066146] text-sm line-clamp-1">
        {/* {stepsData.subtitle} */}
        You don’t have to be great at it. Select up to five
      </h3>

      <StatusTitle text={"I enjoy:"} />
      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        {Array.isArray(subjects) &&
          subjects.map((subject) => (
            <TwoLineOption
              key={subject._id}
              option={subject.subject}
              optionSub={subject.description}
              img={subject.icon === "tests.com" ? null : subject.icon}
              selected={selectedSubjects.some((s) => s._id === subject._id)}
              onSelect={() => handleSelect(subject)}
            />
          ))}
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
          isActive={selectedSubjects.length > 0}
          onClick={handleNext}
          disabled={SubjectsLoading || loading}
        >
          {SubjectsLoading ? <LoadingSpinner size="20px" /> : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Subject;
