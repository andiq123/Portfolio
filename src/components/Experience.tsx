import React from "react";

type Props = {};

export default function Experience({}: Props) {
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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-secondary">
            A journey through my professional growth and achievements
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="card p-6 space-y-4 bg-gradient-to-br from-background to-muted border border-muted/50 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
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
              </div>

              <div className="flex items-center gap-2 text-secondary">
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
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {exp.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1.5 text-sm bg-background/50 text-foreground rounded-lg border border-muted/50 hover:border-primary/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 