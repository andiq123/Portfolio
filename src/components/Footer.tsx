"use client";

export default function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-secondary/60 relative z-10 glass border-t-0 border-t-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <p>
          &copy; {new Date().getFullYear()} Andrei Ungureanu. All rights reserved.
        </p>
        <p className="mt-2 text-xs">
          Built with <span className="text-primary">Next.js</span>, <span className="text-primary">Tailwind CSS</span> & <span className="text-primary">Framer Motion</span>.
        </p>
      </div>
    </footer>
  );
}
