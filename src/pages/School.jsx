import React, { useState, useEffect } from "react";

import { ChevronDown } from "lucide-react";
import Dropdown from "../components/common/DropDown";
import Button from "../components/common/Button";
import {
  fetchSchools,
  updateSchool,
  fetchStudentData,
} from "../redux/actions/student-onboarding-action";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { getSelectedIds, getPreSelectedItems } from "../utils/getSelectedIds";

const School = ({ setStep, stepsData }) => {
  const dispatch = useDispatch();
  const { schools, loading, error, SchoolLoading, StudentData } = useSelector(
    (state) => state.student
  );

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(fetchSchools()),
        dispatch(fetchStudentData()),
      ]);
      setIsDataLoaded(true);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (isDataLoaded && schools && StudentData && !selectedSchool) {
      console.log("StudentData:", StudentData); // ye check karo
      const { selectedSchoolIds } = getSelectedIds(StudentData);
      console.log("selectedSchoolIds:", selectedSchoolIds); // ye check karo
      const preSelectedSchools = getPreSelectedItems(
        schools,
        selectedSchoolIds
      );
      console.log("preSelectedSchools:", preSelectedSchools); // ye check karo

      if (preSelectedSchools.length > 0) {
        setSelectedSchool(preSelectedSchools[0]);
      }
    }
  }, [isDataLoaded, schools, StudentData, selectedSchool]);

  const handleNext = () => {
    if (!selectedSchool) return;

    dispatch(
      updateSchool({
        schoolId: [selectedSchool._id],
      })
    ).then((response) => {
      if (response.payload && response.payload.code === 201) {
        navigate("/questions/grade");
      }
    });
  };

  return loading || !isDataLoaded ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="text-center flex flex-col gap-3 h-[55vh]">
      <h2 className="font-bold text-[20px]">
        Which <span className="text-[#5E35F1]">school</span> are you in ?
      </h2>
      <h3 className="text-[#066146] text-sm">
        Select any <span className="font-bold">one.</span>{" "}
      </h3>
      {/* <h4 className="text-[#24A57F] font-bold text-lg">I am in:</h4> */}
      <div className="h-[320px] overflow-y-auto">
        <Dropdown
          label="Select Your School"
          selectedValue={selectedSchool?._id}
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
        disabled={loading || SchoolLoading}
      >
        {SchoolLoading ? (
          <LoadingSpinner size={20} color="green"></LoadingSpinner>
        ) : (
          "Next"
        )}
      </Button>
    </div>
  );
};

export default School;
