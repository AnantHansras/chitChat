import React from 'react';
import logo from '../assets/image.png';
import { useSelector } from 'react-redux';
import { AnimatePresence,motion } from 'framer-motion';

const Welcome = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <AnimatePresence>
      <div
        
        className={`flex flex-col justify-center items-center flex-1 md:flex-[0.7] h-[100%] ${
          darkMode ? ' text-gray-300' : ' text-[#0000008F]'
        }`}
      >
        <motion.img 
        initial={{ y: -400 }} // Starting position above the screen
        animate={{ y: [-400,40,-40,10,0] }} // Falling and bouncing keyframes
        transition={{
          duration: 1.2, // Total animation duration
          times: [0, 0.8, 1], // Keyframe timing (bounce near the end)
          ease: "easeOut", // Easing function for smooth bounce
          repeat: 0, // No repeat
        }}
        
  src={logo} className="h-52 opacity-70" />
        <p className="mt-1">
          Chat with your friends in real-time and enjoy seamless conversations.
        </p>
      </div>
    </AnimatePresence>
    
  );
};

export default Welcome;
