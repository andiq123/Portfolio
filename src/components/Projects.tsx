"use client";
import getProjects, { Project } from '@/data/datastore';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useIsMobile } from "@/hooks/useIsMobile";
import { createContainerVariants, createItemVariants, createCardVariants, buttonVariants } from "@/constants/animations";
import FloatingFigures from './FloatingFigures';

export default function Projects() {
  const projects = getProjects();
  const isMobile = useIsMobile();

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: isMobile ? 0.4 : 0.8,
        ease: "linear",
      },
    },
    hover: {
      scale: isMobile ? 1.02 : 1.05,
      transition: {
        duration: 0.2,
        ease: "linear",
      },
    },
  };

  const tagVariants = {
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
      backgroundColor: "var(--muted)",
      transition: {
        duration: 0.2,
        ease: "linear",
      },
    },
  };

  return (
    <section 
      id="projects" 
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
      aria-labelledby="projects-heading"
    >
      <FloatingFigures />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={createContainerVariants(isMobile)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="text-center mb-16" variants={createItemVariants(isMobile)}>
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
          variants={createItemVariants(isMobile)}
          role="list"
          aria-label="Project cards"
        >
          {projects.map((project: Project, index: number) => (
            <motion.article
              key={project.id}
              className="group bg-background/95 backdrop-blur-sm rounded-xl overflow-hidden border border-muted/50 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col"
              variants={createCardVariants(isMobile)}
              whileHover="hover"
              custom={index}
              role="listitem"
            >
              <motion.div
                className="relative aspect-video overflow-hidden"
                variants={imageVariants}
                whileHover="hover"
              >
                <Image
                  src={project.image}
                  alt={`${project.name} project screenshot`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              <div className="p-4 sm:p-6 flex flex-col flex-grow space-y-4">
                <motion.h3
                  className="text-lg sm:text-xl font-semibold text-foreground tracking-wide"
                  variants={createItemVariants(isMobile)}
                >
                  {project.name}
                </motion.h3>
                <motion.p
                  className="text-sm sm:text-base text-secondary/80 flex-grow tracking-wide leading-relaxed"
                  variants={createItemVariants(isMobile)}
                >
                  {project.description}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-1.5 sm:gap-2"
                  variants={createItemVariants(isMobile)}
                  role="list"
                  aria-label="Project technologies"
                >
                  {project.tags.map((tag: string, i: number) => (
                    <motion.span
                      key={i}
                      className="px-2 sm:px-2.5 py-1 text-xs sm:text-sm bg-background/50 text-foreground rounded-full border border-muted/50 hover:border-primary/50 transition-colors tracking-wide hover:bg-muted/50"
                      variants={tagVariants}
                      custom={i}
                      whileHover="hover"
                      role="listitem"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  className="flex gap-4 pt-2"
                  variants={createItemVariants(isMobile)}
                  role="list"
                  aria-label="Project links"
                >
                  {project.links.map((link, i: number) => (
                    <motion.a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn inline-flex items-center justify-center tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
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
