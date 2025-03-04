import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Andi's Portfolio",
  description: "Resume Andrei",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Image
          src="/images/bg-main.jpg"
          alt="bg"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full fixed top-0 left-0 -z-10 blur-sm scale-105"
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
