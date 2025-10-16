import React, { useState, useEffect } from "react";
import {
  Outlet,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";

const EncycloPediaWrapper = () => {
  const { predictionandPurpose, loading } = useSelector(
    (state) => state.encyclopedia
  );

  const careername = predictionandPurpose?.[0]?.career?.[0]?.career;

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const careerId = searchParams.get("careerId");

  const getActiveTabFromRoute = () => {
    const path = location.pathname;
    if (path.includes("/purpose")) return "Purpose";
    if (path.includes("/prowess")) return "Prowess";
    if (path.includes("/path")) return "Path";
    if (path.includes("/prediction")) return "Prediction";
    return "Purpose";
  };
  const [activeTab, setActiveTab] = useState(getActiveTabFromRoute());

  // const [activeTab, setActiveTab] = useState("Purpose");
  useEffect(() => {
    setActiveTab(getActiveTabFromRoute());
  }, [location.pathname]);

  const tabs = ["Purpose", "Prowess", "Path", "Prediction"];
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const route = `/encyclopedia/${tab.toLowerCase()}${location.search}`; // preserve query params
    navigate(route);
  };

  const handleRoadmap = () => {
    navigate(`/roadmap?careerId=${careerId}`);
  };
  const handleExperience = () => {
    navigate(`/micro-intro?careerId=${careerId}`);
  };
  const handleNaviagte = () => {
    navigate(`/dashboard`);
  };

  return (
    <div className="bg-[#130934] w-full min-h-screen flex flex-col relative">
      {/* Header Logo */}
      <div className="p-4 ">
        <div className="w-[20px] h-[24px]">
          <img src="/assets/header_logo.svg" alt="logo" className="size-full" />
        </div>
      </div>

      <div className="flex gap-2 items-center justify-start p-4 max-w-[600px] mx-0 md:mx-auto">
        <div className="text-white">
          <button onClick={handleNaviagte}>
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
          </button>
        </div>
        <div className="text-white font-semibold text-xl">{careername}</div>
      </div>

      <div className="flex gap-6 text-white w-full text-lg overflow-x-auto p-4 max-w-[600px] mx-auto md:justify-center">
        {tabs.map((tab) => {
          return (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-2 rounded-full transition cursor-pointer ${
                activeTab === tab
                  ? "bg-[#24A57F] text-white font-semibold"
                  : "bg-transparent text-[#C2B1FF] hover:text-white"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-4 max-w-[600px] mx-auto w-full flex justify-center ">
        <Outlet context={{ activeTab, setActiveTab }} />
      </div>

      <div className="flex justify-center gap-4 bg-white p-4 rounded-t-2xl shadow-md w-full max-w-[600px] mx-auto">
        <button
          onClick={handleRoadmap}
          className="px-8 py-3 border cursor-pointer border-[#0F8864] text-[#0F8864] font-semibold rounded-xl shadow-sm hover:bg-green-50 transition"
        >
          Roadmap
        </button>

        <button
          onClick={handleExperience}
          className="px-8 py-3 bg-[#0F8864] cursor-pointer text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition"
        >
          Experience It
        </button>
      </div>
    </div>
  );
};

export default EncycloPediaWrapper;
