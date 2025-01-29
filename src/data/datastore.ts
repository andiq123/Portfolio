export default function getProjects(): Project[] {
  return [
    {
      id: 'p1',
      name: 'Chator',
      description:
        'A web app for chatting with friends. Users to test:user1 Password1@ user2 Password1@',
      image: '/images/chator.jpeg',
      url: 'https://chator-andyu789.b4a.run/',
      github: 'https://github.com/andiq123/Chator',
      tags: ['Angular', 'Dotnet', 'TypeScript', 'Bootstrap'],
    },
    {
      id: 'p2',
      name: 'FindVibe',
      description:
        "A PWA web for mobile. Let's your find music, add to favorites and listen offline.",
      image: '/images/find-vibe.png',
      url: 'https://find-vibe.vercel.app/',
      github: 'https://github.com/andiq123/FindVibeFrontEnd',
      tags: ['Angular', 'Dotnet', 'Golang', 'Tailwind'],
    },
    {
      id: 'p3',
      name: 'Device Manager',
      description: 'A web app for managing devices. Visit github for readme',
      image: '/images/device-manager.jpeg',
      url: 'https://devicemanager-andyu789.b4a.run/',
      github: 'https://github.com/andiq123/device-manager',
      tags: ['Angular', 'Dotnet', 'TypeScript', 'Tailwind CSS'],
    },
    {
      id: 'p4',
      name: 'Car Sell Presentation Website',
      description: 'A website for a car selling company.',
      image: '/images/car-sell.jpeg',
      url: 'https://bucurel-auto.it/',
      github: 'https://github.com/andiq123/bucurel',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      id: 'p5',
      name: 'Bam-Traslochi',
      description: 'A website for a moving company',
      image: '/images/bam-traslochi.png',
      url: 'https://bam-traslochi-numxvw4hj-andiq123.vercel.app/',
      github: 'https://github.com/andiq123/bam-traslochi',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    },
  ];
}
