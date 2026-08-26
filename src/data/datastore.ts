export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    label: string;
    url: string;
  }[];
}

const projects: Project[] = [
  {
    id: '999-scraper',
    name: '999 Scraper',
    description: 'A progressive marketplace search engine with smart filters, ad-quality scoring, alerts, and live currency normalization.',
    image: '/images/999-scraper.jpg',
    tags: ['Angular', 'Go', 'PostgreSQL', 'Redis'],
    links: [
      {
        label: 'Live Demo',
        url: 'https://999scraper.vercel.app/'
      },
      {
        label: 'Source Code',
        url: 'https://github.com/andiq123/999scraper'
      }
    ]
  },
  {
    id: 'reelora',
    name: 'Reelora TV',
    description: 'A cinematic Android TV launcher that combines installed apps with fresh movie discovery.',
    image: '/images/reelora.jpg',
    tags: ['Kotlin', 'Jetpack Compose', 'Android TV', 'TMDB'],
    links: [
      {
        label: 'Download APK',
        url: 'https://github.com/andiq123/reelora/releases/download/latest/ReeloraTV-latest.apk'
      },
      {
        label: 'Source Code',
        url: 'https://github.com/andiq123/reelora'
      }
    ]
  },
  {
    id: 'adbdeck',
    name: 'ADB Deck',
    description: 'A native macOS command center for discovering and managing Android devices over wireless ADB.',
    image: '/images/adb-deck.jpg',
    tags: ['Swift', 'SwiftUI', 'macOS', 'ADB'],
    links: [
      {
        label: 'Download',
        url: 'https://github.com/andiq123/adbdeck/releases/latest'
      },
      {
        label: 'Source Code',
        url: 'https://github.com/andiq123/adbdeck'
      }
    ]
  },
  {
    id: 'adv-international',
    name: 'ADV International',
    description: 'A bilingual transport and logistics website built around clear services, fleet coverage, and lead generation.',
    image: '/images/adv-international.jpg',
    tags: ['Next.js', 'Responsive UI', 'Internationalization', 'SEO'],
    links: [
      {
        label: 'Visit Website',
        url: 'https://www.advinternational.it/'
      }
    ]
  },
  {
    id: 'sky-with-lux',
    name: 'Sky With Lux',
    description: 'A premium flight-deals platform with a polished quote flow for business and first-class travel.',
    image: '/images/sky-with-lux.jpg',
    tags: ['Next.js', 'Responsive UI', 'Booking UX', 'Accessibility'],
    links: [
      {
        label: 'Visit Website',
        url: 'https://skywithlux.com/'
      }
    ]
  },
  {
    id: 'electro-install',
    name: 'Electro Install',
    description: 'A bilingual electrician website with a focused quote flow, service pages, local SEO, and 24/7 emergency contact.',
    image: '/images/electro-install.jpg',
    tags: ['Next.js', 'TypeScript', 'Firebase', 'Responsive UI'],
    links: [
      {
        label: 'Live Demo',
        url: 'https://electro-install.vercel.app/'
      },
      {
        label: 'Source Code',
        url: 'https://github.com/andiq123/ElectroInstall'
      }
    ]
  },
  {
    id: 'p2',
    name: 'Narval',
    description: 'A lead-focused website for photovoltaic, electrical, storage, and EV charging installations in Verona.',
    image: '/images/narval.jpg',
    tags: ['Angular', '.NET', 'Tailwind CSS', 'Responsive UI'],
    links: [
      {
        label: 'Live Demo',
        url: 'https://narval.it'
      }
    ]
  },
  {
    id: 'p6',
    name: 'Serviciul Vamal Verificare auto',
    description: 'POC app that helps users see how many days they can stay in Moldova with a car with foreign number plates.',
    image: '/images/verificare-auto.jpg',
    tags: ['Next.js', 'TypeScript', 'POC', 'Demo'],
    links: [
      {
        label: 'Live Demo',
        url: 'https://verificareauto.vercel.app/'
      },
      {
        label: 'Source Code',
        url: 'https://github.com/andiq123/verificareauto'
      }
    ]
  },
  {
    id: 'p1',
    name: 'FindVibe',
    description: 'A music discovery PWA with regional charts, favorites, and offline listening.',
    image: '/images/find-vibe.jpg',
    tags: ['Angular', '.NET', 'Golang', 'PWA'],
    links: [
      {
        label: 'Live Demo',
        url: 'https://find-vibe.vercel.app/'
      },
      {
        label: 'Source Code',
        url: 'https://github.com/andiq123/FindVibeFrontEnd'
      }
    ]
  }
];

export default function getProjects(): Project[] {
  return projects;
}
