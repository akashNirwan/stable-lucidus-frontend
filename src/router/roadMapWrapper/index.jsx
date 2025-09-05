import React from "react";
import Header from "../../components/dashboard/Header";
import Footer from "../../components/dashboard/Footer";
import { Outlet } from "react-router-dom";
import RoadMapFooter from "../../components/roadmap/RoadMapFooter";
const RoadMapWrapper = () => {
  return (
    <div className="flex flex-col h-screen bg-[#130934]">
      <Header />
      <main className="flex-grow overflow-y-auto bg-[#130934]">
        <Outlet />
      </main>
      <RoadMapFooter />
    </div>
  );
};

export default RoadMapWrapper;
