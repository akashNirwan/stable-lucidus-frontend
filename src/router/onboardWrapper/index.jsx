import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
export default function OnBoardWrapper() {
  const steps = [
    "grade",
    "figure-out",
    "subject",
    "skills",
    "skills-care",
    "ambition",
  ];
  const location = useLocation();
  const currentStepName = location.pathname.split("/").pop();
  const currentStepIndex = steps.indexOf(currentStepName);
  return (
    <div className="h-[100dvh] relative overflow-hidden">
      <div className="bg-[url(/on-boarding.svg)] h-full w-full bg-cover bg-center">
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

        <div className="relative z-10 flex flex-col items-center justify-start h-screen px-4 pt-12">
          <img src="/onBoard-rob2.png" alt="Astronaut" />
        </div>

        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-[375px] px-4">
          <div className="flex items-center justify-center gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${
                  i <= currentStepIndex ? "bg-white" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* <div className="absolute top-[50px] left-1/2 -translate-x-1/2 z-10">
          <img
            src="/assets/grade/grade-emoji.svg"
            alt="Grade Emoji"
            width={250}
            height={240}
          />
        </div> */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[425px] flex flex-col gap-5 p-6 h-[62vh] z-20 "
          style={{
            borderRadius: "24px 24px 0 0",
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.80) -5.54%, #FFF 50%)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
