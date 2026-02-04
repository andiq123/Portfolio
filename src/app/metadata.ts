import type { Metadata } from "next";

const siteUrl = "https://andi-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Andrei Ungureanu - Software Engineer",
  description: "Software developer with 5+ years building scalable cloud-native applications. Full-stack focus on backend and cloud delivery. Chisinau, Moldova.",
  keywords: ["Andrei Ungureanu", "Software Engineer", "full-stack", "cloud-native", ".NET", "Angular", "AWS", "Chisinau", "Moldova"],
  authors: [{ name: "Andrei Ungureanu", url: siteUrl }],
  openGraph: {
    title: "Andrei Ungureanu - Software Engineer",
    description: "Full-stack developer · Cloud-native · .NET, Angular, AWS · Chisinau, Moldova",
    url: siteUrl,
    siteName: "Andrei Ungureanu Portfolio",
    type: "website",
  },
}; 