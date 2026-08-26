import type { Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { metadata } from "./metadata";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export { metadata };

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} relative overflow-x-hidden bg-background font-sans text-foreground antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <div className="fixed inset-0 -z-20 bg-background" />
        <div className="fixed inset-0 -z-10 bg-premium-gradient opacity-80" />
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-purple-500/15 blur-[100px] animate-float" />
          <div className="absolute -right-[10%] top-[20%] h-[35%] w-[35%] rounded-full bg-blue-500/15 blur-[100px] animate-float-delayed" />
          <div className="absolute -bottom-[10%] left-[20%] h-[40%] w-[40%] rounded-full bg-pink-500/10 blur-[100px] animate-float" />
        </div>
        <Navbar />
        <main id="main-content" className="relative flex w-full flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
