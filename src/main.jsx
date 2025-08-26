import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";


import { RouterConfigration } from "./router/index.jsx";
createRoot(document.getElementById("root")).render(

  <Provider store = {store}>
    <Toaster></Toaster>
    <RouterConfigration />
    </Provider>
    
  
);
