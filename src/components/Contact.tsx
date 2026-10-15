import type { IconType } from "react-icons";
import { LuArrowUpRight, LuFileText, LuLanguages, LuLinkedin, LuMail, LuPhone } from "react-icons/lu";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div data-reveal className="contact-panel surface relative z-10 mx-auto max-w-6xl overflow-hidden rounded-[2rem] p-6 shadow-md md:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div className="relative">
            <p className="eyebrow mb-5 font-mono"><span className="text-code" aria-hidden="true">{"//"}</span>Start a conversation</p>
            <h2 className="text-4xl font-bold tracking-tight md:text-6xl">Let&apos;s build <span className="text-gradient">something useful.</span></h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-secondary md:text-lg">I&apos;m open to software engineering opportunities and practical product collaborations.</p>
            <div className="mt-6 flex items-center gap-3 text-sm text-secondary">
              <LuLanguages className="h-4 w-4 text-primary" aria-hidden="true" />
              Romanian · English · Italian · Russian
            </div>
          </div>

          <div className="contact-links relative grid gap-3 sm:grid-cols-2">
            <ContactLink href="mailto:andrei.ungureanu.work@gmail.com" icon={LuMail} label="Email" detail="andrei.ungureanu.work@gmail.com" />
            <ContactLink href="tel:+37369683989" icon={LuPhone} label="Phone" detail="+373 696 839 89" />
            <ContactLink href="https://www.linkedin.com/in/andrei-ungureanu-63086016a/" icon={LuLinkedin} label="LinkedIn" detail="Connect with me" external />
            <ContactLink href="/resume.pdf" icon={LuFileText} label="Resume" detail="View PDF" external />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ href, icon: Icon, label, detail, external = false }: { href: string; icon: IconType; label: string; detail: string; external?: boolean }) {
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} aria-label={external ? `${label}: ${detail} (opens in a new tab)` : undefined} className="group flex min-w-0 items-center gap-3 rounded-2xl bg-muted/45 p-4 transition-colors duration-200 hover:bg-primary/10">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary"><Icon className="h-5 w-5" aria-hidden="true" /></span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-secondary">{label}</span>
        <span className="block break-words text-sm font-semibold text-foreground">{detail}</span>
      </span>
      <LuArrowUpRight className="h-4 w-4 shrink-0 text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
    </a>
  );
}
