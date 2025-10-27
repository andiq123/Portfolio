"use client";
import Image from "next/image";
import getProjects, { Project } from '@/data/datastore';
import { useMemo, useState } from 'react';
import { useScrollAnimation } from "@/utils/useAnimation";

interface ProjectLink {
  label: string;
  url: string;
  icon?: string;
}

export default function Projects() {
  const projects = useMemo(() => getProjects(), []);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section 
      ref={ref}
      id="projects" 
      className={`py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      aria-labelledby="projects-heading"
    >
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Portfolio</span>
          </div>
          <h2 
            id="projects-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-lg sm:text-xl text-secondary max-w-3xl mx-auto tracking-wide leading-relaxed">
            A curated selection of my technical projects demonstrating expertise in full-stack development, cloud architecture, and enterprise solutions.
          </p>
          <p className="mt-3 text-sm text-secondary/80">Projects developed in .NET may require a brief initialization period due to container hosting warm-up.</p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          role="list"
          aria-label="Project cards"
        >
          {projects.map((project: Project, index: number) => (
            <article
              key={project.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group card flex flex-col relative overflow-hidden transform transition-all duration-500"
              role="listitem"
            >
              {/* Decorative gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.name} project screenshot`}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    hoveredIndex === index ? 'scale-110' : 'scale-100'
                  }`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                  loading={index < 3 ? "eager" : "lazy"}
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMWY1ZjkiLz48L3N2Zz4="
                />
                {/* Overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-5 sm:p-6 flex flex-col flex-grow space-y-4 relative z-10">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-wide group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm sm:text-base text-secondary flex-grow tracking-wide leading-relaxed">
                  {project.description}
                </p>

                <div
                  className="flex flex-wrap gap-2"
                  role="list"
                  aria-label="Project technologies"
                >
                  {project.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs sm:text-sm bg-muted/80 text-foreground rounded-lg border border-muted hover:border-primary transition-all duration-300 hover:scale-105"
                      role="listitem"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className="flex gap-3 pt-2"
                  role="list"
                  aria-label="Project links"
                >
                  {project.links.map((link: ProjectLink, i: number) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn group/btn inline-flex items-center justify-center text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background hover:shadow-lg"
                      role="listitem"
                      aria-label={`${link.label} for ${project.name}`}
                    >
                      {link.icon && (
                        <svg
                          className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform"
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
