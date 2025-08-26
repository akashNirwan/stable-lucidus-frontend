import React, { useState } from "react";

import { ChevronDown } from "lucide-react";
import Dropdown from "../components/common/DropDown";
import Button from "../components/common/Button";
const schools = [
  "Amity International School",
  "International School of Estonia",
  "German European School, Singapore",
  "International School of Zurich",
];

const School = ({ setStep, stepsData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState("");

  const handleSelect = (school) => {
    setSelectedSchool(school);
    setIsOpen(false);
  };

  return (
    <div className="text-center flex flex-col gap-3 ">
      <h2 className="font-bold text-[20px]">{stepsData.title}</h2>
      <h3 className="text-gray-600">{stepsData.subtitle}</h3>
      <h4 className="text-[#24A57F] font-medium">I am in:</h4>

      <div className="h-[320px] overflow-y-auto">
        <Dropdown
          label="Select Your School"
          options={schools}
          onSelect={(value) => setSelectedSchool(value)}
        />
      </div>

      <Button
        type="submit"
        isActive={selectedSchool}
        onClick={() => setStep(2)}
      >
        Next
      </Button>
    </div>
  );
};

export default School;
