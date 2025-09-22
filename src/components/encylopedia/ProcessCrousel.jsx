import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProcess } from "../../redux/actions/encyclopedia-action";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../common/LoadingSpinner";

export default function ProcessCarousel() {
  const dispatch = useDispatch();
  const [searchparams] = useSearchParams();
  const careerId = searchparams.get("careerId");

  const { process, processLoading } = useSelector(
    (state) => state.encyclopedia
  );

  useEffect(() => {
    const careerId = searchparams.get("careerId");
    dispatch(fetchProcess(careerId));
  }, [dispatch, searchparams]);

  const slides = useMemo(() => {
    if (!process || !Array.isArray(process)) {
      return [];
    }

    return process.map((item) => {
      const slide = {
        title: item.title,
        id: item._id,
      };

      if (
        item.title === "Essential Skills" &&
        item.skills &&
        item.skills.length > 0
      ) {
        slide.skills = item.skills.map(
          (skill) => `${skill.icon} ${skill.skill}`
        );
      }

      if (
        item.title === "What To Study" &&
        item.subjects &&
        item.subjects.length > 0
      ) {
        slide.subjects = item.subjects.map(
          (subject) => `${subject.icon} ${subject.subject}`
        );
      }

      if (
        item.title === "Salary Snapshot" &&
        item.salaryData &&
        item.salaryData.length > 0
      ) {
        slide.salaries = item.salaryData.map((salary) => ({
          level: salary.level,
          salary: `$${salary.min}k to $${salary.max}k`,
        }));
      }

      return slide;
    });
  }, [process]);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length > 0) {
      setCurrent(0);
    }
  }, [slides.length]);

  const nextSlide = () => {
    if (slides.length > 0) {
      setCurrent((prev) => (prev + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (slides.length > 0) {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  return processLoading ? (
    <div className="flex items-center justify-center min-h-[400px] min-h-[275px] min-w-[350px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="flex flex-col bg-[#130934] overflow-hidden items-center justify-center overflow-x-hidden">
      <div className="relative w-full max-w-md min-w-[350px]">
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
            className="bg-[#2a1760] text-white p-6 rounded-2xl shadow-lg w-[320px] mx-auto"
          >
            <h2 className="font-semibold text-lg mb-4">
              {slides[current]?.title}
            </h2>

            {/* Essential Skills */}
            {slides[current]?.skills && (
              <div className="flex flex-wrap gap-3">
                {slides[current].skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-purple-300/70 text-black rounded-full text-xs font-medium shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* What To Study */}
            {slides[current]?.subjects && (
              <div className="flex flex-wrap gap-3">
                {slides[current].subjects.map((subject, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-blue-300/70 text-black rounded-full text-xs font-medium shadow-sm"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            )}

            {/* Salary Snapshot */}
            {slides[current]?.salaries && (
              <div>
                <div className="flex flex-col gap-3 mt-4">
                  {slides[current].salaries.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-[14px] w-full px-6 py-4 rounded-xl bg-[#3a2175] shadow-lg"
                    >
                      <span className="font-semibold">{item.level}</span>
                      <span className="font-bold">{item.salary}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-300">
                  Note: Salary varies by country
                </p>
              </div>
            )}

            {!slides[current]?.skills &&
              !slides[current]?.subjects &&
              !slides[current]?.salaries && (
                <p className="text-gray-400 text-center py-8">
                  No data available for this section
                </p>
              )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      {slides.length > 1 && (
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
      )}
    </div>
  );
}
