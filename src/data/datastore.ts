export default function getProjects(): Project[] {
  return [
    {
      id: "p1",
      name: "Muz-X",
      description: "A web appp for searching and downloading songs.",
      image: "/images/muz-x.jpeg",
      url: "https://muz-x.vercel.app/",
      github: "https://github.com/andiq123/MuzPreviewNextjsFront",
      tags: ["Next.js", "NestJs", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "p2",
      name: "Chator",
      description:
        "A web app for chatting with friends. Visit github for readme",
      image: "/images/chator.jpeg",
      url: "https://chator-andyu789.b4a.run/",
      github: "https://github.com/andiq123/Chator",
      tags: ["Angular", "Dotnet", "TypeScript", "Bootstrap"],
    },
    {
      id: "p3",
      name: "Device Manager",
      description: "A web app for managing devices. Visit github for readme",
      image: "/images/device-manager.jpeg",
      url: "https://devicemanager-andyu789.b4a.run/",
      github: "https://github.com/andiq123/device-manager",
      tags: ["Angular", "Dotnet", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "p4",
      name: "Car Sell Presentation Website",
      description: "A website for a car selling company.",
      image: "/images/car-sell.jpeg",
      url: "https://bucurel-auto.it/",
      github: "https://github.com/andiq123/bucurel",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
  ];
}
