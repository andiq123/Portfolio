import getProjects from "@/data/datastore";
import Image from "next/image";
import Link from "next/link";

type Props = {};

export default function Projects({}: Props) {
  const projects = getProjects();

  return (
    <div id="projects" className="mt-20 py-20">
      <h1 className="text-4xl text-white mx-auto w-fit mb-10 font-bold">
        Some of my personal projects
      </h1>

      <div className="flex justify-center items-center gap-10 mx-auto max-w-lg">
        {projects.map((project) => (
          <div className="border flex flex-col gap-10 rounded-xl p-5 text-center shadow-2xl bg-slate-950 hover:scale-105 transition-all duration-300 ease-in-out">
            <h2 className="text-4xl text-white font-bold">{project.name}</h2>

            <Image
              src={project.image}
              alt={project.name}
              width={0}
              height={0}
              className="object-cover h-full w-full rounded-lg"
              sizes="100vw"
            />
            <p className="text-xl text-white">{project.description}</p>

            <div className="flex justify-center border w-fit mx-auto rounded-lg font-bold overflow-hidden">
              {project.tags.map((tag) => (
                <p className="text-white px-5 py-2 hover:bg-slate-900 text-center">
                  {tag}
                </p>
              ))}
            </div>
            <div className="flex gap-5 ml-auto">
              <Link
                href={project.url}
                className="w-fit rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600"
              >
                <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">
                  Visit website
                </span>
              </Link>
              <Link
                href={project.github}
                className="relative px-6 py-3 font-bold text-white rounded-lg group"
              >
                <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-purple-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-pink-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
                <span className="relative">Visit Github</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
