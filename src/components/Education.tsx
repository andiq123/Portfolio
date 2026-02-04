"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Education() {
  return (
    <section id="education" className="pt-16 pb-8 md:pt-20 md:pb-10 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-primary/20 bg-primary/5">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Background</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-10">
            <span className="text-foreground">Education</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-10 border border-white/10 text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Bachelor of Science in Computer Science
          </h3>
          <p className="text-lg text-primary font-medium mb-1">
            Universitatea Ovidius Din Constanța
          </p>
          <p className="text-secondary">
            Constanța, Romania · July 2023
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            Full-time studies 2020–2023
          </p>
        </motion.div>
      </div>
    </section>
  );
}
