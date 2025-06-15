"use client";
import Image from "next/image";
import getProjects, { Project } from '@/data/datastore';
import { useMemo } from 'react';
import Link from 'next/link';

interface ProjectLink {
  label: string;
  url: string;
  icon?: string;
}

export default function Projects() {
  const projects = useMemo(() => getProjects(), []);

  return (
    <section 
      id="projects" 
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
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
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          role="list"
          aria-label="Project cards"
        >
          {projects.map((project: Project) => (
            <article
              key={project.id}
              className="bg-background/95 rounded-xl overflow-hidden border border-muted/50 hover:border-primary/50 transition-colors duration-200 shadow-lg flex flex-col"
              role="listitem"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.name} project screenshot`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={false}
                  loading="lazy"
                  quality={75}
                />
              </div>

              <div className="p-4 sm:p-6 flex flex-col flex-grow space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-wide">
                  {project.name}
                </h3>
                <p className="text-sm sm:text-base text-secondary/80 flex-grow tracking-wide leading-relaxed">
                  {project.description}
                </p>

                <div
                  className="flex flex-wrap gap-1.5 sm:gap-2"
                  role="list"
                  aria-label="Project technologies"
                >
                  {project.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 sm:px-2.5 py-1 text-xs sm:text-sm bg-background/50 text-foreground rounded-full border border-muted/50 hover:border-primary/50 transition-colors tracking-wide"
                      role="listitem"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className="flex gap-4 pt-2"
                  role="list"
                  aria-label="Project links"
                >
                  {project.links.map((link: ProjectLink, i: number) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn inline-flex items-center justify-center tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
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
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
