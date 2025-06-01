"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotateX: -90,
      letterSpacing: "-10px",
      filter: "blur(10px)"
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      letterSpacing: "0px",
      filter: "blur(0px)",
      transition: {
        delay: 0.4 + (i * 0.03),
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      }
    })
  };

  const devVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.5,
      rotate: -10,
      x: -20,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      x: 0,
      filter: "blur(0px)",
      transition: {
        delay: 1.4,
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      }
    }
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeIn"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backgroundVariants}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 to-muted/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          />
          <motion.div
            className="relative flex items-center justify-center"
            animate={{
              scale: [1, 1.02, 1.05],
              rotate: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              times: [0, 0.8, 1],
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {"Andrei Ungureanu".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-4xl font-bold text-white"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
              <motion.div
                className="text-4xl font-bold text-primary"
                variants={devVariants}
                initial="hidden"
                animate="visible"
              >
                Dev
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="absolute bottom-8 text-secondary/50 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            Software Engineer
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 