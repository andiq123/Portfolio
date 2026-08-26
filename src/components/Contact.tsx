"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { LuArrowUpRight, LuFileText, LuLanguages, LuLinkedin, LuMail, LuPhone } from "react-icons/lu";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45 }} className="glass relative z-10 mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-background/70 p-6 shadow-md md:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LuMail className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight md:text-6xl">Let&apos;s build <span className="text-gradient">something useful.</span></h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-secondary md:text-lg">I&apos;m open to software engineering opportunities and practical product collaborations.</p>
            <div className="mt-6 flex items-center gap-3 text-sm text-secondary">
              <LuLanguages className="h-4 w-4 text-primary" aria-hidden="true" />
              Romanian · English · Italian · Russian
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <ContactLink href="mailto:andrei.ungureanu.work@gmail.com" icon={LuMail} label="Email" detail="andrei.ungureanu.work@gmail.com" />
            <ContactLink href="tel:+37369683989" icon={LuPhone} label="Phone" detail="+373 696 839 89" />
            <ContactLink href="https://www.linkedin.com/in/andrei-ungureanu-63086016a/" icon={LuLinkedin} label="LinkedIn" detail="Connect with me" external />
            <ContactLink href="/resume.pdf" icon={LuFileText} label="Resume" detail="View PDF" external />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ContactLink({ href, icon: Icon, label, detail, external = false }: { href: string; icon: IconType; label: string; detail: string; external?: boolean }) {
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group flex min-w-0 items-center gap-3 rounded-2xl bg-muted/45 p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-primary/10">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/70 text-primary"><Icon className="h-5 w-5" aria-hidden="true" /></span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-secondary">{label}</span>
        <span className="block truncate text-sm font-semibold text-foreground">{detail}</span>
      </span>
      <LuArrowUpRight className="h-4 w-4 shrink-0 text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
    </a>
  );
}
