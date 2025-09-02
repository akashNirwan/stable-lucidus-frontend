

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

const Skills = ({ setStep, stepsData }) => {
  const dispatch = useDispatch();
   const [searchParams] = useSearchParams();
  const { skills, loading, skillsLoading, StudentData } = useSelector(
    (state) => state.student
  );
    const gradeId = searchParams.get("gradeId");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
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
    if (isDataLoaded && skills && StudentData && selectedSkills.length === 0) {
      const { selectedSkillIds } = getSelectedIds(StudentData);

      if (selectedSkillIds.length > 0) {
        // Filter valid skill IDs that exist in current skills array
        const validSkillIds = selectedSkillIds.filter((skillId) =>
          skills.some((skill) => skill._id === skillId)
        );
        setSelectedSkills(validSkillIds);
      }
    }
  }, [isDataLoaded, skills, StudentData, selectedSkills.length]);

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
        navigate("/questions/skills-care");
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
    <div className="text-center flex flex-col gap-2">
      {/* Back Button */}
      <div className="flex items-center justify-between  ">
        <div>
          <button
            onClick={handleBack}
            className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <ArrowLeft
                size={20}
                className="text-violet-800 hover:text-violet-900 cursor-pointer"
              />
            </button>
          </button>
        </div>

        <div>
          <h2 className="font-bold text-[20px]">{stepsData.title}</h2>
        </div>
      </div>

      <h3 className="text-gray-600 h-12 line-clamp-2">{stepsData.subtitle}</h3>
      <h4 className="text-[#24A57F] font-medium">I am good at:</h4>

      <div className="max-h-[300px] overflow-y-auto grid gap-2">
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

      <Button
        type="button"
        isActive={selectedSkills.length > 0}
        onClick={handleNext}
        disabled={skillsLoading}
      >
        {skillsLoading ? <LoadingSpinner size="20px" /> : "Next"}
      </Button>
    </div>
  );
};

export default Skills;
