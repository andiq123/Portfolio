"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = {
  label: string;
  href: string;
};

export default function Navbar() {
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navItems: NavItem[] = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (!isMenuHidden) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuHidden]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setIsMenuHidden(true);
      setActiveSection(targetId);
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none`}
    >
      <nav 
        className={`pointer-events-auto rounded-full transition-all duration-300 border border-transparent ${
          isScrolled 
            ? "bg-background/80 backdrop-blur-xl shadow-lg border-white/10 py-2.5 px-6" 
            : "bg-transparent py-4 px-4"
        } max-w-5xl w-full flex items-center justify-between`}
      >
        {/* Animated Expanding Logo */}
        <Link 
          href="/" 
          className="group flex items-center gap-0.5 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent relative z-50"
        >
          <span>A</span>
          <span className="max-w-0 overflow-hidden group-hover:max-w-[200px] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] whitespace-nowrap -ml-0.5 group-hover:ml-0">ndrei</span>
          <span>&nbsp;U</span>
          <span className="max-w-0 overflow-hidden group-hover:max-w-[200px] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] whitespace-nowrap -ml-0.5 group-hover:ml-0">ngureanu</span>
          <span className="text-primary">.</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 bg-secondary/10 p-1 rounded-full backdrop-blur-sm border border-white/5">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-background shadow-sm rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
           <a
            href="https://github.com/andiq123"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full hover:bg-muted/50 transition-colors text-foreground hover:text-primary active:scale-95 duration-200"
            aria-label="GitHub Profile"
          >
           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.372 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuHidden(!isMenuHidden)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted/50 transition-colors z-50 bg-background/50 backdrop-blur-md border border-white/10"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <motion.span 
              animate={!isMenuHidden ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-foreground block origin-center transition-transform"
            />
            <motion.span 
              animate={!isMenuHidden ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-0.5 bg-foreground block transition-opacity"
            />
            <motion.span 
              animate={!isMenuHidden ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-foreground block origin-center transition-transform"
            />
          </div>
        </button>
      </nav>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {!isMenuHidden && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center pointer-events-auto"
          >
             <div className="w-full max-w-sm px-6 flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted/50 transition-all group border border-transparent hover:border-white/10"
                >
                  <span className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                  <span className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                    <svg className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>
                </motion.a>
              ))}
              
              <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
                 className="mt-8 pt-8 border-t border-muted/50 flex justify-center gap-6"
              >
                  <a href="https://github.com/andiq123" className="p-4 rounded-full bg-muted/30 hover:bg-primary/20 text-foreground hover:text-primary transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.372 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
