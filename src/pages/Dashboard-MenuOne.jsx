import { useState, useEffect } from "react";
import NextLevelModal from "../components/dashboard/Modal";
import DashBoardMicro from "./DashBoardMicro";
import SavedCareer from "./SavedCareer";
import { useNavigate, useLocation } from "react-router-dom";
const DashBoardMenuOne = () => {
  // const [open, s/etOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("micro");

  useEffect(() => {
    if (location.pathname === "/dashboard/savedcareers") {
      setActiveTab("saved");
    } else {
      setActiveTab("micro");
    }
  }, [location.pathname]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "micro") {
      navigate("/dashboard/microexperience");
    } else if (tab === "saved") {
      navigate("/dashboard/savedcareers");
    }
  };

  return (
    <div>
      <div className="flex justify-between bg-[#120C2A] p-4 w-[375px] mx-auto">
        <button
          // onClick={() => setActiveTab("micro")}
          onClick={() => handleTabClick("micro")}
          className={`relative text-lg font-medium transition-colors cursor-pointer ${
            activeTab === "micro" ? "text-teal-400" : "text-purple-300"
          }`}
        >
          Micro-experiences
          {activeTab === "micro" && (
            <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-teal-400 rounded"></span>
          )}
        </button>

        <button
          // onClick={() => setActiveTab("saved")}
          onClick={() => handleTabClick("saved")}
          className={`relative text-lg font-medium transition-colors cursor-pointer ${
            activeTab === "saved" ? "text-teal-400" : "text-purple-300"
          }`}
        >
          Saved Careers
          {activeTab === "saved" && (
            <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-teal-400 rounded"></span>
          )}
        </button>
      </div>

      {activeTab === "micro" ? <DashBoardMicro /> : <SavedCareer />}
      {/* <NextLevelModal open={open} onClose={() => setOpen(false)} /> */}
    </div>
  );
};

export default DashBoardMenuOne;
