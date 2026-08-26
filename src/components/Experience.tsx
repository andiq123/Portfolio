"use client";

import { motion } from "framer-motion";
import { LuBriefcaseBusiness, LuCalendarDays, LuCircleCheck, LuMapPin } from "react-icons/lu";
import SectionHeading from "./SectionHeading";

const experiences = [
  {
    step: "01",
    current: true,
    company: "IRIS Software",
    role: "Software Engineer",
    period: "Oct 2024 - Present",
    location: "Remote, Romania",
    summary: "Own cloud and full-stack delivery across new features and established products, with a focus on reliability and safe modernization.",
    skills: ["React", "Angular", ".NET Core", "AWS", "TypeScript"],
    highlights: [
      "Build event-driven AWS services processing millions of events",
      "Maintain 99.9% availability with sub-100 ms APIs",
      "Upgrade mature repositories through dependency updates and focused refactors",
    ],
  },
  {
    step: "02",
    current: false,
    company: "Darwin Technologies",
    role: "Software Developer",
    period: "May 2022 - Oct 2024",
    location: "Cluj, Romania",
    summary: "Built and improved enterprise financial software with cross-functional teams, balancing product work with long-term maintainability.",
    skills: [".NET", "Angular", "TypeScript", "Financial services"],
    highlights: [
      "Improved application load times by 30%",
      "Modernized existing .NET and Angular applications",
      "Delivered sprint work on time across engineering and product teams",
    ],
  },
  {
    step: "03",
    current: false,
    company: "Terranova, Trilance",
    role: "Junior Software Developer",
    period: "Jul 2019 - Oct 2020",
    location: "Verona, Italy",
    summary: "Delivered full-stack web projects for international clients, working from backend APIs through responsive user interfaces.",
    skills: ["C#", ".NET", "Angular", "REST APIs"],
    highlights: [
      "Shipped 3+ client projects on schedule",
      "Maintained existing applications while adding new features",
      "Contributed to code reviews, bug fixes, and release readiness",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative w-full px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading icon={LuBriefcaseBusiness} eyebrow="Career" title="Work" accent="Experience" />

        <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr_1fr]">
          {experiences.map((experience, index) => (
            <motion.article
              key={`${experience.company}-${experience.period}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className={`group flex h-full flex-col rounded-[1.75rem] p-6 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-md ${experience.current ? "bg-primary/[0.07]" : "bg-background/70 hover:bg-muted/25"}`}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <LuBriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="flex items-center gap-2 font-mono text-xs text-secondary/60">
                  {experience.current && <><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />Now</>}
                  <span>{experience.step}</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground">{experience.role}</h3>
              <p className="mt-1 font-medium text-primary">{experience.company}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-secondary">
                <span className="flex items-center gap-1.5"><LuCalendarDays className="h-3.5 w-3.5 text-primary" aria-hidden="true" />{experience.period}</span>
                <span className="flex items-center gap-1.5"><LuMapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />{experience.location}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-secondary/85">{experience.summary}</p>
              <ul className="my-5 grid gap-2 text-sm text-secondary/90">
                {experience.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2"><LuCircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{highlight}</li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-2">
                {experience.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-muted/60 px-2.5 py-1 text-xs text-secondary">{skill}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
