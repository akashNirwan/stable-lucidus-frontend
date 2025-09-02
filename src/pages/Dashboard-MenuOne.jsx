import React from "react";
import { useState } from "react";
import { X } from "lucide-react";
const DashBoardMenuOne = () => {
  const [open, setOpen] = useState(true);

  if (!open) return null;
  return (
    <div className="text-white grid place-content-center h-[80vh]">
      Comming Soon...😉
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        {/* Modal box */}
        <div className="relative bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          <h2 className="text-[#4C3AE3] font-bold text-lg mb-2">
            Zuri’s story continues.
          </h2>

          {/* Subtitle */}
          <p className="text-gray-800 mb-6">
            A new Microfinance challenge awaits you.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => alert("Go to Level 2")}
            className="w-full py-3 bg-[#24A57F] text-white font-semibold rounded-lg hover:bg-[#1e896a] transition"
          >
            Try Level 2
          </button>
        </div>
      </div>
      ;
    </div>
  );
};

export default DashBoardMenuOne;
