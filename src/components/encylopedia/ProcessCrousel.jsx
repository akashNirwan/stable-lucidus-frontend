import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Essential Skills",
    tags: [
      "📊 Analytical Thinking",
      "✨ Creative Thinking",
      "🤝 Teamwork",
      "🚩 Leadership",
      "⚖️ Ethical Judgment",
      "🔎 Research & Planning",
      "✅ Focus & Finishing",
    ],
  },
  {
    title: "What To Study",
    tags: [
      "📊 Analytical Thinking",
      "✨ Creative Thinking",
      "🤝 Teamwork",
      "🚩 Leadership",
      "⚖️ Ethical Judgment",
      "🔎 Research & Planning",
      "✅ Focus & Finishing",
    ],
  },
  {
    title: "Salary Snapshot",
    salaries: [
      { level: "Entry Level", salary: "$70,000 to $100,000" },
      { level: "Mid Level", salary: "$120,000 to $180,000" },
      { level: "Senior Level", salary: "$200,000 to $350,000+" },
    ],
  },
];

export default function ProcessCrousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="flex flex-col bg-[#130934] overflow-hidden items-center justify-center">
      <div className="relative w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x < -50 || velocity.x < -500) {
                nextSlide();
              } else if (offset.x > 50 || velocity.x > 500) {
                prevSlide();
              }
            }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#2a1760] text-white p-6 rounded-2xl shadow-lg"
          >
            <h2 className="font-semibold text-lg mb-4">
              {slides[current].title}
            </h2>

            {/* Tags */}
            {slides[current].tags && (
              <div className="flex flex-wrap gap-3">
                {slides[current].tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-purple-300/70 text-black rounded-full text-xs font-medium shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Salaries */}
            {slides[current].salaries && (
              <div>
                <div className="flex flex-col gap-3 mt-4">
                  {slides[current].salaries.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center  text-[14px] w-full px-6 py-4 rounded-xl bg-[#3a2175] shadow-lg"
                    >
                      <span className="font-semibold">{item.level}</span>
                      <span className="font-bold">{item.salary}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4">Note: salary vary by country</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex mt-4 gap-2 justify-center">
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${
              current === i ? "bg-purple-400" : "bg-gray-500"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
