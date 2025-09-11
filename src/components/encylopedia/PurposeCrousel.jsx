import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPredictionandPurpose } from "../../redux/actions/encyclopedia-action";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../common/LoadingSpinner";
import EncycloPediaWrapper from "../../router/encyclopediaWrapper";

export default function PurposeCrousel() {
  const dispatch = useDispatch();
  const [searchparams] = useSearchParams();
  const careerId = searchparams.get("careerId");
  console.log(careerId, "careerid");

  const { predictionandPurpose, loading } = useSelector(
    (state) => state.encyclopedia
  );

  useEffect(() => {
    const careerId = searchparams.get("careerId");
    dispatch(fetchPredictionandPurpose({ careerId, tab: "Purpose" }));
  }, [dispatch, searchparams]);

  const slides = useMemo(() => {
    if (!predictionandPurpose || !Array.isArray(predictionandPurpose)) {
      return [];
    }

    return predictionandPurpose.map((item) => ({
      title: item.title,
      text: item.description,
      id: item._id,
    }));
  }, [predictionandPurpose]);

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

  return loading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="flex flex-col bg-[#130934] overflow-hidden">
      {!slides || slides.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px] text-white">
          <p>No purpose data available</p>
        </div>
      ) : (
        <div className="flex flex-col  bg-[#130934] overflow-hidden">
          {/* Slide */}
          <div className="relative w-full max-w-md ">
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
                className="bg-[#2a1760] text-white p-6 rounded-2xl shadow-lg h-[275px]"
              >
                <h2 className="font-semibold text-lg mb-3">
                  {slides[current].title}
                </h2>

                {/* Render paragraph or list */}
                {slides[current].text && (
                  <p className="text-sm leading-relaxed">
                    {slides[current].text}
                  </p>
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
      )}
    </div>
  );
}
