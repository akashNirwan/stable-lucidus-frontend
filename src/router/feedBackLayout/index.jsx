import React from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

export default function FeedBackLayout() {
  return (
    <div className="h-screen relative overflow-hidden">
      <div className="bg-[url(/onBoard-bg.jpeg)] h-screen w-full bg-cover bg-center" />

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
        <div className="mb-12">
          <img
            src="/assets/logo.svg"
            alt="Lucidus Logo"
            width={235}
            height={44}
          />
        </div>
        {/* 
        <div>
          <img
            src="/assets/astronaut-login.svg"
            alt="Astronaut"
            width={300}
            height={300}
          />
        </div> */}
      </div>

      <div className="absolute top-[50px] left-1/2 -translate-x-1/2 z-10">
        <img
          src="/onBoard-rob2.png"
          alt="Grade Emoji"
          width={300}
          height={300}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[425px] flex flex-col  gap-5 p-6 h-[600px] z-20"
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
  );
}
