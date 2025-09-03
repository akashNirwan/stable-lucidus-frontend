import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "About",
    text: "A Chief Financial Officer (CFO) is the money boss of a company. They decide how to spend, save, and grow funds. Their choices drive profits, create jobs, and shape how the business impacts people and communities.",
  },
  {
    title: "Role",
    list: [
      "Ensures financial health",
      "Manages budgets effectively",
      "Provides strategies for long-term growth",
      "Aligns money decisions with company goals",
    ],
  },
  {
    title: "Impact",
    text: "By leading financial planning and risk management, CFOs help businesses stay stable, expand into new markets, and create opportunities for innovation and employees.",
  },
];

export default function PurposeCrousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="flex flex-col  bg-[#130934] overflow-hidden">
      {/* Slide */}
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
            <h2 className="font-semibold text-lg mb-3">
              {slides[current].title}
            </h2>

            {/* Render paragraph or list */}
            {slides[current].text && (
              <p className="text-sm leading-relaxed">{slides[current].text}</p>
            )}

            {slides[current].list && (
              <ul className="list-disc pl-5 space-y-2 text-sm">
                {slides[current].list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
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
