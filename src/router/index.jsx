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
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <div>About </div>,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "otp", element: <Otp /> },
    ],
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/questions",
    element: <OnBoardWrapper />,
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
    element: <QuestionFinalLoad />,
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [{ index: true, element: <DashBoard /> }],
  },
  {
    path: "/level",
    element: <Level />,
  },
  {
    path: "/micro-intro",
    element: <MicroExperienceLayout />,
    children: [{ index: true, element: <MicroIntoScreen /> }],
  },
]);

export const RouterConfiguration = () => {
  return <RouterProvider router={router} />;
};
