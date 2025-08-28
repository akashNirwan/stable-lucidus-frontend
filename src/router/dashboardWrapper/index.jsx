import React from "react";
import Header from "../../components/dashboard/Header";
import Footer from "../../components/dashboard/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
const DashBoardWrapper = () => {
  const [menu, setMenu] = useState(1);
  return (
    <div className="flex flex-col min-h-screen bg-[#130934]">
      <Header />
      <main className="flex-grow bg-[#130934]">
        <Outlet context={{ menu, setMenu }} />
      </main>
      <Footer />
    </div>
  );
};

export default DashBoardWrapper;
