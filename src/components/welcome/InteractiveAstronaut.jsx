import { useState } from "react";
import { motion } from "framer-motion";

export default function InteractiveAstronaut() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMove = (clientX, clientY) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (clientX - centerX) / 20;
    const moveY = (clientY - centerY) / 20;
    setMousePos({ x: moveX, y: moveY });
  };

  return (
    <div
      className="absolute h-full "
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }}
    >
      <motion.div
        className="w-[200px] h-[200px] absolute top-1/2 left-[40%] -translate-y-1/2 z-10 cursor-pointer"
        animate={{
          x: [0, -10, 10, -10, 0, mousePos.x],
          y: [0, -8, 8, -8, 0, mousePos.y],
          rotate: [0, 2, -2, 2, 0, mousePos.x / 15],
          scale: [1, 1.03, 1.05, 1.03, 1, mousePos.x || mousePos.y ? 1.05 : 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <img
          src="/assets/astronaut-welcome.svg"
          alt="Astronaut"
          className="w-full h-full object-contain"
        />
      </motion.div>
    </div>
  );
}
