import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import AuthLayout from "./authWrapper";
import Otp from "../pages/Otp";
import Welcome from "../pages/Welcome";
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
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "otp",
        element: <Otp />,
      },
    ],
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
]);

export const RouterConfigration = () => {
  return <RouterProvider router={router} />;
};
