import React, { useState, useEffect } from "react";

import { ChevronDown } from "lucide-react";
import Dropdown from "../components/common/DropDown";
import Button from "../components/common/Button";
import { fetchSchools , updateSchool} from "../redux/actions/student-onboarding-action";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";


const School = ({ setStep, stepsData }) => {

  const dispatch = useDispatch();
  const { schools, loading, error } = useSelector((state) => state.student);
  console.log("schools", schools);
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState("");
  const navigate = useNavigate()

    useEffect(() => {
    dispatch(fetchSchools());
  }, [dispatch]);

const handleNext = () => {
  if (!selectedSchool) return;

  dispatch(
    updateSchool({
      schoolId: [selectedSchool._id],
    })
  ).then((response) => {
     console.log(response, "response");
     
    if (response.payload && response.payload.code === 201) {
      navigate("/questions/grade")
    }
  });
};

 

  return loading ?  (
    
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
    ) : (
      <div className="text-center flex flex-col gap-3 ">
      <h2 className="font-bold text-[20px]">{stepsData.title}</h2>
      <h3 className="text-gray-600">{stepsData.subtitle}</h3>
      <h4 className="text-[#24A57F] font-medium">I am in:</h4>

      <div className="h-[320px] overflow-y-auto">
  <Dropdown
  label="Select Your School"
  options={
    Array.isArray(schools)
      ? schools.map((s) => ({
          label: s.school, 
          value: s._id,    
        }))
      : []
  }
  onSelect={(value) => {
    const selected = schools.find((s) => s._id === value);
    setSelectedSchool(selected);
  }}
/>
      </div>

      <Button
        type="submit"
        isActive={!!selectedSchool}
        onClick={handleNext}
        disabled = {loading}
      >
        Next
      </Button>
    </div>
    )
};

export default School;
