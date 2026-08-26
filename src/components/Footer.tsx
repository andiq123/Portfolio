import { LuGithub, LuLinkedin, LuMail, LuMapPin, LuPhone } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-muted/20 py-8 text-center text-sm text-secondary/60 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <a href="mailto:andrei.ungureanu.work@gmail.com" className="flex items-center gap-1.5 text-secondary transition-colors hover:text-primary"><LuMail className="h-4 w-4" aria-hidden="true" />Email</a>
          <a href="tel:+37369683989" className="flex items-center gap-1.5 text-secondary transition-colors hover:text-primary"><LuPhone className="h-4 w-4" aria-hidden="true" />+373 696 839 89</a>
          <a href="https://www.linkedin.com/in/andrei-ungureanu-63086016a/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-secondary transition-colors hover:text-primary"><LuLinkedin className="h-4 w-4" aria-hidden="true" />LinkedIn</a>
          <a href="https://github.com/andiq123" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-secondary transition-colors hover:text-primary"><LuGithub className="h-4 w-4" aria-hidden="true" />GitHub</a>
        </div>
        <p className="flex items-center justify-center gap-1.5">
          &copy; {new Date().getFullYear()} Andrei Ungureanu <span aria-hidden="true">·</span> <LuMapPin className="h-3.5 w-3.5" aria-hidden="true" /> Chișinău, Moldova
        </p>
      </div>
    </footer>
  );
}
