"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Intro() {
  const [age, setAge] = useState(0);
  const [experience, setExperience] = useState("");

  useEffect(() => {
    setAge(calculateAge(new Date(1997, 8, 7)));
    setExperience(calculateExperience(new Date(2020, 5, 1))); // June 1st, 2020
  }, []);

  const calculateAge = (dob: Date) => {
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const calculateExperience = (startDate: Date) => {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    
    if (years === 0) {
      return `${months} months`;
    } else if (months === 0) {
      return `${years} years`;
    } else {
      return `${years} years and ${months} months`;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardVariants = {
    ...itemVariants,
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl w-full space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center space-y-6" variants={itemVariants}>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground"
            variants={itemVariants}
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">Andrei Ungureanu</span>
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-secondary"
            variants={itemVariants}
          >
            Full Stack Software Engineer
          </motion.p>
          <motion.p
            className="text-lg text-secondary"
            variants={itemVariants}
          >
            {age} years old • {experience} of professional experience
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={itemVariants}
        >
          <motion.div
            className="card p-6 space-y-4 bg-gradient-to-br from-background to-muted border border-muted/50"
            variants={cardVariants}
            whileHover="hover"
          >
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Core Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "TypeScript",
                "Go",
                "C#",
                "SQL",
                "HTML/CSS"
              ].map((lang, index) => (
                <motion.span
                  key={lang}
                  className="px-3 py-1.5 text-sm bg-background/50 text-foreground rounded-lg border border-muted/50 hover:border-primary/50 transition-colors"
                  variants={tagVariants}
                  custom={index}
                  whileHover="hover"
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="card p-6 space-y-4 bg-gradient-to-br from-background to-muted border border-muted/50"
            variants={cardVariants}
            whileHover="hover"
          >
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Technical Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Go Fiber",
                "Gin",
                "Next.js",
                "React",
                "Angular",
                ".NET Core",
                "Docker",
                "Git",
                "AWS Lambda",
                "EventBridge",
                "SQS/SNS",
                "Terraform"
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1.5 text-sm bg-background/50 text-foreground rounded-lg border border-muted/50 hover:border-primary/50 transition-colors"
                  variants={tagVariants}
                  custom={index}
                  whileHover="hover"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          variants={itemVariants}
        >
          <motion.a
            href="#projects"
            className="btn inline-flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            View My Portfolio
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
