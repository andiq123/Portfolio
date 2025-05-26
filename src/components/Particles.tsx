"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Particles = () => {
  const [particles, setParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    size: number; 
    duration: number; 
    delay: number; 
  }>>([]);

  useEffect(() => {
    // Create initial particles
    const initialParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 30 + 20, // Slightly faster movement
      delay: Math.random() * 5,
    }));
    setParticles(initialParticles);
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden" 
      style={{ 
        zIndex: 5,
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: 'var(--primary)',
            filter: 'blur(0.5px)',
          }}
          animate={{
            x: [
              0,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              0
            ],
            y: [
              0,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              0
            ],
            opacity: [0.2, 0.8, 0.4, 0.8, 0.4, 0.2],
            scale: [1, 1.5, 1, 1.5, 1, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          }}
        />
      ))}
    </div>
  );
};

export default Particles; 