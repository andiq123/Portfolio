"use client";
import React from 'react';
import { motion } from "framer-motion";

export default function Experience() {
  const calculateDuration = (period: string) => {
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    const parts = period.split(" - ");
    const startPart = parts[0];
    const endPart = parts[1];

    const startMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(startPart.split(" ")[0]);
    const startYear = parseInt(startPart.split(" ")[1]);
    startDate = new Date(startYear, startMonth, 1);

    if (endPart === "Present") {
      endDate = now;
    } else {
      const endMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(endPart.split(" ")[0]);
      const endYear = parseInt(endPart.split(" ")[1]);
      endDate = new Date(endYear, endMonth, 1);
    }

    const diff = endDate.getTime() - startDate.getTime();
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    
    if (years === 0) return `${months} mos`;
    if (months === 0) return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
    return `${years} ${years === 1 ? 'yr' : 'yrs'} ${months} mos`;
  };

  const experiences = [
    {
      company: "IRIS Software Group",
      role: "Software Engineer",
      period: "Oct 2024 - Present",
      location: "Romania · Remote",
      skills: ["React", "Next.js", "TypeScript", "Angular", ".NET Framework", "Amazon Web Services (AWS)"]
    },
    {
      company: "Darwin",
      role: "Software Engineer",
      period: "May 2022 - Oct 2024",
      location: "Cluj, Romania · Remote",
      skills: ["React", "Next.js", "JavaScript", "TypeScript", "Angular", "AWS"]
    },
    {
      company: "Terranova Software",
      role: "Jr. Developer",
      period: "Jul 2019 - Sep 2020",
      location: "Greater Verona Metropolitan Area",
      skills: ["C#", ".NET", "SQL", "JavaScript"]
    }
  ].map(exp => ({
    ...exp,
    duration: calculateDuration(exp.period)
  }));

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
           <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-primary/20 bg-primary/5">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Career</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Work </span>
            <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted before:to-transparent">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Timeline Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-muted bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-primary transition-colors">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl border border-muted/50 bg-background/50 backdrop-blur-sm hover:bg-muted/30 transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                <div className="flex flex-col gap-2 mb-4">
                   <div className="flex justify-between items-start">
                     <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                     <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">{exp.period}</span>
                   </div>
                   <div className="text-lg font-medium text-secondary">{exp.company}</div>
                   <div className="text-sm text-muted-foreground flex items-center gap-1">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                     {exp.location}
                   </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-secondary/10 text-secondary border border-transparent hover:border-primary/20 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}