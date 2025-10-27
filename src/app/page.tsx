"use client";

import Intro from "@/components/Intro";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Intro />
      <div className="border-t border-muted/50" />
      <Experience />
      <div className="border-t border-muted/50" />
      <Projects />
      <div className="border-t border-muted/50" />
      <Contact />
    </main>
  );
}