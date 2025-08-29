import React from "react";
import Header from "../../components/dashboard/Header";
import Footer from "../../components/dashboard/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
const DashBoardWrapper = () => {
  const [menu, setMenu] = useState(1);
  return (
    <div className="flex flex-col h-screen bg-[#130934]">
      <Header />
      <main className="flex-grow overflow-y-auto bg-[#130934]">
        <Outlet context={{ menu }} />
      </main>
      <Footer setMenu={setMenu} menu={menu} />
    </div>
  );
};

export default DashBoardWrapper;
