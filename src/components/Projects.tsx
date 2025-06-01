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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <FloatingFigures />
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={createContainerVariants(isMobile)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="text-center mb-16" variants={createItemVariants(isMobile)}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            A curated selection of my technical projects demonstrating expertise in full-stack development, cloud architecture, and enterprise solutions.
            Note: Projects developed in .NET may require a brief initialization period due to container hosting warm-up.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={createItemVariants(isMobile)}
        >
          {projects.map((project: Project, index: number) => (
            <motion.div
              key={project.id}
              className="group bg-background/50 backdrop-blur-xl rounded-xl overflow-hidden border border-muted/20 shadow-lg flex flex-col"
              variants={createCardVariants(isMobile)}
              whileHover="hover"
              custom={index}
            >
              <motion.div
                className="relative aspect-video overflow-hidden"
                variants={imageVariants}
                whileHover="hover"
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              <div className="p-6 flex flex-col flex-grow">
                <motion.h3
                  className="text-xl font-semibold text-foreground mb-2"
                  variants={createItemVariants(isMobile)}
                >
                  {project.name}
                </motion.h3>
                <motion.p
                  className="text-secondary mb-4 flex-grow"
                  variants={createItemVariants(isMobile)}
                >
                  {project.description}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-2 mb-6"
                  variants={createItemVariants(isMobile)}
                >
                  {project.tags.map((tag: string, i: number) => (
                    <motion.span
                      key={i}
                      className="px-2.5 py-1 text-sm bg-muted/50 text-foreground rounded-full"
                      variants={tagVariants}
                      custom={i}
                      whileHover="hover"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  className="flex gap-4"
                  variants={createItemVariants(isMobile)}
                >
                  {project.links.map((link, i: number) => (
                    <motion.a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn inline-flex items-center justify-center"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {link.icon && (
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
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
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
