import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import InteractiveAstronaut from "../components/welcome/InteractiveAstronaut";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentData } from "../redux/actions/student-onboarding-action";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function Welcome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { StudentDataLoading, StudentData, loading } = useSelector(
    (state) => state.student
  );
  useEffect(() => {
    dispatch(fetchStudentData());
  }, [dispatch]);
  console.log(StudentData, "data");
  console.log(StudentData?.length, "length");

  useEffect(() => {
    if (StudentData && StudentData.data && StudentData.data.length > 0) {
      const student = StudentData.data[0];
      const gradeId = student.selected_grades?.[0]?.gradeId;

      // Case 1: All keys are empty - stay on welcome page, let user click Get Started
      if (
        !student.selected_grades?.length &&
        !student.figureout &&
        !student.selected_skill?.length &&
        !student.selected_subject?.length &&
        !student.selected_sdg?.length &&
        !student.ambitions
      ) {
        return; // Stay on welcome page
      }

      // Case 7: All keys have data - go to dashboard
      if (
        student.selected_grades?.length &&
        student.figureout &&
        student.selected_skill?.length &&
        student.selected_subject?.length &&
        student.selected_sdg?.length &&
        student.ambitions
      ) {
        navigate("/dashboard");
        return;
      }

      // Case 2: Only selected_grades has data
      if (
        student.selected_grades?.length &&
        !student.figureout &&
        !student.selected_skill?.length &&
        !student.selected_subject?.length &&
        !student.selected_sdg?.length &&
        !student.ambitions
      ) {
        navigate(`/questions/figure-out?gradeId=${gradeId}`);
        return;
      }

      // Case 3: selected_grades + figureout have data
      if (
        student.selected_grades?.length &&
        student.figureout &&
        !student.selected_subject?.length &&
        !student.selected_skill?.length &&
        !student.selected_sdg?.length &&
        !student.ambitions
      ) {
        navigate(`/questions/subject?gradeId=${gradeId}`);
        return;
      }

      // Case 4: selected_grades + figureout + selected_subject have data
      if (
        student.selected_grades?.length &&
        student.figureout &&
        student.selected_subject?.length &&
        !student.selected_skill?.length &&
        !student.selected_sdg?.length &&
        !student.ambitions
      ) {
        navigate(`/questions/skills/gradeId=${gradeId}`);
        return;
      }

      // Case 5: selected_grades + figureout + selected_subject + selected_skill have data
      if (
        student.selected_grades?.length &&
        student.figureout &&
        student.selected_subject?.length &&
        student.selected_skill?.length &&
        !student.selected_sdg?.length &&
        !student.ambitions
      ) {
        navigate(`/questions/skill-care/gradeId=${gradeId}`);
        return;
      }

      // Case 6: All except ambitions have data
      if (
        student.selected_grades?.length &&
        student.figureout &&
        student.selected_subject?.length &&
        student.selected_skill?.length &&
        student.selected_sdg?.length &&
        !student.ambitions
      ) {
        navigate(`/questions/ambitions/gradeId=${gradeId}`);
        return;
      }
    }
  }, [StudentData, navigate]);

  const [animationStep, setAnimationStep] = useState(0);
  const MotionLink = motion(Link);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const timeouts = [
      setTimeout(() => setAnimationStep(1), 500),
      setTimeout(() => setAnimationStep(2), 2000),
      setTimeout(() => setAnimationStep(3), 2500),
      setTimeout(() => setAnimationStep(5), 3000),
      setTimeout(() => setAnimationStep(6), 4000),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return StudentDataLoading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="min-h-screen relative overflow-hidden ">
      <div className="absolute right-0 z-20 top-[40%]">
        <img src="/welcome-rob.svg" alt="" className="" />
      </div>
      {/* Background */}
      <div className="fixed inset-0 bg-[url('/assets/welcome/welcome-bg.svg')] bg-no-repeat bg-center bg-cover" />

      {/* Stars */}
      <div className="fixed inset-0">
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

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="mb-8 space-y-6">
          <AnimatePresence>
            {animationStep >= 1 && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-3xl font-bold"
                style={{ color: "#4ED0AA" }}
              >
                <TypewriterText text={`Welcome, ${user?.name}`} />
              </motion.h1>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {animationStep >= 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-white text-lg max-w-sm mx-auto leading-relaxed"
              >
                Lucidus is here to support and prepare you for the real world.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Features */}
        <div className="space-y-8 mb-12 z-20">
          <AnimatePresence>
            {animationStep >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.1, 1] }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center space-y-3"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl rotate-90"
                  style={{ background: "#4823CF" }}
                >
                  🔍
                </div>
                <span className="!text-[#C2B1FF] text-xl ">
                  Explore Careers.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {animationStep >= 4 && (
              <motion.div
                initial={{ opacity: 0, rotate: -15 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center space-y-3"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: "#4823CF" }}
                >
                  🙌
                </div>
                <span className="text-[#C2B1FF] text-xl ">
                  Try Micro-experiences.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {animationStep >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                className="flex flex-col items-center space-y-3"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: "#4823CF" }}
                >
                  💎
                </div>
                <span className="text-[#C2B1FF] text-xl text-center">
                  Get Custom Plans for School,
                  <br />
                  University, & Beyond.
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <AnimatePresence>
          {animationStep >= 6 && (
            <MotionLink
              to="/questions/grade"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-[312px] h-12 flex items-center justify-center gap-[10px] rounded-[12px] bg-[#0F8864] shadow-[0_0_4px_0_rgba(0,0,0,0.25)] text-white font-semibold text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] px-14 py-3 cursor-pointer"
            >
              Get Started
            </MotionLink>
          )}
        </AnimatePresence>

        {/* <InteractiveAstronaut /> */}
      </div>
    </div>
  );
}

function TypewriterText({ text }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayText}</span>;
}
