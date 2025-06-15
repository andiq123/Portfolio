"use client";

import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased relative`}>
        <div className="min-h-screen relative">
          {/* Background gradients */}
          <div className="fixed inset-0 bg-gradient-to-b from-white via-white/95 to-slate-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800" />
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-blue-500/5 to-transparent opacity-70" />
          
          {/* Grid pattern */}
          <div className="fixed inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.03]" />
          
          {/* Content */}
          <div className="relative" style={{ zIndex: 2 }}>
            <Navbar />
            <main className="relative">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
