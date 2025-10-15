import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterConfiguration } from "./router/index.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import { SpeedInsights } from "@vercel/speed-insights/next";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SpeedInsights />
    <Toaster></Toaster>
    <RouterConfiguration />
  </Provider>
);
