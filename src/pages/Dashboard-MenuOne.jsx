import { useState } from "react";
import NextLevelModal from "../components/dashboard/Modal";
import DashBoardMicro from "./DashBoardMicro";
import SavedCareer from "./SavedCareer";
const DashBoardMenuOne = () => {
  const [open, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("micro");
  return (
    <div>
      <div className="flex justify-between bg-[#120C2A] p-4 w-[375px] mx-auto">
        <button
          onClick={() => setActiveTab("micro")}
          className={`relative text-lg font-medium transition-colors ${
            activeTab === "micro" ? "text-teal-400" : "text-purple-300"
          }`}
        >
          Micro-experiences
          {activeTab === "micro" && (
            <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-teal-400 rounded"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`relative text-lg font-medium transition-colors ${
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
      <NextLevelModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default DashBoardMenuOne;
