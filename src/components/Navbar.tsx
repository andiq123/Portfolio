"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuArrowUpRight, LuGithub, LuMenu, LuX } from "react-icons/lu";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const updateNavigation = () => {
      setIsScrolled(window.scrollY > 20);
      const current = [...NAV_ITEMS].reverse().find(({ href }) => {
        const section = document.querySelector(href);
        return section && section.getBoundingClientRect().top <= 160;
      });
      setActiveSection(current?.href.slice(1) ?? "home");
    };

    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });
    return () => window.removeEventListener("scroll", updateNavigation);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
      className="pointer-events-none fixed left-0 right-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        aria-label="Primary navigation"
        className={`pointer-events-auto flex w-full max-w-7xl items-center justify-between rounded-full px-4 transition-all duration-300 md:px-6 ${
          isScrolled || isMenuOpen
            ? "bg-background/85 py-2.5 shadow-lg backdrop-blur-xl"
            : "bg-background/30 py-3 backdrop-blur-sm"
        }`}
      >
        <a href="#home" onClick={() => setIsMenuOpen(false)} className="bg-gradient-to-r from-primary to-accent bg-clip-text text-xl font-bold text-transparent" aria-label="Andrei Ungureanu — home">
          <span className="sm:hidden">A.U.</span>
          <span className="hidden sm:inline">Andrei Ungureanu.</span>
        </a>

        <div className="hidden items-center gap-1 rounded-full bg-secondary/10 p-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a key={item.href} href={item.href} aria-current={isActive ? "page" : undefined} className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-secondary hover:text-foreground"}`}>
                {isActive && <motion.span layoutId="activeTab" className="absolute inset-0 rounded-full bg-background shadow-sm" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
                <span className="relative">{item.label}</span>
              </a>
            );
          })}
        </div>

        <a href="https://github.com/andiq123" target="_blank" rel="noopener noreferrer" className="hidden rounded-full p-2.5 text-foreground transition-colors hover:bg-muted/50 hover:text-primary md:block" aria-label="GitHub profile (opens in a new tab)">
          <LuGithub className="h-5 w-5" aria-hidden="true" />
        </a>

        <button type="button" onClick={() => setIsMenuOpen((open) => !open)} className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/60 md:hidden" aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen} aria-controls="mobile-menu">
          {isMenuOpen ? <LuX className="h-5 w-5" aria-hidden="true" /> : <LuMenu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div id="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-auto fixed inset-0 -z-10 flex items-center justify-center bg-background/95 px-6 backdrop-blur-xl md:hidden">
            <div className="flex w-full max-w-sm flex-col gap-3 pt-16">
              {NAV_ITEMS.map((item, index) => (
                <motion.a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * index }} className="flex items-center justify-between rounded-2xl p-4 text-3xl font-bold text-foreground transition-colors hover:bg-muted/50 hover:text-primary">
                  {item.label}<LuArrowUpRight className="h-6 w-6 text-primary" aria-hidden="true" />
                </motion.a>
              ))}
              <a href="https://github.com/andiq123" target="_blank" rel="noopener noreferrer" className="mt-5 flex min-h-12 items-center justify-center gap-3 rounded-2xl bg-muted/40 font-semibold text-foreground">
                <LuGithub className="h-5 w-5" aria-hidden="true" /> GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
