import React from "react";
import InteractiveAstronautLoad from "../components/loadingAst";

const QuestionFinalLoad = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-[url('/assets/welcome/welcome-bg.svg')] bg-no-repeat bg-center bg-cover" />

      {/* Stars */}
      <div className="fixed inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}

        {[...Array(20)].map((_, i) => (
          <div
            key={`plus-${i}`}
            className="absolute text-white text-xs opacity-80 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h2 className="font-bold text-3xl text-[#4ED0AA]">Awesome!</h2>
        <p className="text-[#D9D9D9] p-4 leading-[150%]">
          Thanks for sharing what matters to you. Based on the subjects you
          enjoy, skills you possess, and causes you care about, I’ve found some
          careers you might like. The more you explore, the better my
          recommendations get.
        </p>

        <InteractiveAstronautLoad />
      </div>
    </div>
  );
};

export default QuestionFinalLoad;
