"use client";
import getProjects from '@/data/datastore';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingFigures = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const figures = isMobile ? [
    { size: 80, color: 'rgba(var(--primary-rgb), 0.3)', delay: 0, duration: 15 },
    { size: 60, color: 'rgba(var(--muted-rgb), 0.3)', delay: 2, duration: 18 },
  ] : [
    { size: 120, color: 'rgba(var(--primary-rgb), 0.3)', delay: 0, duration: 20 },
    { size: 100, color: 'rgba(var(--muted-rgb), 0.3)', delay: 2, duration: 25 },
    { size: 160, color: 'rgba(var(--primary-rgb), 0.3)', delay: 4, duration: 30 },
    { size: 140, color: 'rgba(var(--muted-rgb), 0.3)', delay: 6, duration: 22 },
    { size: 180, color: 'rgba(var(--primary-rgb), 0.3)', delay: 8, duration: 28 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {figures.map((figure, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-2xl opacity-40"
          style={{
            width: figure.size,
            height: figure.size,
            backgroundColor: figure.color,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [
              Math.random() * 30 - 15 + '%',
              Math.random() * 30 - 15 + '%',
              Math.random() * 30 - 15 + '%',
            ],
            y: [
              Math.random() * 30 - 15 + '%',
              Math.random() * 30 - 15 + '%',
              Math.random() * 30 - 15 + '%',
            ],
          }}
          transition={{
            duration: figure.duration,
            repeat: Infinity,
            ease: "linear",
            delay: figure.delay,
          }}
        />
      ))}
    </div>
  );
};

type Props = {};

export default function Projects({}: Props) {
  const projects = getProjects();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const containerVariants = {
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
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: "linear",
      },
    },
  };

  const cardVariants = {
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
  };

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

  const buttonVariants = {
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

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <FloatingFigures />
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
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
          variants={itemVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group bg-background/50 backdrop-blur-xl rounded-xl overflow-hidden border border-muted/20 shadow-lg flex flex-col"
              variants={cardVariants}
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
                  variants={itemVariants}
                >
                  {project.name}
                </motion.h3>
                <motion.p
                  className="text-secondary mb-4 flex-grow"
                  variants={itemVariants}
                >
                  {project.description}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-2 mb-6"
                  variants={itemVariants}
                >
                  {project.tags.map((tag, i) => (
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
                  className="flex gap-3"
                  variants={itemVariants}
                >
                  <motion.div
                    className="flex-1"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      href={project.url}
                      className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </Link>
                  </motion.div>
                  <motion.div
                    className="flex-1"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      href={project.github}
                      className={`inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        project.github
                          ? 'bg-muted text-foreground hover:bg-muted/80 cursor-pointer'
                          : 'bg-muted/30 text-foreground/50 cursor-not-allowed'
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => !project.github && e.preventDefault()}
                    >
                      Source Code
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
