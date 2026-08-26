"use client";

import { motion } from "framer-motion";
import { LuCloud, LuCodeXml, LuPackageCheck, LuServerCog, LuSparkles, LuWorkflow } from "react-icons/lu";
import SectionHeading from "./SectionHeading";

const groups = [
  { title: "Frontend", icon: LuCodeXml, skills: ["Angular", "React", "TypeScript", "Tailwind CSS", "UI/UX"] },
  { title: "Backend", icon: LuServerCog, skills: [".NET", "C#", "Golang", "REST APIs", "Entity Framework"] },
  { title: "Cloud & Data", icon: LuCloud, skills: ["AWS", "Lambda", "SNS", "SQS", "SQL Server", "PostgreSQL"] },
  { title: "Delivery", icon: LuWorkflow, skills: ["Docker", "Git", "GitHub Actions", "CI/CD", "Railway", "Render", "Vercel", "TDD"] },
];

export default function Skills() {
  return (
    <section id="skills" className="relative w-full px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading icon={LuSparkles} eyebrow="Technical" title="Skills" description="Full-stack delivery with a backend and cloud focus." />
        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-[8%] right-[8%] top-10 hidden h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent lg:block" aria-hidden="true">
            <span className="skill-flow absolute -top-1 h-2 w-2 rounded-full bg-primary" />
          </div>
          {groups.map(({ title, icon: Icon, skills }, index) => (
            <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: index * 0.05 }} className="relative z-10 rounded-[1.5rem] bg-background/75 p-5 shadow-sm backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <h3 className="font-bold text-foreground">{title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => <span key={skill} className="rounded-full bg-muted/60 px-2.5 py-1 text-xs text-secondary">{skill}</span>)}
              </div>
            </motion.article>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.4 }} className="mx-auto mt-7 flex w-fit items-center gap-2.5 rounded-full bg-primary/10 px-4 py-2.5 text-sm font-semibold text-foreground">
          <LuPackageCheck className="h-5 w-5 text-primary" aria-hidden="true" />
          One stack. One useful product.
        </motion.div>
      </div>
    </section>
  );
}
