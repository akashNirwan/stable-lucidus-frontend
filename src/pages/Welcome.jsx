import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentData,
  updateWelcome,
} from "../redux/actions/student-onboarding-action";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";

export default function Welcome() {
  const MotionLink = motion(Link);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { StudentDataLoading, StudentData, welocomeLoading } = useSelector(
    (state) => state.student
  );

  const [typedUsername, setTypedUsername] = useState("");

  const username = localStorage.getItem("username") || "";

  const featureItems = [
    { icon: "🔍", text: "Explore Careers.", anim: { scale: [0.8, 1.2, 1] } },
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
      anim: { scale: [0.8, 1.2, 1] },
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

  // useEffect(() => {
  //   if (StudentData && StudentData.data && StudentData.data.length > 0) {
  //     const student = StudentData.data[0];
  //     const gradeId = student.selected_grades?.[0]?.gradeId;

  //     const hasGrades =
  //       student.selected_grades && student.selected_grades.length > 0;
  //     const hasFigureout =
  //       "figureout" in student &&
  //       student.figureout &&
  //       student.figureout.trim() !== "";
  //     const hasSkills =
  //       student.selected_skill && student.selected_skill.length > 0;
  //     const hasSubjects =
  //       student.selected_subject && student.selected_subject.length > 0;
  //     const hasSdg = student.selected_sdg && student.selected_sdg.length > 0;
  //     const hasSchool =
  //       student.selected_school && student.selected_school.length > 0;
  //     const hasAmbitions =
  //       "ambitions" in student &&
  //       student.ambitions &&
  //       student.ambitions.trim() !== "";
  //       const hasWelcome = "welcome" in student && student.welcome  && student.welcome.trim() !== "";

  //       console.log('🎯 BOOLEAN CONDITIONS:');
  //   console.log('hasSchool:', hasSchool);
  //   console.log('hasGrades:', hasGrades);
  //   console.log('hasFigureout:', hasFigureout);
  //   console.log('hasSkills:', hasSkills);
  //   console.log('hasSubjects:', hasSubjects);
  //   console.log('hasSdg:', hasSdg);
  //   console.log('hasAmbitions:', hasAmbitions);

  //     if (

  //       !hasSchool &&
  //       !hasGrades &&
  //       !hasFigureout &&
  //       !hasSkills &&
  //       !hasSubjects &&
  //       !hasSdg &&
  //       !hasAmbitions
  //     ) {
  //       return;
  //     }

  //     // Case 7: All complete - go to dashboard
  //     if (
  //       hasSchool &&
  //       hasGrades &&
  //       hasFigureout &&
  //       hasSkills &&
  //       hasSubjects &&
  //       hasSdg &&
  //       hasAmbitions
  //     ) {
  //       navigate("/dashboard/explorecareers");
  //       return;
  //     }

  //     if (
  //        hasWelcome &&
  //       !hasSchool &&
  //       !hasGrades &&
  //       !hasFigureout &&
  //       !hasSkills &&
  //       !hasSubjects &&
  //       !hasSdg &&
  //       !hasAmbitions
  //     ) {
  //       navigate(`/questions/school`);
  //       return;
  //     }
  //     if (
  //       hasSchool &&
  //       !hasGrades &&
  //       !hasFigureout &&
  //       !hasSkills &&
  //       !hasSubjects &&
  //       !hasSdg &&
  //       !hasAmbitions
  //     ) {
  //       navigate(`/questions/grade`);
  //       return;
  //     }
  //     // Case 2: Only grades
  //     if (
  //       hasSchool &&
  //       hasGrades &&
  //       !hasFigureout &&
  //       !hasSkills &&
  //       !hasSubjects &&
  //       !hasSdg &&
  //       !hasAmbitions
  //     ) {
  //       navigate(`/questions/figure-out?gradeId=${gradeId}`);
  //       return;
  //     }

  //     // Case 3: Grades + figureout
  //     if (
  //       hasSchool &&
  //       hasGrades &&
  //       hasFigureout &&
  //       !hasSubjects &&
  //       !hasSkills &&
  //       !hasSdg &&
  //       !hasAmbitions
  //     ) {
  //       navigate(`/questions/subject?gradeId=${gradeId}`);
  //       return;
  //     }

  //     // Case 4: Grades + figureout + subjects
  //     if (
  //       hasSchool &&
  //       hasGrades &&
  //       hasFigureout &&
  //       hasSubjects &&
  //       !hasSkills &&
  //       !hasSdg &&
  //       !hasAmbitions
  //     ) {
  //       navigate(`/questions/skills?gradeId=${gradeId}`);
  //       return;
  //     }

  //     // Case 5: Grades + figureout + subjects + skills
  //     if (
  //       hasSchool &&
  //       hasGrades &&
  //       hasFigureout &&
  //       hasSubjects &&
  //       hasSkills &&
  //       !hasSdg &&
  //       !hasAmbitions
  //     ) {
  //       navigate(`/questions/skills-care?gradeId=${gradeId}`);
  //       return;
  //     }

  //     // Case 6: All except ambitions
  //     if (
  //       hasSchool &&
  //       hasGrades &&
  //       hasFigureout &&
  //       hasSubjects &&
  //       hasSkills &&
  //       hasSdg &&
  //       !hasAmbitions
  //     )
  //       return navigate(`/questions/ambition?gradeId=${gradeId}`);
  //   }
  // }, [StudentData, navigate]);

  useEffect(() => {
    if (!StudentData?.data?.length || StudentDataLoading) return;

    const student = StudentData.data[0];
    const gradeId = student.selected_grades?.[0]?.gradeId;

    // Define what's completed (more readable)
    const completed = {
      welcome: Boolean(student.welcome?.trim()),
      school: student.selected_school?.length > 0,
      grades: student.selected_grades?.length > 0,
      figureout: Boolean(student.figureout?.trim()),
      subjects: student.selected_subject?.length > 0,
      skills: student.selected_skill?.length > 0,
      sdg: student.selected_sdg?.length > 0,
      ambitions: Boolean(student.ambitions?.trim()),
    };

    console.log("✅ Completion Status:", completed);

    // Sequential routing logic - RETURN EARLY on first match

    // Fresh user - stay on welcome
    if (!Object.values(completed).some((v) => v)) {
      console.log("Fresh user - staying on welcome");
      return;
    }

    // All complete - go to dashboard
    if (
      completed.school &&
      completed.grades &&
      completed.figureout &&
      completed.subjects &&
      completed.skills &&
      completed.sdg &&
      completed.ambitions
    ) {
      console.log("All complete → dashboard");
      navigate("/dashboard/explorecareers");
      return;
    }

    // SDG done, ambitions pending
    if (
      completed.school &&
      completed.grades &&
      completed.figureout &&
      completed.subjects &&
      completed.skills &&
      completed.sdg &&
      !completed.ambitions
    ) {
      console.log("SDG done → ambitions");
      navigate(`/questions/ambition?gradeId=${gradeId}`);
      return;
    }

    // Skills done, SDG pending
    if (
      completed.school &&
      completed.grades &&
      completed.figureout &&
      completed.subjects &&
      completed.skills &&
      !completed.sdg
    ) {
      console.log("Skills done → SDG");
      navigate(`/questions/skills-care?gradeId=${gradeId}`);
      return;
    }

    // Subjects done, skills pending
    if (
      completed.school &&
      completed.grades &&
      completed.figureout &&
      completed.subjects &&
      !completed.skills
    ) {
      console.log("Subjects done → skills");
      navigate(`/questions/skills?gradeId=${gradeId}`);
      return;
    }

    // Figureout done, subjects pending
    if (
      completed.school &&
      completed.grades &&
      completed.figureout &&
      !completed.subjects
    ) {
      console.log("Figureout done → subjects");
      navigate(`/questions/subject?gradeId=${gradeId}`);
      return;
    }

    // Grades done, figureout pending
    if (completed.school && completed.grades && !completed.figureout) {
      console.log("Grades done → figureout");
      navigate(`/questions/figure-out?gradeId=${gradeId}`);
      return;
    }

    // School done, grades pending
    if (completed.school && !completed.grades) {
      console.log("School done → grades");
      navigate(`/questions/grade`);
      return;
    }

    // Welcome done, school pending
    if (completed.welcome && !completed.school) {
      console.log("Welcome done → school");
      navigate("/questions/school");
      return;
    }
  }, [StudentData, StudentDataLoading, navigate]);

  const handleClick = () => {
    const payload = {
      welcome: "true",
    };

    dispatch(updateWelcome(payload)).then((res) => {
      if (
        res.payload &&
        (res.payload.code === 200 || res.payload.code === 201)
      ) {
        navigate(`/questions/school`);
        localStorage.removeItem("username");
      }
    });
  };

  return StudentDataLoading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="min-h-screen relative overflow-hidden">
      {/* Robot */}
      <div className="absolute -right-18 z-20 top-[35%] -rotate-[40deg] w-[200px] h-[200px]">
        <img src="/Astronaut2.svg" alt="" />
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              delay: 1.6 + featureItems.length * 0.6 + 0.3,
              duration: 0.6,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-[312px] h-12 flex items-center justify-center gap-[10px] rounded-[12px] bg-[#0F8864] shadow-[0_0_4px_0_rgba(0,0,0,0.25)] text-white font-semibold  transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] px-14 py-3 cursor-pointer"
            onClick={handleClick}
          >
            <button>
              {welocomeLoading ? (
                <LoadingSpinner size={20} color="green"></LoadingSpinner>
              ) : (
                "Get Started"
              )}
            </button>
          </MotionLink>
        </AnimatePresence>
      </div>
    </div>
  );
}
