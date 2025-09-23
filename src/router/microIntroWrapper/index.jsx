import React, { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import LoadingSpinner from "../../components/common/LoadingSpinner";
export default function MicroExperienceLayout() {
  const steps = ["grade", "figure-out"];
  const [screen, setScreen] = useState(1);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoLoading, setVideoLoading] = useState(true);

  return (
    <div className="w-full min-h-screen bg-[url(/assets/badge-bg.svg)] bg-no-repeat bg-center bg-cover relative overflow-hidden">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-[375px] px-4 z-20">
        <div className="flex items-center justify-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${
                i + 1 <= screen ? "bg-white" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
      {videoLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size={64} variant="ring" color="purple" />
        </div>
      ) : videoUrl ? (
        videoUrl.endsWith(".gif") ? (
          <img
            key={videoUrl}
            src={videoUrl}
            alt="Visual content"
            className="absolute inset-0 w-[600px] h-full object-cover z-10 mx-auto"
          />
        ) : (
          <video
            key={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 max-w-[425px] h-full object-cover z-10 mx-auto"
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )
      ) : (
        <div className="absolute inset-0 w-[600px] h-full flex items-center justify-center z-10 mx-auto">
          <div className="bg-black/50 text-white px-4 py-2 rounded-lg"></div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[425px] flex flex-col gap-5 p-6 min-h-[150px] z-20 border"
        style={{
          borderRadius: "24px 24px 0 0",
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.80) -5.54%, #FFF 50%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Suspense fallback={<p>Loading form...</p>}>
          <Outlet
            context={{
              screen,
              setScreen,
              setVideoUrl,
              videoLoading,
              setVideoLoading,
            }}
          />
        </Suspense>
      </motion.div>
    </div>
  );
}
