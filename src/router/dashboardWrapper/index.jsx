import React from "react";
import Header from "../../components/dashboard/Header";
import Footer from "../../components/dashboard/Footer";
import { Outlet } from "react-router-dom";
const DashBoardWrapper = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#130934]">
      <Header />
      <main className="flex-grow bg-[#130934]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DashBoardWrapper;
