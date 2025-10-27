"use client";

import { useMemo } from "react";

export default function Experience() {
  const calculateDuration = (period: string) => {
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    // Parse the period string
    const parts = period.split(" - ");
    const startPart = parts[0];
    const endPart = parts[1];

    // Parse start date
    const startMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(startPart.split(" ")[0]);
    const startYear = parseInt(startPart.split(" ")[1]);
    startDate = new Date(startYear, startMonth, 1);

    // Parse end date
    if (endPart === "Present") {
      endDate = now;
    } else {
      const endMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(endPart.split(" ")[0]);
      const endYear = parseInt(endPart.split(" ")[1]);
      endDate = new Date(endYear, endMonth, 1);
    }

    // Calculate difference
    const diff = endDate.getTime() - startDate.getTime();
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    
    if (years === 0) {
      return `${months} mos`;
    } else if (months === 0) {
      return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
    } else {
      return `${years} ${years === 1 ? 'yr' : 'yrs'} ${months} mos`;
    }
  };

  const experiences = useMemo(() => [
    {
      company: "IRIS Software Group",
      role: "Software Engineer",
      period: "Oct 2024 - Present",
      location: "Romania · Remote",
      skills: ["Amazon Web Services (AWS)", ".NET Framework", "TypeScript", "Angular"]
    },
    {
      company: "Darwin",
      role: "Software Engineer",
      period: "May 2022 - Oct 2024",
      location: "Cluj, Romania · Remote",
      skills: ["JavaScript", "Angular", "TypeScript", "AWS"]
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
  })), []);

  return (
    <section 
      id="experience" 
      className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      aria-labelledby="experience-heading"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Career</span>
          </div>
          <h2 
            id="experience-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            <span className="gradient-text">Professional Experience</span>
          </h2>
          <p className="text-lg sm:text-xl text-secondary tracking-wide max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my professional journey and technical expertise
          </p>
        </div>

        <div 
          className="space-y-6 sm:space-y-8"
          role="list"
          aria-label="Work experience timeline"
        >
          {experiences.map((exp, index) => (
            <article
              key={index}
              className="card p-5 sm:p-6 space-y-4"
              role="listitem"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-wide">
                    {exp.role}
                  </h3>
                  <p className="text-primary font-medium tracking-wide">{exp.company}</p>
                </div>
                <div className="text-left sm:text-right space-y-0.5">
                  <p className="text-sm sm:text-base text-secondary tracking-wide">{exp.period}</p>
                  <p className="text-xs sm:text-sm text-secondary tracking-wide">{exp.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm sm:text-base text-secondary tracking-wide">
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
              </div>

              <div 
                className="flex flex-wrap gap-1.5 sm:gap-2 pt-2"
                role="list"
                aria-label="Skills and technologies"
              >
                {exp.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1.5 text-xs sm:text-sm bg-muted/80 text-foreground rounded-lg border border-muted hover:border-primary transition-colors tracking-wide"
                    role="listitem"
                    tabIndex={0}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 