import React from "react";
import { motion } from "framer-motion";
import InteractiveAstronautLoad from "../components/loadingAst";
import LoadingBar from "../components/loadingComp";
const QuestionFinalLoad = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-[url('/assets/welcome/welcome-bg.svg')] bg-no-repeat bg-center bg-cover" />

      <div className="w-full max-w-[375px] flex mx-auto">
        <div className="fixed inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`plus-${i}`}
              className="absolute text-white text-xs opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              ✦
            </motion.div>
          ))}
        </div>

        <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <motion.h2
            className="font-bold text-3xl text-[#4ED0AA]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Awesome!
          </motion.h2>

          <motion.p
            className="text-[#D9D9D9] p-4 leading-[150%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Thanks for sharing what matters to you. Based on the subjects you
            enjoy, skills you possess, and causes you care about, I’ve found
            some careers you might like. The more you explore, the better my
            recommendations get.
          </motion.p>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <InteractiveAstronautLoad />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-full"
          >
            <LoadingBar />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QuestionFinalLoad;
