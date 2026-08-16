import { motion } from "framer-motion";
import waffleBase from "@/assets/waffle-base.png";
import chocolateSyrup from "@/assets/chocolate-syrup.png";
import whippedCream from "@/assets/whipped-cream.png";
import strawberry from "@/assets/strawberry.png";
import banana from "@/assets/banana.png";
import cherry from "@/assets/cherry.png";

export function FlipAnimation({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      {/* Dark overlay to make animation more visible */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Wrapper that will fade out at the end */}
      <motion.div
        className="relative z-20 h-80 w-80 sm:h-96 sm:w-96"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 1, 1, 0] }}
        transition={{ 
          duration: 6, 
          times: [0, 0.7, 0.8, 0.9, 1],
        }}
      >
        {/* Waffle Base - flips into view */}
        <motion.img
          src={waffleBase}
          alt=""
          className="absolute w-64 drop-shadow-2xl sm:w-72"
          style={{ bottom: 60, left: '50%', transform: 'translateX(-50%)' }}
          initial={{ y: -300, opacity: 0, rotateX: 90 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            rotateX: 0
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
        />

        {/* Chocolate Syrup - drips down */}
        <motion.img
          src={chocolateSyrup}
          alt=""
          className="absolute w-72 drop-shadow-xl sm:w-80"
          style={{ bottom: 55, left: '50%', transform: 'translateX(-50%)' }}
          initial={{ y: -200, opacity: 0, scaleY: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            scaleY: 1
          }}
          transition={{ 
            duration: 1, 
            delay: 0.8,
            ease: "easeOut"
          }}
        />

        {/* Banana - slides from left */}
        <motion.img
          src={banana}
          alt=""
          className="absolute w-28 drop-shadow-xl sm:w-32"
          style={{ bottom: 110, left: '20%' }}
          initial={{ x: -200, opacity: 0, rotate: -45 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            rotate: -15
          }}
          transition={{ 
            duration: 0.6, 
            delay: 1.8,
            ease: "easeOut"
          }}
        />

        {/* Strawberry - drops from top */}
        <motion.img
          src={strawberry}
          alt=""
          className="absolute w-20 drop-shadow-xl sm:w-24"
          style={{ bottom: 115, right: '20%' }}
          initial={{ y: -200, opacity: 0, rotate: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            rotate: 20
          }}
          transition={{ 
            duration: 0.6, 
            delay: 2.2,
            ease: "easeOut",
            type: "spring",
            stiffness: 150
          }}
        />

        {/* Whipped Cream - appears with a puff */}
        <motion.img
          src={whippedCream}
          alt=""
          className="absolute w-32 drop-shadow-2xl sm:w-40"
          style={{ bottom: 125, left: '50%', transform: 'translateX(-50%)' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1
          }}
          transition={{ 
            duration: 0.5, 
            delay: 2.6,
            ease: "easeOut",
            type: "spring",
            stiffness: 200
          }}
        />

        {/* Cherry on top - drops last */}
        <motion.img
          src={cherry}
          alt=""
          className="absolute w-14 drop-shadow-xl sm:w-16"
          style={{ bottom: 175, left: '50%', transform: 'translateX(-50%)' }}
          initial={{ y: -300, opacity: 0, scale: 0.5 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            scale: 1
          }}
          transition={{ 
            duration: 0.5, 
            delay: 3.2,
            ease: "easeOut",
            type: "spring",
            stiffness: 180,
            damping: 10
          }}
        />

        {/* Sparkle effects around the final dessert */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-3 w-3 rounded-full bg-yellow-300 shadow-lg sm:h-4 sm:w-4"
            style={{ 
              bottom: 130 + Math.sin(i * Math.PI / 3) * 50, 
              left: `${50 + Math.cos(i * Math.PI / 3) * 45}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1,
              delay: 3.6 + i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
