import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const LoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          return 100;
        }
        return old + 5;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        navigate("/dashboard");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, navigate]);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress, navigate]);
  return (
    <div className="flex flex-col w-full ">
      <h2 className="text-[#A187FF] text-xs font-semibold mb-4">
        Loading Potential Careers...
      </h2>

      <div className="w-full bg-blue-900 rounded-full overflow-hidden border border-blue-400">
        <div
          className="bg-green-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingBar;
