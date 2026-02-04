import type { Viewport } from "next";
import "./globals.css";
import { metadata } from "./metadata";
import ClientLayout from "./ClientLayout";

export { metadata };

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
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}
