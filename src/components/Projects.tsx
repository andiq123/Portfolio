import getProjects from '@/data/datastore';
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

export default function Projects({}: Props) {
  const projects = getProjects();

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            A collection of my personal projects showcasing my skills and experience.
            Note: Projects developed in .NET may take longer to open initially if they
            haven&apos;t been accessed in a while due to container hosting warm-up.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="card group overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {project.name}
                </h3>
                <p className="text-secondary">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-muted text-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  <Link
                    href={project.url}
                    className="btn flex-1 text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </Link>
                  <Link
                    href={project.github}
                    className="btn flex-1 text-center bg-muted text-foreground hover:bg-muted/80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source Code
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
