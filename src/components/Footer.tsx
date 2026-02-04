"use client";

export default function Footer() {
  return (
    <footer className="py-8 md:py-10 text-center text-sm text-secondary/60 relative z-10 glass border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
          <a href="mailto:andrei.ungureanu.work@gmail.com" className="text-secondary hover:text-primary transition-colors">Email</a>
          <a href="tel:+37369683989" className="text-secondary hover:text-primary transition-colors">+373 696 839 89</a>
          <a href="https://www.linkedin.com/in/andrei-ungureanu-63086016a/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">LinkedIn</a>
          <a href="https://github.com/andiq123" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">GitHub</a>
        </div>
        <p>
          &copy; {new Date().getFullYear()} Andrei Ungureanu · Chisinau, Moldova
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Built with <span className="text-primary">Next.js</span>, <span className="text-primary">Tailwind CSS</span> & <span className="text-primary">Framer Motion</span>.
        </p>
      </div>
    </footer>
  );
}
