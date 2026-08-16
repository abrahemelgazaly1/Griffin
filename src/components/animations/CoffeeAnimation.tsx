import { motion } from "framer-motion";
import coffeeCup from "@/assets/coffee-cup-empty.png";
import coffeeLiquid from "@/assets/coffee-liquid.png";
import coffeePot from "@/assets/coffee-pot.png";
import steam from "@/assets/steam-1.png";

export function CoffeeAnimation({ isActive }: { isActive: boolean }) {
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
        {/* Coffee Cup - rises from bottom */}
        <motion.img
          src={coffeeCup}
          alt=""
          className="absolute w-56 drop-shadow-2xl sm:w-64"
          style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Coffee Pot - comes from top */}
        <motion.img
          src={coffeePot}
          alt=""
          className="absolute w-44 drop-shadow-2xl sm:w-52"
          style={{ top: -30, left: '15%' }}
          initial={{ y: -300, x: -80, opacity: 0, rotate: -20 }}
          animate={{ y: 0, x: 0, opacity: 1, rotate: -10 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        />

        {/* Coffee Liquid - fills up the cup */}
        <motion.div
          className="absolute overflow-hidden"
          style={{ 
            bottom: 25, 
            left: '50%', 
            transform: 'translateX(-50%)',
            width: '180px',
            height: '160px'
          }}
        >
          <motion.img
            src={coffeeLiquid}
            alt=""
            className="absolute w-full drop-shadow-xl"
            style={{ bottom: 0 }}
            initial={{ y: 160 }}
            animate={{ y: 0 }}
            transition={{ duration: 2, delay: 1.6, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Steam rising */}
        {[...Array(3)].map((_, i) => (
          <motion.img
            key={i}
            src={steam}
            alt=""
            className="absolute w-20 opacity-70 sm:w-24"
            style={{ 
              bottom: 180, 
              left: `${35 + i * 15}%`,
            }}
            initial={{ y: 0, opacity: 0, scale: 0.5 }}
            animate={{ 
              y: [-10, -80],
              opacity: [0, 0.7, 0],
              scale: [0.5, 1, 1.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 3.6 + i * 0.3,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Coffee pot moves away */}
        <motion.img
          src={coffeePot}
          alt=""
          className="absolute w-44 drop-shadow-2xl sm:w-52"
          style={{ top: -30, left: '15%' }}
          initial={{ opacity: 0 }}
          animate={{ 
            y: [-300],
            x: [-80],
            opacity: [0, 0, 1, 0],
            rotate: [-10]
          }}
          transition={{ 
            duration: 1, 
            delay: 3.6,
            times: [0, 0.3, 0.5, 1]
          }}
        />
      </motion.div>
    </div>
  );
}
