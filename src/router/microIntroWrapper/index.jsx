import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export default function MicroExperienceLayout() {
  return (
    <div className="h-screen relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/assets/Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[360px] flex flex-col gap-5 p-6 min-h-[150px] z-20 border"
        style={{
          borderRadius: "24px 24px 0 0",
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.80) -5.54%, #FFF 50%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Suspense fallback={<p>Loading form...</p>}>
          <Outlet />
        </Suspense>
      </motion.div>
    </div>
  );
}
