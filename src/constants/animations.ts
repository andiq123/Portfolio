import { Variants } from 'framer-motion';

export const createContainerVariants = (isMobile: boolean): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: isMobile ? 0.1 : 0.15,
      delayChildren: isMobile ? 0.1 : 0.2,
      duration: isMobile ? 0.4 : 0.6,
      ease: "linear",
    },
  },
});

export const createItemVariants = (isMobile: boolean): Variants => ({
  hidden: { opacity: 0, y: isMobile ? 10 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: isMobile ? 0.4 : 0.6,
      ease: "linear",
    },
  },
});

export const createCardVariants = (isMobile: boolean): Variants => ({
  hidden: { opacity: 0, y: isMobile ? 15 : 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: isMobile ? 0.4 : 0.8,
      ease: "linear",
    },
  },
  hover: {
    y: isMobile ? -3 : -5,
    transition: {
      duration: 0.2,
      ease: "linear",
    },
  },
});

export const createTagVariants = (isMobile: boolean): Variants => ({
  hidden: { opacity: 0, scale: 0.9 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      delay: index * (isMobile ? 0.03 : 0.05),
      ease: "linear",
    },
  }),
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.2,
      ease: "linear",
    },
  },
});

export const buttonVariants: Variants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "linear",
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: "linear",
    },
  },
}; 