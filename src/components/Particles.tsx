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
    // Check if device is mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Create initial particles with reduced count for mobile
    const particleCount = isMobile ? 20 : 50;
    const initialParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 20 + 15, // Slightly faster movement
      delay: Math.random() * 3,
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
            // Remove blur effect for better performance
          }}
          animate={{
            x: [
              0,
              Math.random() * 50 - 25, // Reduced movement range
              Math.random() * 50 - 25,
              0
            ],
            y: [
              0,
              Math.random() * 50 - 25, // Reduced movement range
              Math.random() * 50 - 25,
              0
            ],
            opacity: [0.2, 0.6, 0.2], // Simplified opacity animation
            scale: [1, 1.2, 1], // Simplified scale animation
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear", // Changed to linear for better performance
            delay: particle.delay,
            times: [0, 0.5, 1], // Simplified keyframes
          }}
        />
      ))}
    </div>
  );
};

export default Particles; 