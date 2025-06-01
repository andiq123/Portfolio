"use client";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { createContainerVariants, createItemVariants, createCardVariants } from "@/constants/animations";

export default function Experience() {
  const isMobile = useIsMobile();

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

  return (
    <section 
      id="experience" 
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
      aria-labelledby="experience-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        variants={createContainerVariants(isMobile)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="text-center mb-16" variants={createItemVariants(isMobile)}>
          <h2 
            id="experience-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight"
          >
            Professional Experience
          </h2>
          <p className="text-xl text-secondary tracking-wide max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of my professional journey and technical expertise
          </p>
        </motion.div>

        <motion.div 
          className="space-y-6 sm:space-y-8"
          role="list"
          aria-label="Work experience timeline"
        >
          {experiences.map((exp, index) => (
            <motion.article
              key={index}
              className="card p-5 sm:p-6 space-y-4 bg-gradient-to-br from-background/95 to-muted/50 backdrop-blur-sm border border-muted/50 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl"
              variants={createCardVariants(isMobile)}
              custom={index}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              role="listitem"
            >
              <motion.div 
                className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4"
                variants={createItemVariants(isMobile)}
              >
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-wide">
                    {exp.role}
                  </h3>
                  <p className="text-primary font-medium tracking-wide">{exp.company}</p>
                </div>
                <div className="text-left sm:text-right space-y-0.5">
                  <p className="text-sm sm:text-base text-secondary tracking-wide">{exp.period}</p>
                  <p className="text-xs sm:text-sm text-secondary/80 tracking-wide">{exp.duration}</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-2 text-sm sm:text-base text-secondary/80 tracking-wide"
                variants={createItemVariants(isMobile)}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
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
                className="flex flex-wrap gap-1.5 sm:gap-2 pt-2"
                variants={createItemVariants(isMobile)}
                role="list"
                aria-label="Skills and technologies"
              >
                {exp.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-background/50 text-foreground rounded-lg border border-muted/50 hover:border-primary/50 transition-colors tracking-wide hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                    variants={skillVariants}
                    custom={skillIndex}
                    whileHover="hover"
                    role="listitem"
                    tabIndex={0}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
} 