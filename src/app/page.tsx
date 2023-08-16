import Contact from "@/components/Contact";
import Intro from "@/components/Intro";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="flex flex-col justify-center">
      <Intro />
      <Projects />
      <Contact />
    </main>
  );
}
