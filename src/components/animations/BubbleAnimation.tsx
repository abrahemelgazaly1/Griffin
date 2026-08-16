import { motion } from "framer-motion";
import glassEmpty from "@/assets/glass-empty.png";
import juiceLiquid from "@/assets/juice-liquid.png";
import iceCube from "@/assets/ice-cube.png .png";
import lemonSlice from "@/assets/lemon-slice.png";
import straw from "@/assets/straw.png";

export function BubbleAnimation({ isActive }: { isActive: boolean }) {
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
        {/* Glass - rises from bottom */}
        <motion.img
          src={glassEmpty}
          alt=""
          className="absolute w-56 drop-shadow-2xl sm:w-64"
          style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Juice Liquid - fills up from bottom */}
        <motion.div
          className="absolute overflow-hidden"
          style={{ 
            bottom: 30, 
            left: '50%', 
            transform: 'translateX(-50%)',
            width: '190px',
            height: '200px'
          }}
        >
          <motion.img
            src={juiceLiquid}
            alt=""
            className="absolute w-full drop-shadow-xl"
            style={{ bottom: 0 }}
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Ice Cubes - drop from top one by one */}
        {[...Array(3)].map((_, i) => (
          <motion.img
            key={i}
            src={iceCube}
            alt=""
            className="absolute w-12 drop-shadow-xl sm:w-14"
            style={{ 
              top: 80 + i * 30, 
              left: `${30 + i * 20}%`,
            }}
            initial={{ y: -150, opacity: 0, rotate: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              rotate: [0, 180]
            }}
            transition={{
              duration: 0.6,
              delay: 2.8 + i * 0.2,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Lemon Slice - appears on the side */}
        <motion.img
          src={lemonSlice}
          alt=""
          className="absolute w-20 drop-shadow-xl sm:w-24"
          style={{ 
            bottom: 120, 
            left: '5%',
          }}
          initial={{ x: -150, opacity: 0, rotate: -90 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            rotate: 0
          }}
          transition={{
            duration: 0.8,
            delay: 3.6,
            ease: "easeOut"
          }}
        />

        {/* Straw - slides in from top */}
        <motion.img
          src={straw}
          alt=""
          className="absolute w-8 drop-shadow-xl"
          style={{ 
            bottom: 60, 
            left: '60%',
            height: '240px',
            objectFit: 'contain'
          }}
          initial={{ y: -300, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1
          }}
          transition={{
            duration: 0.6,
            delay: 4.0,
            ease: "easeOut"
          }}
        />

        {/* Bubbles rising */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-4 w-4 rounded-full bg-white/50 shadow-lg sm:h-5 sm:w-5"
            style={{ 
              bottom: 50, 
              left: `${35 + i * 10}%`,
            }}
            initial={{ y: 0, opacity: 0, scale: 0.3 }}
            animate={{ 
              y: [-10, -120],
              opacity: [0, 0.7, 0],
              scale: [0.3, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 2.8 + i * 0.2,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
