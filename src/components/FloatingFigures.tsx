"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function FloatingFigures() {
  const isMobile = useIsMobile();

  const figures = isMobile ? [
    { size: 80, color: 'rgba(var(--primary-rgb), 0.3)', delay: 0, duration: 15 },
    { size: 60, color: 'rgba(var(--muted-rgb), 0.3)', delay: 2, duration: 18 },
  ] : [
    { size: 120, color: 'rgba(var(--primary-rgb), 0.3)', delay: 0, duration: 20 },
    { size: 100, color: 'rgba(var(--muted-rgb), 0.3)', delay: 2, duration: 25 },
    { size: 160, color: 'rgba(var(--primary-rgb), 0.3)', delay: 4, duration: 30 },
    { size: 140, color: 'rgba(var(--muted-rgb), 0.3)', delay: 6, duration: 22 },
    { size: 180, color: 'rgba(var(--primary-rgb), 0.3)', delay: 8, duration: 28 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {figures.map((figure, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-2xl opacity-40"
          style={{
            width: figure.size,
            height: figure.size,
            backgroundColor: figure.color,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [
              Math.random() * 30 - 15 + '%',
              Math.random() * 30 - 15 + '%',
              Math.random() * 30 - 15 + '%',
            ],
            y: [
              Math.random() * 30 - 15 + '%',
              Math.random() * 30 - 15 + '%',
              Math.random() * 30 - 15 + '%',
            ],
          }}
          transition={{
            duration: figure.duration,
            repeat: Infinity,
            ease: "linear",
            delay: figure.delay,
          }}
        />
      ))}
    </div>
  );
} 