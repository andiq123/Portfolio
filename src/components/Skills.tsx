"use client";
import React from "react";
import { motion } from "framer-motion";

const skills = [
  "Angular", "React", "TypeScript", ".NET", "C#", "Golang",
  "AWS", "Lambda", "SNS", "SQS", "SQL Server", "PostgreSQL",
  "Entity Framework", "Docker", "Git", "CI/CD", "REST APIs",
  "Agile", "TDD", "Clean Code", "UI/UX",
];

export default function Skills() {
  return (
    <section id="skills" className="pt-16 pb-8 md:pt-20 md:pb-10 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-primary/20 bg-primary/5">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Technical</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-10">
            <span className="text-foreground">Skills</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-secondary text-center max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Full-stack with a backend and cloud focus — from <span className="text-foreground font-medium">Angular & React</span> UIs to <span className="text-foreground font-medium">.NET & Golang</span> APIs, <span className="text-foreground font-medium">AWS</span> and databases, shipped with <span className="text-foreground font-medium">Docker</span> and <span className="text-foreground font-medium">CI/CD</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3"
        >
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.02 * i, duration: 0.3 }}
              className="px-3 py-1.5 text-sm rounded-full bg-muted/40 text-secondary border border-white/5 hover:border-primary/30 hover:text-foreground transition-colors cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
