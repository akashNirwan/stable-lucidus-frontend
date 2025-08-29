import React, { useState, useEffect } from "react";
import Button from "../components/common/Button";
import TwoLineOption from "../components/common/TwoLineOption";
import {
  fetchSkills,
  updateSkills,
} from "../redux/actions/student-onboarding-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";
const Skills = ({ setStep, stepsData }) => {
  const dispatch = useDispatch();
  const { skills, loading, skillsLoading } = useSelector(
    (state) => state.student
  );
  const [selectedSkills, setSelectedSkills] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const handleSelect = (skill) => {
    const skillId = skill._id; // Use _id as unique identifier

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

  return loading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="text-center flex flex-col gap-3">
      <h2 className="font-bold text-[20px]">{stepsData.title}</h2>
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
              img={"/assets/lvl-1.svg"}
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
