import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Button from "../components/common/Button";
import TwoLineOption from "../components/common/TwoLineOption";
import {
  fetchSkills,
  updateSkills,
  fetchStudentData,
} from "../redux/actions/student-onboarding-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { getSelectedIds } from "../utils/getSelectedIds";
import { useSearchParams } from "react-router-dom";
import StatusTitle from "../components/common/SubTitle";
const Skills = ({ setStep, stepsData }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { skills, loading, skillsLoading, StudentData } = useSelector(
    (state) => state.student
  );

  const gradeId = searchParams.get("gradeId");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isInitialSelectionDone, setIsInitialSelectionDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(fetchSkills()),
        dispatch(fetchStudentData()),
      ]);
      setIsDataLoaded(true);
    };

    fetchData();
  }, [dispatch]);

  // Auto-select based on fetched student data
  useEffect(() => {
    if (isDataLoaded && skills && StudentData && !isInitialSelectionDone) {
      const { selectedSkillIds } = getSelectedIds(StudentData);

      if (selectedSkillIds.length > 0) {
        // Filter valid skill IDs that exist in current skills array
        const validSkillIds = selectedSkillIds.filter((skillId) =>
          skills.some((skill) => skill._id === skillId)
        );
        setSelectedSkills(validSkillIds);
      }
      setIsInitialSelectionDone(true);
    }
  }, [isDataLoaded, skills, StudentData, isInitialSelectionDone]);

  const handleSelect = (skill) => {
    const skillId = skill._id;

    setSelectedSkills((prev) => {
      if (prev.includes(skillId)) {
        return prev.filter((id) => id !== skillId);
      } else {
        return [...prev, skillId];
      }
    });
  };

  const handleNext = () => {
    if (selectedSkills.length === 0) return;

    dispatch(
      updateSkills({
        skillId: selectedSkills,
      })
    ).then((res) => {
      if (res.payload && res.payload.code === 201) {
        navigate(`/questions/skills-care?gradeId=${gradeId}`);
      }
    });
  };

  const handleBack = () => {
    navigate(`/questions/subject?gradeId=${gradeId}`);
  };

  return loading && !isDataLoaded ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="text-center flex flex-col gap-3  h-[72vh]">
      <div>
        {/* <h2 className="font-bold text-[20px]">{stepsData.title}</h2> */}
        <h2 className="font-bold text-[20px]">
          What are your top super{" "}
          <span className="text-[#5f35f1]">skills?</span>
        </h2>
      </div>

      <h3 className="text-[#066146]  line-clamp-1 text-sm">
        {/* {stepsData.subtitle} */}
        Select any that apply.
      </h3>
      <StatusTitle text={"I am good at:"} />

      <div className="h-[32vh] lg:h-[40vh] overflow-y-auto flex flex-col gap-2.5">
        {Array.isArray(skills) &&
          skills.map((skill) => (
            <TwoLineOption
              key={skill._id}
              option={skill.skill}
              optionSub={skill.description}
              selected={selectedSkills.includes(skill._id)}
              onSelect={() => handleSelect(skill)}
              img={skill?.icon === "tests.com" ? null : skill?.icon}
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
          isActive={selectedSkills.length > 0}
          onClick={handleNext}
          disabled={skillsLoading}
        >
          {skillsLoading ? (
            <LoadingSpinner size="20px" color="green" />
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Skills;
