import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentData } from "../redux/actions/student-onboarding-action";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";

export default function Welcome() {
  const MotionLink = motion(Link);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { StudentDataLoading, StudentData } = useSelector(
    (state) => state.student
  );

  const [typedUsername, setTypedUsername] = useState("");

  const username = localStorage.getItem("username") || "";

  const featureItems = [
    { icon: "🔍", text: "Explore Careers.", anim: { rotate: [0, 10, -10, 0] } },
    {
      icon: "🙌",
      text: "Try Micro-experiences.",
      anim: { scale: [0.8, 1.2, 1] },
    },
    {
      icon: "💎",
      text: (
        <>
          Get Custom Plans for School,
          <br />
          University, & Beyond.
        </>
      ),
      anim: { rotate: [-90, 0] },
    },
  ];

  useEffect(() => {
    dispatch(fetchStudentData());
  }, [dispatch]);

  // Username typewriter animation
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < username.length) {
        setTypedUsername((prev) => prev + username[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [username]);

  useEffect(() => {
    if (StudentData && StudentData.data && StudentData.data.length > 0) {
      const student = StudentData.data[0];
      const gradeId = student.selected_grades?.[0]?.gradeId;

      const hasGrades =
        student.selected_grades && student.selected_grades.length > 0;
      const hasFigureout =
        "figureout" in student &&
        student.figureout &&
        student.figureout.trim() !== "";
      const hasSkills =
        student.selected_skill && student.selected_skill.length > 0;
      const hasSubjects =
        student.selected_subject && student.selected_subject.length > 0;
      const hasSdg = student.selected_sdg && student.selected_sdg.length > 0;
      const hasSchool =
        student.selected_school && student.selected_school.length > 0;
      const hasAmbitions =
        "ambitions" in student &&
        student.ambitions &&
        student.ambitions.trim() !== "";

      if (
        !hasSchool &&
        !hasGrades &&
        !hasFigureout &&
        !hasSkills &&
        !hasSubjects &&
        !hasSdg &&
        !hasAmbitions
      ) {
        return;
      }

      // Case 7: All complete - go to dashboard
      if (
        hasSchool &&
        hasGrades &&
        hasFigureout &&
        hasSkills &&
        hasSubjects &&
        hasSdg &&
        hasAmbitions
      ) {
        navigate("/dashboard/explorecareers");
        return;
      }
      if (
        hasSchool &&
        !hasGrades &&
        !hasFigureout &&
        !hasSkills &&
        !hasSubjects &&
        !hasSdg &&
        !hasAmbitions
      ) {
        navigate(`/questions/grade`);
        return;
      }
      // Case 2: Only grades
      if (
        hasSchool &&
        hasGrades &&
        !hasFigureout &&
        !hasSkills &&
        !hasSubjects &&
        !hasSdg &&
        !hasAmbitions
      ) {
        navigate(`/questions/figure-out?gradeId=${gradeId}`);
        return;
      }

      // Case 3: Grades + figureout
      if (
        hasSchool &&
        hasGrades &&
        hasFigureout &&
        !hasSubjects &&
        !hasSkills &&
        !hasSdg &&
        !hasAmbitions
      ) {
        navigate(`/questions/subject?gradeId=${gradeId}`);
        return;
      }

      // Case 4: Grades + figureout + subjects
      if (
        hasSchool &&
        hasGrades &&
        hasFigureout &&
        hasSubjects &&
        !hasSkills &&
        !hasSdg &&
        !hasAmbitions
      ) {
        navigate(`/questions/skills?gradeId=${gradeId}`);
        return;
      }

      // Case 5: Grades + figureout + subjects + skills
      if (
        hasSchool &&
        hasGrades &&
        hasFigureout &&
        hasSubjects &&
        hasSkills &&
        !hasSdg &&
        !hasAmbitions
      ) {
        navigate(`/questions/skills-care?gradeId=${gradeId}`);
        return;
      }

      // Case 6: All except ambitions
      if (
        hasSchool &&
        hasGrades &&
        hasFigureout &&
        hasSubjects &&
        hasSkills &&
        hasSdg &&
        !hasAmbitions
      )
        return navigate(`/questions/ambition?gradeId=${gradeId}`);
    }
  }, [StudentData, navigate]);

  const handleClick = () => {
    localStorage.removeItem("username");
  };

  return StudentDataLoading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="min-h-screen relative overflow-hidden">
      {/* Robot */}
      <div className="absolute right-0 z-20 top-[35%]">
        <img src="/welcome-rob3.png" alt="" />
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
        {/* Heading */}
        <motion.div
          className="mb-8 space-y-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-[28px] font-bold" style={{ color: "#4ED0AA" }}>
            Welcome, <span>{username}</span>
          </h1>
          <motion.p
            className="text-white max-w-sm mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Lucidus is here to support and prepare you for the real world.
          </motion.p>
        </motion.div>

        {/* Features */}
        <div className="space-y-8 mb-12 z-20">
          {featureItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center space-y-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, ...item.anim }}
              transition={{
                delay: 1.6 + index * 0.6,
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                style={{ background: "#4823CF" }}
                whileHover={{ scale: 1.1, rotate: 3 }}
              >
                {item.icon}
              </motion.div>
              <span className="text-[#C2B1FF] text-lg text-center">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <AnimatePresence>
          <MotionLink
            to="/questions/school"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-[312px] h-12 flex items-center justify-center gap-[10px] rounded-[12px] bg-[#0F8864] shadow-[0_0_4px_0_rgba(0,0,0,0.25)] text-white font-semibold  transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] px-14 py-3 cursor-pointer"
          >
            <button onClick={handleClick}>Get Started</button>
          </MotionLink>
        </AnimatePresence>

        {/* <InteractiveAstronaut /> */}
      </div>
    </div>
  );
}
