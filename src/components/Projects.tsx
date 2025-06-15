"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import getProjects, { Project } from '@/data/datastore';
import { useState, useEffect, useCallback, useMemo } from 'react';
import FloatingFigures from './FloatingFigures';
import Link from 'next/link';
import { useIsMobile } from "@/hooks/useIsMobile";
import { useInView } from "react-intersection-observer";

interface ProjectLink {
  label: string;
  url: string;
  icon?: string;
}

const createContainerVariants = (isMobile: boolean, prefersReducedMotion: boolean) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: prefersReducedMotion ? 0 : (isMobile ? 0.1 : 0.15),
      delayChildren: prefersReducedMotion ? 0 : 0.1,
    },
  },
});

const createItemVariants = (isMobile: boolean, prefersReducedMotion: boolean) => ({
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.4,
      ease: "easeOut",
    },
  },
});

const createCardVariants = (isMobile: boolean, prefersReducedMotion: boolean) => ({
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.4,
      delay: prefersReducedMotion ? 0 : index * 0.1,
      ease: "easeOut",
    },
  }),
  hover: {
    y: prefersReducedMotion ? 0 : -5,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.2,
      ease: "easeOut",
    },
  },
});

const imageVariants = (prefersReducedMotion: boolean) => ({
  hover: {
    scale: prefersReducedMotion ? 1 : 1.02,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.2,
      ease: "easeOut",
    },
  },
});

const tagVariants = (prefersReducedMotion: boolean) => ({
  hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.2,
      delay: prefersReducedMotion ? 0 : index * 0.05,
    },
  }),
  hover: {
    scale: prefersReducedMotion ? 1 : 1.05,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.1,
    },
  },
});

const buttonVariants = (prefersReducedMotion: boolean) => ({
  hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.2,
      delay: prefersReducedMotion ? 0 : index * 0.1,
    },
  }),
  hover: {
    scale: prefersReducedMotion ? 1 : 1.05,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.1,
    },
  },
  tap: {
    scale: prefersReducedMotion ? 1 : 0.95,
  },
});

export default function Projects() {
  const projects = useMemo(() => getProjects(), []);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  return (
    <section 
      id="projects" 
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
      aria-labelledby="projects-heading"
      ref={ref}
    >
      <FloatingFigures />
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50"
        style={{ opacity }}
      />
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={createContainerVariants(isMobile, !!prefersReducedMotion)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="text-center mb-16" 
          variants={createItemVariants(isMobile, !!prefersReducedMotion)}
        >
          <h2 
            id="projects-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight"
          >
            Featured Projects
          </h2>
          <p className="text-secondary max-w-2xl mx-auto tracking-wide leading-relaxed">
            A curated selection of my technical projects demonstrating expertise in full-stack development, cloud architecture, and enterprise solutions.
            Note: Projects developed in .NET may require a brief initialization period due to container hosting warm-up.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          variants={createItemVariants(isMobile, !!prefersReducedMotion)}
          role="list"
          aria-label="Project cards"
        >
          {projects.map((project: Project, index: number) => (
            <motion.article
              key={project.id}
              className="group bg-background/95 backdrop-blur-sm rounded-xl overflow-hidden border border-muted/50 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col"
              variants={createCardVariants(isMobile, !!prefersReducedMotion)}
              whileHover={prefersReducedMotion ? {} : "hover"}
              custom={index}
              role="listitem"
            >
              <motion.div
                className="relative aspect-video overflow-hidden"
                variants={imageVariants(!!prefersReducedMotion)}
                whileHover={prefersReducedMotion ? {} : "hover"}
              >
                <Image
                  src={project.image}
                  alt={`${project.name} project screenshot`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 2}
                  loading={index < 2 ? "eager" : "lazy"}
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+ODM4Ojo6ODM4Ojo6ODM4Ojo6ODM4Ojr/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              <div className="p-4 sm:p-6 flex flex-col flex-grow space-y-4">
                <motion.h3
                  className="text-lg sm:text-xl font-semibold text-foreground tracking-wide"
                  variants={createItemVariants(isMobile, !!prefersReducedMotion)}
                >
                  {project.name}
                </motion.h3>
                <motion.p
                  className="text-sm sm:text-base text-secondary/80 flex-grow tracking-wide leading-relaxed"
                  variants={createItemVariants(isMobile, !!prefersReducedMotion)}
                >
                  {project.description}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-1.5 sm:gap-2"
                  variants={createItemVariants(isMobile, !!prefersReducedMotion)}
                  role="list"
                  aria-label="Project technologies"
                >
                  {project.tags.map((tag: string, i: number) => (
                    <motion.span
                      key={i}
                      className="px-2 sm:px-2.5 py-1 text-xs sm:text-sm bg-background/50 text-foreground rounded-full border border-muted/50 hover:border-primary/50 transition-colors tracking-wide hover:bg-muted/50"
                      variants={tagVariants(!!prefersReducedMotion)}
                      custom={i}
                      whileHover={prefersReducedMotion ? {} : "hover"}
                      role="listitem"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  className="flex gap-4 pt-2"
                  variants={createItemVariants(isMobile, !!prefersReducedMotion)}
                  role="list"
                  aria-label="Project links"
                >
                  {project.links.map((link: ProjectLink, i: number) => (
                    <motion.a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn inline-flex items-center justify-center tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                      variants={buttonVariants(!!prefersReducedMotion)}
                      whileHover={prefersReducedMotion ? {} : "hover"}
                      whileTap={prefersReducedMotion ? {} : "tap"}
                      role="listitem"
                      aria-label={`${link.label} for ${project.name}`}
                    >
                      {link.icon && (
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={link.icon}
                          />
                        </svg>
                      )}
                      {link.label}
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
