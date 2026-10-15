import { LuCloud, LuCodeXml, LuPackageCheck, LuServerCog, LuSparkles, LuWorkflow } from "react-icons/lu";
import SectionHeading from "./SectionHeading";

const groups = [
  { title: "Frontend", icon: LuCodeXml, skills: ["Angular", "React", "TypeScript", "Tailwind CSS", "UI/UX"] },
  { title: "Backend", icon: LuServerCog, skills: [".NET", "C#", "Golang", "REST APIs", "Entity Framework"] },
  { title: "Cloud & Data", icon: LuCloud, skills: ["AWS", "Lambda", "SNS", "SQS", "SQL Server", "PostgreSQL"] },
  { title: "Delivery", icon: LuWorkflow, skills: ["Docker", "Git", "GitHub Actions", "CI/CD", "Railway", "Render", "Vercel", "TDD"] },
];

export default function Skills() {
  return (
    <section id="skills" className="relative w-full px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading icon={LuSparkles} eyebrow="Technical" title="Skills" description="Full-stack delivery with a backend and cloud focus." />
        <div className="skills-grid relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map(({ title, icon: Icon, skills }, index) => (
            <article data-reveal key={title} className="skill-card relative z-10 rounded-2xl surface interactive-card p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <h3 className="min-w-0 font-bold text-foreground">{title}</h3>
                <span className="skill-stage ml-auto shrink-0 font-mono text-[10px] text-secondary" aria-hidden="true">{String(index + 1).padStart(2, "0")} / 04</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => <span key={skill} className="tag">{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
        <div data-reveal className="mx-auto mt-7 flex w-fit items-center gap-2.5 rounded-full bg-primary/10 px-4 py-2.5 text-sm font-semibold text-foreground">
          <LuPackageCheck className="h-5 w-5 text-primary" aria-hidden="true" />
          One stack. One useful product.
        </div>
      </div>
    </section>
  );
}
