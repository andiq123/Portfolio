"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Intro() {
  const [age, setAge] = useState(0);
  const [experience, setExperience] = useState("");
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
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
      
      if (years === 0) return `${months} months`;
      if (months === 0) return `${years} years`;
      return `${years} years and ${months} months`;
    };

    setAge(calculateAge(new Date(1997, 8, 7)));
    setExperience(calculateExperience(new Date(2020, 5, 1)));
  }, []);

  return (
    <section id="home" className="min-h-[90vh] flex items-center justify-center relative overflow-hidden px-4 py-10 lg:py-20">
      {/* Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-20 right-[10%] w-72 h-72 bg-primary/20 rounded-full blur-[100px] z-0"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-20 left-[10%] w-96 h-96 bg-accent/20 rounded-full blur-[100px] z-0"
      />

      <div className="max-w-6xl w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="block text-foreground">Software</span>
              <span className="text-gradient">Engineer.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-secondary max-w-lg leading-relaxed pt-2">
              Building robust, scalable web applications with a focus on code quality and user experience.
            </p>
            
            <div className="pt-4 flex flex-wrap gap-4 text-sm font-medium text-secondary">
              <div className="flex items-center gap-2">
                <span className="text-primary text-lg">★</span>
                {age} Years Old
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary text-lg">★</span>
                {experience} Experience
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#projects" className="btn group relative overflow-hidden px-8 py-4 rounded-xl text-white font-semibold text-lg hover:scale-105 active:scale-95 transition-all">
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a href="#contact" className="px-8 py-4 rounded-xl border border-muted bg-background/50 backdrop-blur-sm text-foreground font-semibold text-lg hover:border-primary/50 hover:bg-muted/50 transition-all flex items-center gap-2 group">
              Contact Me
              <svg className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Visual/Decoration (Right Side) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 glass rounded-3xl p-8 border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent rounded-full opacity-20 blur-2xl animate-pulse"></div>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-xs text-secondary font-mono">portfolio.ts</div>
            </div>
            
            <div className="space-y-4 font-mono text-sm">
              <div className="flex gap-4">
                <span className="text-secondary w-6">1</span>
                <span className="text-accent">const</span> <span className="text-yellow-400">developer</span> = <span className="text-accent">{`{`}</span>
              </div>
              <div className="flex gap-4">
                <span className="text-secondary w-6">2</span>
                <span className="pl-6 text-foreground">name:</span> <span className="text-green-400">'Andrei'</span>,
              </div>
              <div className="flex gap-4">
                <span className="text-secondary w-6">3</span>
                <span className="pl-6 text-foreground">role:</span> <span className="text-green-400">'Software Engineer'</span>,
              </div>
              <div className="flex gap-4">
                <span className="text-secondary w-6">4</span>
                <span className="pl-6 text-foreground">passion:</span> <span className="text-green-400">'Building Awesome Things'</span>,
              </div>
              <div className="flex gap-4">
                <span className="text-secondary w-6">5</span>
                <span className="pl-6 text-foreground">stack:</span> <span className="text-accent">[</span>
              </div>
              <div className="flex gap-4">
                <span className="text-secondary w-6">6</span>
                <span className="pl-12 text-green-400">'Next.js'</span>, <span className="text-green-400">'React'</span>, <span className="text-green-400">'Go'</span>
              </div>
              <div className="flex gap-4">
                <span className="text-secondary w-6">7</span>
                <span className="pl-6 text-accent">]</span>
              </div>
              <div className="flex gap-4">
                <span className="text-secondary w-6">8</span>
                <span className="text-accent">{`}`}</span>;
              </div>
            </div>
          </div>
          
          {/* Floating badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 -left-8 glass px-4 py-2 rounded-lg text-sm font-medium text-foreground border border-white/10 shadow-lg flex items-center gap-2"
          >
            Running on fast forward 🚀
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
