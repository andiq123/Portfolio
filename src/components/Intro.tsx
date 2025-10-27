"use client";
import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/utils/useAnimation";

export default function Intro() {
  const [age, setAge] = useState(0);
  const [experience, setExperience] = useState("");
  const { ref, isVisible } = useScrollAnimation(0.01);

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
      
      if (years === 0) {
        return `${months} months`;
      } else if (months === 0) {
        return `${years} years`;
      } else {
        return `${years} years and ${months} months`;
      }
    };

    setAge(calculateAge(new Date(1997, 8, 7)));
    setExperience(calculateExperience(new Date(2020, 5, 1)));
  }, []);

  return (
    <section 
      ref={ref}
      id="home" 
      className={`min-h-screen flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8 relative transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-5xl w-full space-y-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-medium text-primary tracking-wide uppercase">Software Engineer</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight pb-1">
              Hi, I&apos;m{" "}
              <span className="relative inline-block">
                <span className="gradient-text tracking-normal">
                  Andrei Ungureanu
                </span>
                <div className="absolute -bottom-3 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent rounded-full shadow-lg" />
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl text-foreground/90 font-semibold tracking-tight max-w-3xl mx-auto">
              Building scalable web applications with modern technologies
            </p>
            <p className="text-lg sm:text-xl text-secondary/90 tracking-wide">
              {age} years old • {experience} of professional experience
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <a
              href="#projects"
              className="btn inline-flex items-center justify-center text-white shadow-xl hover:shadow-2xl glow-hover tracking-wide text-lg px-10 py-4 rounded-xl font-semibold group"
            >
              View My Work
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md tracking-wide"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Tech Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6 space-y-4 group hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-foreground tracking-wide">
                Core Technologies
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "TypeScript",
                "Go",
                "C#",
                "SQL",
                "HTML/CSS"
              ].map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1.5 text-sm bg-muted/80 text-foreground rounded-lg border border-muted hover:border-primary transition-colors"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="card p-6 space-y-4 group hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-foreground tracking-wide">
                Technical Stack
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Go Fiber",
                "Gin",
                "Next.js",
                "React",
                "Angular",
                ".NET Core",
                "Docker",
                "Git",
                "AWS Lambda",
                "EventBridge",
                "SQS/SNS",
                "Terraform"
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm bg-muted/80 text-foreground rounded-lg border border-muted hover:border-primary transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
