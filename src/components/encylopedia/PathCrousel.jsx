import React, { useState , useEffect, useMemo} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPath } from "../../redux/actions/encyclopedia-action";
import LoadingSpinner from "../common/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

// const slides = [
//   {
//     title: "Entry Level",
//     exper: "0-3 years",
//     salaries: [
//       { level: "Entry Level" },
//       { level: "Mid Level" },
//       { level: "Senior Level" },
//     ],
//   },
//   {
//     title: "Medium Level ",
//     exper: "0-3 years",
//     salaries: [
//       { level: "Entry Level" },
//       { level: "Mid Level" },
//       { level: "Senior Level" },
//     ],
//   },
//   {
//     title: "Senior Level",
//     salaries: [
//       { level: "Entry Level" },
//       { level: "Mid Level" },
//       { level: "Senior Level" },
//     ],
//   },
// ];

export default function PathCrousel() {

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const careerId = searchParams.get("careerId");
  console.log(careerId, "careerid");

  const { path, pathLoading } = useSelector((state) => state.encyclopedia);

  useEffect(() => {
    const careerId = searchParams.get("careerId");
    if (careerId) {
      dispatch(fetchPath(careerId));
    }
  }, [dispatch, searchParams]);


    const slides = useMemo(() => {
    if (!path || !Array.isArray(path)) {
      return [];
    }

    return path.map((item) => ({
      id: item._id,
      title: item.levelType,
      experience: `${item.minYears}-${item.maxYears} years`,
      roles: item.roles || [],
      createdAt: item.createdAt
    }));
  }, [path]);






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




  return pathLoading ? (


      <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
   
  ) : (


       <div className="flex flex-col bg-[#130934] overflow-hidden items-center justify-center">
      {(!slides || slides.length === 0) ? (
        <div className="flex items-center justify-center min-h-[400px] text-white">
          <p>No path data available</p>
        </div>
      ) : (



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
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 min-w-[285px]">
               {slides[current].title}
                  {slides[current].experience && (
                    <div className="text-[12px] font-normal">
                      {slides[current].experience}
                    </div>
              )}
            </h2>

              {slides[current].roles && slides[current].roles.length > 0 && (
                  <div>
                    <div className="flex flex-col gap-3 mt-4">
                      {slides[current].roles.map((role, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-[14px] w-full px-6 py-4 rounded-xl bg-[#3a2175] shadow-lg"
                        >
                          <span className="font-semibold">{role.title}</span>
                          {role.icon && role.icon !== "icon.jpg" && (
                            <span className="text-lg">{role.icon}</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-gray-300">
                      Note: Career progression may vary by organization and individual performance
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
      </div>

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