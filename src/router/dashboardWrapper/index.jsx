import React from "react";
import Header from "../../components/dashboard/Header";
import Footer from "../../components/dashboard/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
const DashBoardWrapper = () => {
  const [menu, setMenu] = useState(2);
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
