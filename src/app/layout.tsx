"use client";

import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter, Outfit } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased relative overflow-x-hidden bg-background text-foreground`}>
        <div className="min-h-screen relative">
          {/* Detailed Dark Background */}
          <div className="fixed inset-0 bg-background z-[-2]" />
          <div className="fixed inset-0 bg-premium-gradient opacity-80 z-[-1]" />
          
          {/* Animated Ambient Light */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[100px] animate-float" />
            <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-blue-500/20 rounded-full blur-[100px] animate-float-delayed" />
            <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-[100px] animate-float" />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <Navbar />
            <main className="relative flex flex-col items-center px-4">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
