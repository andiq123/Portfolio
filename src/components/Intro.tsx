"use client";
import { useState, useEffect } from "react";

export default function Intro() {
  const [age, setAge] = useState(0);
  const [experience, setExperience] = useState("");

  useEffect(() => {
    setAge(calculateAge(new Date(1997, 8, 7)));
    setExperience(calculateExperience(new Date(2020, 5, 1))); // June 1st, 2020
  }, []);

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

  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-4xl w-full space-y-8 relative">
        <div className="text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
            Hi, I&apos;m{" "}
            <span className="relative inline-block">
              <span className="gradient-text tracking-normal">Andrei Ungureanu</span>
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full" />
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-secondary font-medium tracking-wide">
            Full Stack Software Engineer
          </p>
          <p className="text-base sm:text-lg text-secondary/80 tracking-wide">
            {age} years old • {experience} of professional experience
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <div className="card p-4 sm:p-6 space-y-3 sm:space-y-4 bg-gradient-to-br from-background/95 to-muted/50 border border-muted/50 hover:border-primary/50 transition-colors duration-200 shadow-lg">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 tracking-wide">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Core Technologies
            </h2>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[
                "TypeScript",
                "Go",
                "C#",
                "SQL",
                "HTML/CSS"
              ].map((lang) => (
                <span
                  key={lang}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-background/50 text-foreground rounded-lg border border-muted/50 hover:border-primary/50 transition-colors tracking-wide"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="card p-4 sm:p-6 space-y-3 sm:space-y-4 bg-gradient-to-br from-background/95 to-muted/50 border border-muted/50 hover:border-primary/50 transition-colors duration-200 shadow-lg">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 tracking-wide">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Technical Stack
            </h2>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
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
                  className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-background/50 text-foreground rounded-lg border border-muted/50 hover:border-primary/50 transition-colors tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#projects"
            className="btn inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white shadow-lg hover:shadow-primary/25 transition-colors duration-200 tracking-wide"
          >
            View My Portfolio
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
