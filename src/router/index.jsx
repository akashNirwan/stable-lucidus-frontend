import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import AuthLayout from "./authWrapper";
import Otp from "../pages/Otp";
import Welcome from "../pages/Welcome";
import OnBoardWrapper from "./onboardWrapper";
import QuestionFinalLoad from "../pages/QuestionFinalLoad";
import Question from "../pages/Question";
import DashBoardLayout from "./dashboardWrapper";
import DashBoard from "../pages/DashBoard";
import Level from "../pages/MicroExperience";
import MicroExperienceLayout from "./microIntroWrapper";
import MicroIntoScreen from "../pages/MicroIntoScreen";
import BadgeEarned from "../pages/BadgeEarned";
import OnChoiceFeedBack from "./choiceFeedBack";
import FeedBackForm from "../pages/FeedBackForm";
import ServeyPage from "../pages/ServeyPage";
import EncycloPediaWrapper from "./encyclopediaWrapper";
import EncyclopediaTabs from "../pages/EncyclopediaTabs";
import EncylopediaWrapperTodo from "./encyclopediaTodoWrapper";
import EncylopediaTab from "../pages/EncylopediaTab";
import RoadMapWrapper from "./roadMapWrapper";
import RoadMap from "../pages/RoadMap";
import FeedBackFormOne from "../pages/FeedBackFormOne";
import FeedBackLayout from "./feedBackLayout";
import Purpose from "../pages/Purpose";
import Process from "../pages/Process";
import Prediction from "../pages/Prediction";
import Path from "../pages/Path";
import Profile from "../pages/Profile";
import { PublicRoute, ProtectedRoute } from "../utils/protectRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <App />
      </PublicRoute>
    ),
  },
  {
    path: "/about",
    element: <PublicRoute>
        <div>About</div>
      </PublicRoute>,
  },
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      { path: "login", element: <Login /> },
      { path: "otp", element: <Otp /> },
    ],
  },
  {
    path: "/welcome",
    element: (
      <ProtectedRoute>
        <Welcome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/questions",
    element: (
      <ProtectedRoute>
        <OnBoardWrapper />
      </ProtectedRoute>
    ),
    // children: [{ index: true, element: <Question /> }],

    children: [
      { path: "school", element: <Question stepName="school" /> },
      { path: "grade", element: <Question stepName="grade" /> },
      { path: "figure-out", element: <Question stepName="figure-out" /> },
      { path: "subject", element: <Question stepName="subject" /> },
      { path: "skills", element: <Question stepName="skills" /> },
      { path: "skills-care", element: <Question stepName="skills-care" /> },
      { path: "ambition", element: <Question stepName="ambition" /> },
    ],
  },
  {
    path: "/question-load",
    element: (
      <ProtectedRoute>
        <QuestionFinalLoad />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element:(
      <ProtectedRoute>
        <DashBoardLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <DashBoard /> }],
  },
  {
    path: "/level",
    element:  (
      <ProtectedRoute>
        <Level />
      </ProtectedRoute>
    ),
  },
  {
    path: "/micro-intro",
    element: (
      <ProtectedRoute>
        <MicroExperienceLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <MicroIntoScreen /> }],
  },
  {
    path: "/feedbackform",
    element: (
      <ProtectedRoute>
        <FeedBackLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <FeedBackFormOne /> }],
  },

  {
    path: "/badge-earned",
    element: (
      <ProtectedRoute>
        <BadgeEarned />
      </ProtectedRoute>
    ),
  },
  {
    path: "/survey-page",
    element: (
      <ProtectedRoute>
        <ServeyPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element:(
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student-choice",
    element:(
      <ProtectedRoute>
        <OnChoiceFeedBack />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <FeedBackForm /> }],
  },
  // {
  //   path: "/encyclopedia",
  //   element: <EncycloPediaWrapper />,
  //   children: [{ index: true, element: <EncyclopediaTabs /> }],
  // },
  {
    path: "/encyclopedia/purpose",
    element: (
      <ProtectedRoute>
        <EncycloPediaWrapper />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <Purpose /> }],
  },
  {
    path: "/encyclopedia/process",
    element: (
      <ProtectedRoute>
        <EncycloPediaWrapper />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <Process /> }],
  },
  {
    path: "/encyclopedia/path",
    element: (
      <ProtectedRoute>
        <EncycloPediaWrapper />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <Path /> }],
  },
  {
    path: "/encyclopedia/prediction",
    element: (
      <ProtectedRoute>
        <EncycloPediaWrapper />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <Prediction /> }],
  },
  {
    path: "/encylopedia-todo",
    element: (
      <ProtectedRoute>
        <EncylopediaWrapperTodo />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <EncylopediaTab />,
      },
    ],
  },
  {
    path: "/roadmap",
    element: (
      <ProtectedRoute>
        <RoadMapWrapper />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <RoadMap /> }],
  },
]);

export const RouterConfiguration = () => {
  return <RouterProvider router={router} />;
};
