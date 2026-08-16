import { motion } from "framer-motion";
import topBun from "@/assets/top-bun.png";
import lettuce from "@/assets/lettuce.png";
import tomato from "@/assets/tomato.png";
import onion from "@/assets/onion.png";
import pickles from "@/assets/pickles.png .png";
import cheese from "@/assets/cheese.png";
import patty from "@/assets/patty.png";
import bottomBun from "@/assets/bottom-bun.png";

export function SandwichAnimation({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      {/* Dark overlay to make animation more visible */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Wrapper for entire sandwich that will fade out at the end */}
      <motion.div
        className="relative z-20 h-80 w-80 sm:h-96 sm:w-96"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 1, 1, 1, 0] }}
        transition={{ 
          duration: 6, 
          times: [0, 0.7, 0.75, 0.8, 0.85, 1],
        }}
      >
        {/* Bottom Bun - rises from bottom */}
        <motion.img
          src={bottomBun}
          alt=""
          className="absolute w-full drop-shadow-2xl"
          style={{ bottom: 0, left: 0 }}
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Patty - slides from left */}
        <motion.img
          src={patty}
          alt=""
          className="absolute w-full drop-shadow-2xl"
          style={{ bottom: 40, left: 0 }}
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        />

        {/* Cheese - slides from right */}
        <motion.img
          src={cheese}
          alt=""
          className="absolute w-full drop-shadow-2xl"
          style={{ bottom: 60, left: 0 }}
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
        />

        {/* Tomato - slides from left */}
        <motion.img
          src={tomato}
          alt=""
          className="absolute w-full drop-shadow-2xl"
          style={{ bottom: 80, left: 0 }}
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
        />

        {/* Onion - slides from right */}
        <motion.img
          src={onion}
          alt=""
          className="absolute w-full drop-shadow-2xl"
          style={{ bottom: 100, left: 0 }}
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.0, ease: "easeOut" }}
        />

        {/* Pickles - slides from left */}
        <motion.img
          src={pickles}
          alt=""
          className="absolute w-full drop-shadow-2xl"
          style={{ bottom: 120, left: 0 }}
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.4, ease: "easeOut" }}
        />

        {/* Lettuce - slides from right */}
        <motion.img
          src={lettuce}
          alt=""
          className="absolute w-full drop-shadow-2xl"
          style={{ bottom: 140, left: 0 }}
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.8, ease: "easeOut" }}
        />

        {/* Top Bun - drops from top */}
        <motion.img
          src={topBun}
          alt=""
          className="absolute w-full drop-shadow-2xl"
          style={{ bottom: 165, left: 0 }}
          initial={{ y: -300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 3.2, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
        />
      </motion.div>
    </div>
  );
}
