"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {};

export default function Experience({}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: isMobile ? 0.1 : 0.2,
        duration: isMobile ? 0.4 : 0.6,
        ease: "linear",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: "linear",
      },
    },
  };

  const cardVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: isMobile ? 0 : (index % 2 === 0 ? -30 : 30),
      y: isMobile ? 10 : 20,
    }),
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.8,
        ease: "linear",
        delay: index * (isMobile ? 0.05 : 0.1),
      },
    }),
    hover: {
      y: isMobile ? -3 : -5,
      transition: {
        duration: 0.2,
        ease: "linear",
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: index * (isMobile ? 0.03 : 0.05),
        ease: "linear",
      },
    }),
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.2,
        ease: "linear",
      },
    },
  };

  const experiences = [
    {
      company: "IRIS Software Group",
      role: "Software Engineer",
      period: "Oct 2024 - Present",
      duration: "8 mos",
      location: "Romania · Remote",
      skills: ["Amazon Web Services (AWS)", ".NET Framework", "TypeScript", "Angular"]
    },
    {
      company: "Darwin",
      role: "Software Engineer",
      period: "May 2022 - Oct 2024",
      duration: "2 yrs 6 mos",
      location: "Cluj, Romania · Remote",
      skills: ["JavaScript", "Angular", "TypeScript", "AWS"]
    },
    {
      company: "Terranova Software",
      role: "Jr. Developer",
      period: "Jul 2019 - Sep 2020",
      duration: "1 yr 3 mos",
      location: "Greater Verona Metropolitan Area",
      skills: ["C#", ".NET", "SQL", "JavaScript"]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-secondary">
            A comprehensive overview of my professional journey and technical expertise
          </p>
        </motion.div>

        <motion.div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="card p-6 space-y-4 bg-gradient-to-br from-background to-muted border border-muted/50 hover:border-primary/50 transition-all duration-300"
              variants={cardVariants}
              custom={index}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div 
                className="flex items-start justify-between"
                variants={itemVariants}
              >
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {exp.role}
                  </h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-secondary">{exp.period}</p>
                  <p className="text-sm text-secondary">{exp.duration}</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-2 text-secondary"
                variants={itemVariants}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{exp.location}</span>
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-2 pt-2"
                variants={itemVariants}
              >
                {exp.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="px-3 py-1.5 text-sm bg-background/50 text-foreground rounded-lg border border-muted/50 hover:border-primary/50 transition-colors"
                    variants={skillVariants}
                    custom={skillIndex}
                    whileHover="hover"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
} 