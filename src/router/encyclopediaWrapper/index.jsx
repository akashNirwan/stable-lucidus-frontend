import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const EncycloPediaWrapper = () => {
  const [activeTab, setActiveTab] = useState("Purpose");

  const tabs = ["Purpose", "Process", "Path", "Prediction"];

  return (
    <div className="bg-[#130934] w-full min-h-screen flex flex-col relative">
      {/* Header Logo */}
      <div className="p-4 ">
        <div className="w-[20px] h-[24px]">
          <img src="/assets/header_logo.svg" alt="logo" className="size-full" />
        </div>
      </div>

      <div className="flex gap-2 items-center justify-start p-4 max-w-[600px] mx-auto ">
        <div className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </div>
        <div className="text-white font-semibold text-xl">
          Chief Financial Officer (CFO)
        </div>
      </div>

      <div className="flex gap-6 text-white w-full overflow-x-auto p-4 max-w-[600px] mx-auto md:justify-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === tab
                ? "bg-[#24A57F] text-white font-semibold"
                : "bg-transparent text-gray-300 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 max-w-[600px] mx-auto w-full flex justify-center ">
        <Outlet context={{ activeTab, setActiveTab }} />
      </div>

      <div className="flex justify-center gap-4 bg-white p-6 rounded-t-2xl shadow-md w-full max-w-[600px] mx-auto">
        <button className="px-6 py-3 border border-green-600 text-green-600 font-semibold rounded-xl shadow-sm hover:bg-green-50 transition">
          Roadmap
        </button>

        <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition">
          Experience It
        </button>
      </div>
    </div>
  );
};

export default EncycloPediaWrapper;
