import TerminalSecrets from "./TerminalSecrets";
import { LuArrowDown, LuArrowRight, LuBriefcaseBusiness, LuMapPin, LuMessageCircle, LuCodeXml, LuGitBranch, LuTerminal } from "react-icons/lu";

const profile = [
  ["name", "'Andrei Ungureanu'"],
  ["role", "'Software Engineer'"],
  ["focus", "'Cloud products & AI'"],
  ["stack", "['React', 'TypeScript', '.NET']"],
  ["platforms", "['AWS', 'Go', 'LLMs']"],
];

export default function Intro() {
  return (
    <section id="home" className="hero relative isolate overflow-hidden px-4 pb-16 pt-32 sm:px-6 md:pb-20 md:pt-36 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div className="hero-copy space-y-8 lg:self-start lg:pt-10">
          <p className="intro-enter eyebrow" data-intro="identity"><span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />andrei.dev <span className="text-secondary">/</span> Build with care</p>
          <h1 className="hero-title font-semibold leading-[1.02] tracking-tighter">
            <span className="intro-enter block" data-intro="headline">Software</span>
            <span className="intro-enter block" data-intro="accent"><span className="text-gradient">Engineer.</span><span className="hero-title-suffix intro-enter" data-intro="finish" aria-hidden="true">/&gt;</span></span>
          </h1>
          <p className="intro-enter max-w-lg text-lg leading-relaxed text-secondary md:text-xl" data-intro="copy">
            I’m Andrei. I build full-stack products with dependable backends, cloud-native infrastructure, and thoughtful interfaces.
          </p>
          <div className="intro-enter flex flex-wrap gap-x-6 gap-y-3 text-sm text-secondary" data-intro="meta">
            <span className="flex items-center gap-2"><LuMapPin className="h-4 w-4 text-primary" aria-hidden="true" />Chișinău, Moldova</span>
            <span className="flex items-center gap-2"><LuBriefcaseBusiness className="h-4 w-4 text-primary" aria-hidden="true" />5+ years experience</span>
          </div>
          <div className="intro-enter flex flex-wrap gap-3" data-intro="actions">
            <a href="#projects" className="btn group">View my work<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></a>
            <a href="#contact" className="btn-secondary">Let&apos;s talk<LuMessageCircle className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </div>

        <div data-reveal className="hero-workspace intro-enter relative min-w-0 lg:pl-4" data-intro="workspace">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-symbol" aria-hidden="true">{"{ }"}</div>
          <svg className="circuit-art" viewBox="0 0 640 570" fill="none" aria-hidden="true">
            <circle cx="320" cy="285" r="252" stroke="currentColor" strokeDasharray="3 12" />
            <path d="M0 140h78l40-40h126M640 425h-72l-46 46H386M72 570v-65l50-50V330M600 0v72l-42 42v95" stroke="currentColor" />
            <path d="M0 156h85l40-40h56M640 441h-65l-46 46h-70" stroke="currentColor" opacity=".4" />
            <g fill="currentColor"><circle cx="244" cy="100" r="4" /><circle cx="386" cy="471" r="4" /><circle cx="122" cy="330" r="4" /><circle cx="558" cy="209" r="4" /></g>
            <g stroke="currentColor"><path d="M60 60h16m-8-8v16M570 515h16m-8-8v16" /><rect x="585" y="265" width="9" height="9" transform="rotate(45 589 269)" /></g>
          </svg>
          <div className="workspace-label" aria-hidden="true"><LuGitBranch className="h-3.5 w-3.5" />main <span className="text-secondary">/ portfolio</span></div>
          <div className="code-window surface overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between border-b border-secondary/15 px-5 py-4">
              <div className="flex gap-1.5" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></div>
              <span className="flex items-center gap-2 font-mono text-xs text-secondary"><LuCodeXml className="h-3.5 w-3.5 text-primary" aria-hidden="true" />andrei.ts</span>
              <span className="font-mono text-[10px] text-code">TypeScript</span>
            </div>
            <div className="editor-code space-y-2.5 overflow-x-auto p-5 font-mono text-xs leading-6 sm:p-6 sm:text-sm" tabIndex={0} role="region" aria-label="Developer profile code">
              <p className="code-line"><span><span className="text-accent">const</span> <span className="text-primary">developer</span> = {"{"}</span></p>
              {profile.map(([key, value]) => (
                <p key={key} className="code-line"><span className="pl-3 sm:pl-5"><span className="text-secondary">{key}:</span> <span className="text-code">{value}</span>,</span></p>
              ))}
              <p className="code-line"><span>{"};"}</span></p>
              <p className="border-t border-secondary/15 pt-4 text-secondary">{"// Useful software, thoughtfully built."}</p>
            </div>
            <div data-intro="terminal" className="editor-terminal intro-enter border-t border-secondary/15 px-5 py-4 font-mono text-xs">
              <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-secondary"><LuTerminal className="h-3.5 w-3.5" aria-hidden="true" />Terminal</div>
              <TerminalSecrets />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-secondary/15 bg-muted/50 px-5 py-3 text-xs text-secondary">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />Open to meaningful opportunities</span>
              <span className="font-mono text-primary" aria-hidden="true">&lt;/&gt;</span>
            </div>
          </div>
          <div className="workspace-tags intro-enter" data-intro="finish" aria-hidden="true"><span>{"{ }"} Full-stack</span><span>λ Cloud-native</span><span>✦ AI-curious</span></div>
        </div>
      </div>
      <div data-intro="finish" className="hero-command intro-enter mx-auto mt-14 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-secondary/15 pt-5">
        <a href="#experience" className="inline-flex min-h-10 items-center gap-3 text-xs font-medium uppercase tracking-[.16em] text-secondary transition-colors hover:text-primary"><span className="font-mono text-code" aria-hidden="true">➜ ~</span>Explore the journey<LuArrowDown className="h-4 w-4" aria-hidden="true" /></a><span className="font-mono text-[10px] text-secondary" aria-hidden="true">DESIGN. DEVELOP. REFINE. <span className="ml-3 text-primary">[ 01 — 06 ]</span></span>
      </div>
    </section>
  );
}
