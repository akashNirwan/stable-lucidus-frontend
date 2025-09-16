import { useState } from "react";
import { motion } from "framer-motion";

export default function InteractiveAstronaut() {
  return (
    <div className="absolute h-full ">
      <motion.div className="w-[200px] h-[200px] absolute top-1/2 left-[40%] -translate-y-1/2 z-10 cursor-pointer">
        <img
          src="/assets/astronaut-welcome.svg"
          alt="Astronaut"
          className="w-full h-full object-contain"
        />
      </motion.div>
    </div>
  );
}
