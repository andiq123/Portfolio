import type { Metadata } from "next";

const siteUrl = "https://andi-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Andrei Ungureanu - Software Engineer",
  description: "Software engineer with 5+ years building scalable cloud-native products. Full-stack focus on backend, cloud, and AI-assisted delivery. Chișinău, Moldova.",
  keywords: ["Andrei Ungureanu", "Software Engineer", "full-stack", "cloud-native", ".NET", "React", "AWS", "LLMs", "Chișinău", "Moldova"],
  authors: [{ name: "Andrei Ungureanu", url: siteUrl }],
  openGraph: {
    title: "Andrei Ungureanu - Software Engineer",
    description: "Full-stack developer · Cloud-native · .NET, Angular, AWS · Chisinau, Moldova",
    url: siteUrl,
    siteName: "Andrei Ungureanu Portfolio",
    type: "website",
  },
};
