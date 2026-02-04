"use client";

import Navbar from "@/components/Navbar";
import { Inter, Outfit } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={`${inter.variable} ${outfit.variable} font-sans antialiased relative overflow-x-hidden bg-background text-foreground`}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-white focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Skip to main content
      </a>
      <div className="min-h-screen relative">
        <div className="fixed inset-0 bg-background z-[-2]" />
        <div className="fixed inset-0 bg-premium-gradient opacity-80 z-[-1]" />
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[100px] animate-float" />
          <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-blue-500/20 rounded-full blur-[100px] animate-float-delayed" />
          <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-[100px] animate-float" />
        </div>
        <div className="relative z-10">
          <Navbar />
          <main id="main-content" className="relative flex flex-col items-center px-4" role="main">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </body>
  );
}
