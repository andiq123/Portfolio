"use client";

import { useEffect } from "react";

// Content stays visible before hydration, without JavaScript, and when motion is reduced.
export default function Reveal() {
  useEffect(() => {
    const settleFocusedContent = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const closingBody = event.target.closest<HTMLElement>(".disclosure:not([open]) > .disclosure-body");
      if (closingBody) {
        closingBody.parentElement?.querySelector<HTMLElement>(":scope > summary")?.focus();
        return;
      }
      for (let element: Element | null = event.target; element; element = element.parentElement) {
        if (!element.matches(".intro-enter, .reveal-enter")) continue;
        for (const animation of element.getAnimations()) {
          if (animation instanceof CSSAnimation && ["intro-enter", "reveal-enter"].includes(animation.animationName)) {
            // Finishing preserves the timeline, so leaving focus cannot replay it.
            animation.finish();
          }
        }
      }
    };
    document.addEventListener("focusin", settleFocusedContent);

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !window.IntersectionObserver) {
      return () => document.removeEventListener("focusin", settleFocusedContent);
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);

        // Fast scrolling and anchor jumps must never dim already visible content.
        if (motion.matches || entry.target.getBoundingClientRect().top < window.innerHeight) continue;
        for (const animation of entry.target.getAnimations({ subtree: true })) {
          if (animation instanceof CSSAnimation && animation.animationName === "intro-enter") animation.finish();
        }
        entry.target.classList.add("reveal-enter");
      }
    }, { threshold: 0, rootMargin: "0px 0px 64px 0px" });

    document.querySelectorAll("[data-reveal]").forEach((element) => {
      if (element.getBoundingClientRect().top >= window.innerHeight) observer.observe(element);
    });

    const stop = () => {
      if (motion.matches) observer.disconnect();
    };
    motion.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", stop);
      document.removeEventListener("focusin", settleFocusedContent);
    };
  }, []);

  return null;
}
