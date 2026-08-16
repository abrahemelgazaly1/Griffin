import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryVideoProps {
  videoSrc: string;
  isVisible: boolean;
  onComplete: () => void;
}

export function CategoryVideo({ videoSrc, isVisible, onComplete }: CategoryVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Only play once when becomes visible
    if (isVisible && !hasPlayed) {
      console.log("Starting video playback");
      setIsPlaying(true);
      setHasPlayed(true);

      // Small delay to ensure video element is mounted
      setTimeout(() => {
        const video = videoRef.current;
        if (!video) {
          console.log("Video element not found");
          return;
        }

        console.log("Attempting to play video");
        
        // Play the video
        video.play().then(() => {
          console.log("Video playing successfully");
        }).catch((error) => {
          console.log("Video play failed:", error);
          // If play fails, complete immediately
          setTimeout(() => {
            setIsPlaying(false);
            onComplete();
          }, 500);
        });
      }, 100);
    }
  }, [isVisible, hasPlayed, onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isPlaying) return;

    // Handle video end
    const handleEnded = () => {
      console.log("Video ended");
      setIsPlaying(false);
      setTimeout(() => {
        onComplete();
      }, 300);
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [isPlaying, onComplete]);

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          className="fixed inset-0 z-50 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
