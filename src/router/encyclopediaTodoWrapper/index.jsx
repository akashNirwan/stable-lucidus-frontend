import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function EncylopediaWrapperTodo() {
  // const steps = ["grade", "figure-out", "subject", "skills", "skills-care"];
  const [state, setState] = useState(0);
  const { lesson } = useSelector((state) => state.encyclopedia);

  const getStepsCount = () => {
    if (lesson && lesson.length > 0) {
      return lesson.length;
    }
    return 5; 
  };
  const stepsCount = getStepsCount();
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-[url('/assets/welcome/welcome-bg.svg')] bg-no-repeat bg-center bg-cover z-0" />

      <div className="fixed inset-0 z-10">
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

      <div className="relative z-20">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-[375px] px-4">
          <div className="flex items-center justify-center gap-2">
            
            {[...Array(stepsCount)].map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${
                  i <= state ? "bg-white" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
        <Outlet context={{ state, setState, stepsCount }} />
      </div>
    </div>
  );
}
