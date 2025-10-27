import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for scroll-triggered animations
 * Optimized for performance with Intersection Observer
 */
export function useScrollAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if element is already visible (for SSR/hydration)
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.top >= 0) {
      setIsVisible(true);
      return;
    }

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold, rootMargin: '-50px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

