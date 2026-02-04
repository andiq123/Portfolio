"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="pt-16 pb-8 md:pt-20 md:pb-10 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="glass rounded-3xl p-10 md:p-14 border border-white/10"
        >
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              Get in <br />
              <span className="text-gradient">Touch.</span>
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              I&apos;m open to new opportunities. Whether you have a question or just want to say hi, I&apos;ll do my best to get back to you!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
              <span className="sr-only">Languages: </span>
              <span className="px-3 py-1 rounded-full bg-muted/30 border border-white/5" title="Romanian">RO</span>
              <span className="px-3 py-1 rounded-full bg-muted/30 border border-white/5" title="English">EN</span>
              <span className="px-3 py-1 rounded-full bg-muted/30 border border-white/5" title="Italian">IT</span>
              <span className="px-3 py-1 rounded-full bg-muted/30 border border-white/5" title="Russian">RU</span>
            </div>
            
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-8">
              <a
                href="mailto:andrei.ungureanu.work@gmail.com"
                aria-label="Send email to andrei.ungureanu.work@gmail.com"
                className="px-10 py-4 rounded-xl bg-muted/20 text-foreground font-bold text-lg border border-white/10 hover:bg-muted/40 hover:border-primary/30 transition-all flex items-center gap-3 font-mono text-base break-all"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                andrei.ungureanu.work@gmail.com
              </a>
              <a
                href="tel:+37369683989"
                aria-label="Call +373 696 839 89"
                className="px-10 py-4 rounded-xl bg-muted/20 text-foreground font-bold text-lg border border-white/10 hover:bg-muted/40 transition-all flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +373 696 839 89
              </a>
              <a
                href="https://www.linkedin.com/in/andrei-ungureanu-63086016a/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on LinkedIn (opens in new tab)"
                className="px-10 py-4 rounded-xl bg-muted/20 text-foreground font-bold text-lg border border-white/10 hover:bg-muted/40 transition-all flex items-center gap-3"
              >
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                LinkedIn
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download resume (PDF, opens in new tab)"
                className="px-10 py-4 rounded-xl bg-muted/20 text-foreground font-bold text-lg border border-white/10 hover:bg-muted/40 transition-all flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Resume (PDF)
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
