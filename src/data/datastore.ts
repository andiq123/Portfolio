export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    label: string;
    url: string;
    icon?: string;
  }[];
}

const projects: Project[] = [
  {
    id: 'p5',
    name: 'Bam-Traslochi',
    description: 'A website for a moving company',
    image: '/images/bam-traslochi.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    links: [
      {
        label: 'Live Demo',
        url: 'https://bam-traslochi-numxvw4hj-andiq123.vercel.app/',
        icon: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
      },
      {
        label: 'Source Code',
        url: 'https://github.com/andiq123/bam-traslochi',
        icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
      }
    ]
  },
  {
    id: 'p2',
    name: 'Narval',
    description: 'A company that sells the service to install solar panels',
    image: '/images/narval.png',
    tags: ['Angular', 'Dotnet', 'Tailwind'],
    links: [
      {
        label: 'Live Demo',
        url: 'https://narval.it',
        icon: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
      }
    ]
  },
  {
    id: 'p6',
    name: 'Serviciul Vamal Verificare auto',
    description: 'A POC app that helps users the see how many days they can stay in moldova with a car with foreigns number plates',
    image: '/images/verificare-auto.png',
    tags: ['Next.js', 'TypeScript', 'POC', 'Demo'],
    links: [
      {
        label: 'Live Demo',
        url: 'https://verificareauto.vercel.app/',
        icon: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
      },
      {
        label: 'Source Code',
        url: 'https://github.com/andiq123/verificareauto',
        icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
      }
    ]
  },
  {
    id: 'p1',
    name: 'FindVibe',
    description: "A PWA web for mobile. Let's your find music, add to favorites and listen offline.",
    image: '/images/find-vibe.png',
    tags: ['Angular', 'Dotnet', 'Golang', 'Tailwind'],
    links: [
      {
        label: 'Live Demo',
        url: 'https://find-vibe.vercel.app/',
        icon: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
      },
      {
        label: 'Source Code',
        url: 'https://github.com/andiq123/FindVibeFrontEnd',
        icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
      }
    ]
  },
  {
    id: 'p4',
    name: 'Device Manager',
    description: 'A web app for managing devices. Visit github for readme',
    image: '/images/device-manager.jpeg',
    tags: ['Angular', 'Dotnet', 'TypeScript', 'Tailwind CSS'],
    links: [
      {
        label: 'Live Demo',
        url: 'https://devicemanager-andyu789.b4a.run/',
        icon: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
      },
      {
        label: 'Source Code',
        url: 'https://github.com/andiq123/device-manager',
        icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
      }
    ]
  },
  {
    id: 'p3',
    name: 'Chator',
    description: 'A web app for chatting with friends. Users to test: user1 Password1@ user2 Password1@',
    image: '/images/chator.jpeg',
    tags: ['Angular', 'Dotnet', 'TypeScript', 'Bootstrap'],
    links: [
      {
        label: 'Live Demo',
        url: 'https://chator-andyu789.b4a.run/',
        icon: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
      },
      {
        label: 'Source Code',
        url: 'https://github.com/andiq123/Chator',
        icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
      }
    ]
  }
];

export default function getProjects(): Project[] {
  return projects;
}
