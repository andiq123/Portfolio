"use client";

import Intro from "@/components/Intro";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import IntroAnimation from "@/components/IntroAnimation";
import { useState } from "react";

export default function Home() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <IntroAnimation onComplete={() => setIsIntroComplete(true)} />
      {isIntroComplete && (
        <>
          <Intro />
          <Experience />
          <Projects />
          <Contact />
        </>
      )}
    </main>
  );
}
