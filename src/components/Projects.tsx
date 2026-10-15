import Image from "next/image";
import getProjects from '@/data/datastore';
import { LuDownload, LuExternalLink, LuGithub, LuPanelsTopLeft } from "react-icons/lu";
import SectionHeading from "./SectionHeading";

const projects = getProjects();
const imageSizes = {
  featured: "(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 2.25rem), (max-width: 1343px) calc(57.5vw - 2.3rem), 736px",
  standard: "(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 2.25rem), (max-width: 1343px) calc(33.333vw - 2.333rem), 410px",
  wide: "(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 2.25rem), (max-width: 1343px) calc(50vw - 2.75rem), 628px",
};

export default function Projects() {
  return (
    <section id="projects" className="relative px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading icon={LuPanelsTopLeft} eyebrow="Portfolio" title="Selected" accent="Projects" description="Product work across web, mobile, TV, and desktop." />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article data-reveal
              key={project.id}
              className="project-card group relative flex h-full flex-col overflow-hidden rounded-2xl surface interactive-card"
            >
              <div className="project-chrome relative flex h-10 items-center bg-muted/50 px-4" aria-hidden="true">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="absolute inset-x-12 truncate text-center font-mono text-[10px] text-secondary">{project.name}</span>
              </div>
              <div className="project-image relative aspect-video overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.name} project`}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  sizes={index === 0 ? imageSizes.featured : index >= projects.length - 2 ? imageSizes.wide : imageSizes.standard}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/35 to-transparent opacity-60 transition-opacity group-hover:opacity-20" />
              </div>

              <div className="project-content flex flex-grow flex-col space-y-4 p-6">
                <div className="flex items-baseline gap-3"><span className="project-index shrink-0 font-mono text-xs text-primary" aria-hidden="true">{String(index + 1).padStart(2, "0")} /</span>
                  <h3 className="min-w-0 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
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
                      className="tag"
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectLink({ link, projectName }: { link: { label: string; url: string }; projectName: string }) {
  const Icon = link.label.includes("Source") ? LuGithub : link.label.includes("Download") ? LuDownload : LuExternalLink;
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${link.label} for ${projectName} (opens in a new tab)`} className="group/link flex min-h-11 items-center gap-2 rounded-xl bg-muted/45 px-3.5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10 hover:text-primary">
      <Icon className="h-4 w-4" aria-hidden="true" />
      {link.label}
    </a>
  );
}
