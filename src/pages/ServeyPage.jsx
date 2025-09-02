import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function CareerSurvey() {
  const [islike, setIsLike] = useState("");
  const navigate = useNavigate();
  const handleChoice = (choice) => {
    setIsLike(choice);
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#130934] to-[#24A57F] h-screen w-full">
        <div className="fixed inset-0">
          {[...Array(30)].map((_, i) => (
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
          {[...Array(15)].map((_, i) => (
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
      </div>

      <div className="absolute top-6 flex gap-2">
        <div className="w-28 h-2 bg-white rounded-full" />
        <div className="w-28 h-2 bg-white rounded-full" />
        <div className="w-28 h-2 bg-white rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        <h2 className="text-white text-xl font-semibold leading-snug">
          How do you feel about learning <br /> more about this career?
        </h2>

        <div className="flex flex-col gap-6">
          <div onClick={() => handleChoice("like")}>
            <img src="/love-it.svg" alt="love it" />
          </div>
          <div onClick={() => handleChoice("dislike")}>
            <img src="/not-like.svg" alt="not like" />
          </div>
        </div>
      </div>

      <div className="absolute -bottom-10">
        <img
          src="/survey-robot.svg"
          alt="Astronaut"
          className="mx-auto w-[300px] h-[300px]"
        />
      </div>
    </div>
  );
}
