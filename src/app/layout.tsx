import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Andrei Ungureanu - Software Engineer",
  description: "Professional portfolio of Andrei Ungureanu, a Software Engineer specializing in full-stack development, cloud technologies, and enterprise solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <div className="background-lights" style={{ zIndex: 0 }}>
          <div className="light light-1" />
          <div className="light light-2" />
          <div className="light light-3" />
          <div className="light light-4" />
          <div className="light light-5" />
          <div className="light light-6" />
        </div>
        <div className="min-h-screen bg-gradient-to-b from-background/70 to-muted/70 backdrop-blur-3xl" style={{ zIndex: 1 }}>
          <div className="relative" style={{ zIndex: 2 }}>
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
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
