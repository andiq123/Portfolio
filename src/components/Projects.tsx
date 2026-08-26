"use client";
import Image from "next/image";
import getProjects from '@/data/datastore';
import { motion } from "framer-motion";
import { LuDownload, LuExternalLink, LuGithub, LuPanelsTopLeft } from "react-icons/lu";
import SectionHeading from "./SectionHeading";

const projects = getProjects();

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading icon={LuPanelsTopLeft} eyebrow="Portfolio" title="Selected" accent="Projects" description="Product work across web, mobile, TV, and desktop." />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-background/75 shadow-md ring-1 ring-primary/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-primary/20"
            >
              <div className="relative flex h-10 items-center bg-muted/50 px-4" aria-hidden="true">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="absolute inset-x-12 truncate text-center font-mono text-[10px] text-secondary/70">{project.name}</span>
              </div>
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.name} project`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/35 to-transparent opacity-60 transition-opacity group-hover:opacity-20" />
              </div>

              <div className="flex flex-grow flex-col space-y-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {project.name}
                  </h3>
                </div>
                
                <p className="text-secondary leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted/60 px-3 py-1 text-xs font-medium text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2 pt-2">
                  {project.links.map((link) => (
                    <ProjectLink key={link.label} link={link} projectName={project.name} />
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectLink({ link, projectName }: { link: { label: string; url: string }; projectName: string }) {
  const Icon = link.label.includes("Source") ? LuGithub : link.label.includes("Download") ? LuDownload : LuExternalLink;
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${link.label} for ${projectName} (opens in a new tab)`} className="group/link flex min-h-10 items-center gap-2 rounded-xl bg-muted/45 px-3.5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10 hover:text-primary">
      <Icon className="h-4 w-4" aria-hidden="true" />
      {link.label}
    </a>
  );
}
