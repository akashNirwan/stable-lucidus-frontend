import React from "react";
import Header from "../../components/dashboard/Header";
import Footer from "../../components/dashboard/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
const DashBoardWrapper = () => {
  console.log("hello");
  const [menu, setMenu] = useState("");
  const location = useLocation();
  useEffect(() => {
    // Example: /dashboard/badges -> "badges"

    const currentTab = location.pathname.split("/")[2];

    switch (currentTab) {
      case "badges":
        setMenu(3);
        break;
      case "explorecareers":
        setMenu(2);
        break;
      default:
        setMenu(1); // fallback
    }
  }, [location.pathname]);
  return (
    <div className="flex flex-col h-[100dvh] bg-[#130934]">
      <Header />
      <main className="flex-grow overflow-hidden bg-[#130934]">
        <Outlet context={{ menu, setMenu }} />
      </main>
      <Footer setMenu={setMenu} menu={menu} />
    </div>
  );
};

export default DashBoardWrapper;
