import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import burgerVideo from "@/assets/burger-anmation.mp4";

interface BurgerIntroVideoProps {
  onComplete: () => void;
}

export function BurgerIntroVideo({ onComplete }: BurgerIntroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Auto play the video
    video.play().catch((error) => {
      console.log("Video autoplay failed:", error);
      // If autoplay fails, still proceed after a timeout
      setTimeout(() => {
        setIsPlaying(false);
        onComplete();
      }, 1000);
    });

    // Handle video end
    const handleEnded = () => {
      setIsPlaying(false);
      setTimeout(() => {
        onComplete();
      }, 300); // Small delay before showing menu
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          className="fixed inset-0 z-50 bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Video displayed as-is, filling the screen */}
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
          >
            <source src={burgerVideo} type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
