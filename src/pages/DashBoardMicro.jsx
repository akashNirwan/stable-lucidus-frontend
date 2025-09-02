import React from "react";
import CareerCard from "../components/dashboard/microExperienceCard";
const DashBoardMicro = () => {
  return (
    <div className="space-y-4  h-[520px] overflow-y-auto">
      <CareerCard />
      <CareerCard />
      <CareerCard />
      <CareerCard />
      <CareerCard />
    </div>
  );
};

export default DashBoardMicro;
