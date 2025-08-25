import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterConfigration } from "./router/index.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterConfigration />
  </StrictMode>
);
