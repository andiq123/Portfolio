"use client";

import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";
import IntroAnimation from "@/components/IntroAnimation";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased relative`}>
        <IntroAnimation onComplete={() => setIsIntroComplete(true)} />
        <div 
          className={`transition-opacity duration-1000 ${isIntroComplete ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="background-lights" style={{ zIndex: 0 }}>
            <div className="light light-1" />
            <div className="light light-2" />
            <div className="light light-3" />
            <div className="light light-4" />
            <div className="light light-5" />
            <div className="light light-6" />
          </div>
          <div className="min-h-screen bg-gradient-to-b from-background/70 to-muted/70 backdrop-blur-3xl relative" style={{ zIndex: 1 }}>
            <div className="relative" style={{ zIndex: 2 }}>
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
              <Navbar />
              <main className="relative">
                {children}
              </main>
              <Footer />
            </div>
          </div>
          <Particles />
        </div>
      </body>
    </html>
  );
}
