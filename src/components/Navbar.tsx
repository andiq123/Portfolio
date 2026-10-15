"use client";

import { useEffect, useRef, useState } from "react";
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
  const [activeSection, setActiveSection] = useState("home");
  const menu = useRef<HTMLDialogElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const closingAnimation = useRef<Animation | null>(null);

  const openMenu = () => {
    const dialog = menu.current;
    if (!dialog) return;
    closingAnimation.current?.cancel();
    closingAnimation.current = null;
    dialog.inert = false;
    dialog.showModal();
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    const dialog = menu.current;
    if (!dialog?.open || closingAnimation.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.close();
      return;
    }
    const style = getComputedStyle(dialog);
    const animation = dialog.animate([
      { opacity: style.opacity, transform: style.transform },
      { opacity: 0, transform: "translateY(8px)" },
    ], { duration: 180, easing: "ease-out", fill: "forwards" });
    closingAnimation.current = animation;
    animation.finished.then(() => {
      if (closingAnimation.current === animation) dialog.close();
    }).catch(() => { /* Native closing, resizing, and unmounting can cancel an exit. */ }).finally(() => {
      if (closingAnimation.current === animation) closingAnimation.current = null;
      animation.cancel();
    });
  };

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("main section[id]")];
    const visible = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      const current = sections.findLast((section) => visible.has(section.id));
      if (current) setActiveSection(current.id === "education" ? "projects" : current.id);
    }, { rootMargin: "-80px 0px -50% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnDesktop = () => {
      if (menuToggle.current && getComputedStyle(menuToggle.current).display === "none") menu.current?.close();
    };
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finishExit = () => { if (motion.matches && closingAnimation.current) menu.current?.close(); };
    motion.addEventListener("change", finishExit);
    const observer = new ResizeObserver(closeOnDesktop);
    if (menuToggle.current?.parentElement) observer.observe(menuToggle.current.parentElement);
    document.body.style.overflow = "hidden";
    closeOnDesktop();
    return () => {
      document.body.style.overflow = previousOverflow;
      observer.disconnect();
      motion.removeEventListener("change", finishExit);
      closingAnimation.current?.cancel();
      closingAnimation.current = null;
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="nav-container pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav aria-label="Primary navigation" data-intro="navigation" className="nav-shell intro-enter pointer-events-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-2xl px-4 py-2.5 md:px-5">
          <a href="#home" className="shrink-0 text-base font-bold tracking-tight text-foreground lg:text-lg" aria-label="Andrei Ungureanu — home">
            <span className="mr-2 font-mono text-primary" aria-hidden="true">&lt;/&gt;</span><span className="nav-brand-short">A.U<span className="text-primary">.</span></span>
            <span className="nav-brand-full">Andrei Ungureanu<span className="text-primary">.</span></span>
          </a>
          <div className="nav-links items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return <a key={item.href} href={item.href} aria-current={isActive ? "location" : undefined} className={`rounded-lg px-3 py-3 text-sm font-medium transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-secondary hover:bg-muted hover:text-foreground"}`}>{item.label}</a>;
            })}
          </div>
          <a href="https://github.com/andiq123" target="_blank" rel="noopener noreferrer" className="nav-profile rounded-xl p-3 text-secondary transition-colors hover:bg-muted hover:text-primary" aria-label="GitHub profile (opens in a new tab)"><LuGithub className="h-5 w-5" aria-hidden="true" /></a>
          <button ref={menuToggle} type="button" onClick={openMenu} className="nav-menu-button icon-button h-11 w-11 items-center justify-center rounded-xl bg-muted" aria-label="Open menu" aria-expanded={isMenuOpen} aria-controls="mobile-menu"><LuMenu className="h-5 w-5" aria-hidden="true" /></button>
        </nav>
      </header>

      <dialog ref={menu} id="mobile-menu" aria-labelledby="menu-title" onClose={(event) => {
        const dialog = event.currentTarget;
        if (!dialog.open) {
          closingAnimation.current?.cancel();
          closingAnimation.current = null;
        }
        dialog.inert = !dialog.open;
        setIsMenuOpen(dialog.open);
      }} onCancel={(event) => { event.preventDefault(); closeMenu(); }} onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }} className="mobile-menu">
        <div className="mx-auto flex w-full max-w-sm flex-col">
          <div className="mb-8 flex items-center justify-between">
            <p id="menu-title" className="eyebrow">Navigation</p>
            <button type="button" onClick={closeMenu} className="icon-button flex h-11 w-11 items-center justify-center rounded-xl bg-muted" aria-label="Close menu"><LuX className="h-5 w-5" aria-hidden="true" /></button>
          </div>
          <nav aria-label="Mobile navigation" className="grid gap-2">
            {NAV_ITEMS.map((item, index) => (
              <a key={item.href} href={item.href} onClick={closeMenu} aria-current={activeSection === item.href.slice(1) ? "location" : undefined} className="flex items-center gap-4 rounded-xl px-3 py-4 text-2xl font-semibold text-foreground transition-colors hover:bg-muted hover:text-primary">
                <span className="font-mono text-xs text-secondary" aria-hidden="true">0{index + 1}</span>{item.label}<LuArrowUpRight className="ml-auto h-5 w-5 text-primary" aria-hidden="true" />
              </a>
            ))}
          </nav>
          <a href="https://github.com/andiq123" target="_blank" rel="noopener noreferrer" className="mt-8 flex min-h-12 items-center justify-center gap-3 rounded-xl bg-muted font-semibold text-foreground"><LuGithub className="h-5 w-5" aria-hidden="true" />GitHub</a>
        </div>
      </dialog>
    </>
  );
}
