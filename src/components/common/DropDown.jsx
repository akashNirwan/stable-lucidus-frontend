import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import OptionButton from "./OptionButton";

const Dropdown = ({ label = "Select Your School", options = [], onSelect, selectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  // close dropdown if clicked outside

  useEffect(() => {
  if (selectedValue) {
    const selectedOption = options.find(option => option.value === selectedValue);
    if (selectedOption) {
      setSelected(selectedOption);
    }
  }
}, [selectedValue, options]);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full border border-[#7B56FF] rounded-xl px-4 py-2 flex justify-center text-[#7B56FF]   relative"
      >
        {selected ? selected.label : label}

        <div className="absolute right-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_388_5082)">
              <path
                d="M8.70999 11.71L11.3 14.3C11.69 14.69 12.32 14.69 12.71 14.3L15.3 11.71C15.93 11.08 15.48 10 14.59 10H9.40999C8.51999 10 8.07999 11.08 8.70999 11.71Z"
                fill="#7B56FF"
              />
            </g>
            <defs>
              <clipPath id="clip0_388_5082">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full flex flex-col gap-2 border border-[#7B56FF]  rounded-xl shadow-md z-10 p-2 bg-[#EFEAFF]">
          {options.map((option, idx) => (
            // <OptionButton
            //   key={idx}
            //   option={option}
            //   selected={selected}
            //   onSelect={handleSelect}
            // />

            <OptionButton
              key={idx}
              option={option.label} // 👈 sirf naam dikhane ke liye
              selected={selected?.label} // 👈 selected school name
              onSelect={() => handleSelect(option)} // 👈 value return karega
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
