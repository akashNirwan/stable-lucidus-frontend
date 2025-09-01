import React from "react";
import Header from "../components/level/header";
import Question from "../components/level/question";
import LevelCarousel from "../components/level/crousel";
import Button from "../components/common/Button";

const Level = () => {
  return (
    <div className="bg-[#130934] min-h-screen overflow-x-hidden">
      <Header />
      <Question />
      <LevelCarousel />
      {/* <Button /> */}
    </div>
  );
};

export default Level;
