import { LuBookOpen, LuCalendarDays, LuGraduationCap, LuMapPin } from "react-icons/lu";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="relative px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading icon={LuGraduationCap} eyebrow="Background" title="Education" />

        <div data-reveal
          className="surface grid gap-6 rounded-[1.75rem] p-6 shadow-sm sm:grid-cols-[auto_1fr] sm:items-center md:p-8"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <LuBookOpen className="h-8 w-8" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground md:text-2xl">Bachelor of Science in Computer Science</h3>
            <p className="mt-1 font-medium text-primary">Ovidius University of Constanța</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-secondary">
              <span className="flex items-center gap-2"><LuMapPin className="h-4 w-4 text-primary" aria-hidden="true" />Constanța, Romania</span>
              <span className="flex items-center gap-2"><LuCalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />2020–2023</span>
              <span className="flex items-center gap-2"><LuGraduationCap className="h-4 w-4 text-primary" aria-hidden="true" />Graduated July 2023</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
