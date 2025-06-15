"use client";

import Intro from "@/components/Intro";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Intro />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}