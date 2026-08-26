"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { LuArrowRight, LuBriefcaseBusiness, LuMapPin, LuMessageCircle } from "react-icons/lu";

export default function Intro() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section id="home" className="relative flex w-full items-center justify-center overflow-hidden px-4 pb-20 pt-28 md:px-8 md:pb-24 md:pt-36">
      {/* Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-20 right-[10%] w-72 h-72 bg-primary/20 rounded-full blur-[60px] md:blur-[100px] z-0 will-change-transform"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-20 left-[10%] w-96 h-96 bg-accent/20 rounded-full blur-[60px] md:blur-[100px] z-0 will-change-transform"
      />

      <div className="z-10 grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="block text-foreground">Software</span>
              <span className="text-gradient">Engineer.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-secondary max-w-lg leading-relaxed pt-2">
              Full-stack developer focused on backend and cloud-native delivery. Clean code, scalable systems, and effective collaboration in agile environments.
            </p>
            
            <div className="flex flex-wrap gap-5 pt-4 text-sm font-medium text-secondary">
              <div className="flex items-center gap-2">
                <LuMapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                Chisinau, Moldova
              </div>
              <div className="flex items-center gap-2">
                <LuBriefcaseBusiness className="h-4 w-4 text-primary" aria-hidden="true" />
                5+ Years Experience
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#projects" className="btn group relative overflow-hidden px-8 py-4 rounded-xl text-white font-semibold text-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center">
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <LuArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a href="#contact" className="group flex items-center justify-center gap-2 rounded-xl bg-muted/50 px-8 py-4 text-lg font-semibold text-foreground transition-all hover:bg-primary/10 hover:text-primary">
              Contact Me
              <LuMessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        {/* Visual/Decoration (Right Side - Desktop & Scaled Mobile) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:block mt-12 lg:mt-0"
        >
          <div className="glass relative z-10 mx-auto max-w-md rounded-[1.75rem] p-6 shadow-xl transition-transform duration-500 md:p-8 lg:max-w-none lg:rotate-1 lg:hover:rotate-0">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent rounded-full opacity-20 blur-2xl animate-pulse"></div>
            
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-[10px] font-mono text-secondary md:text-xs">andrei.ts</div>
            </div>
            
            <div className="space-y-3 md:space-y-4 font-mono text-xs md:text-sm overflow-hidden">
              <div className="flex gap-4">
                <span className="text-secondary w-4 md:w-6 select-none">1</span>
                <div>
                    <span className="text-accent">const</span> <span className="text-yellow-400">developer</span> = <span className="text-accent">{`{`}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-secondary w-4 md:w-6 select-none">2</span>
                <div>
                    <span className="pl-4 md:pl-6 text-foreground">name:</span> <span className="text-green-400">{`'Andrei'`}</span>,
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-secondary w-4 md:w-6 select-none">3</span>
                <div>
                     <span className="pl-4 md:pl-6 text-foreground">role:</span> <span className="text-green-400">{`'Software Engineer'`}</span>,
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-secondary w-4 md:w-6 select-none">4</span>
                <div>
                    <span className="pl-4 md:pl-6 text-foreground">focus:</span> <span className="text-green-400">{`'Cloud products & AI'`}</span>,
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-secondary w-4 md:w-6 select-none">5</span>
                <div>
                    <span className="pl-4 md:pl-6 text-foreground">stack:</span> <span className="text-accent">[</span>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-secondary w-4 md:w-6 select-none">6</span>
                <div>
                    <span className="pl-8 md:pl-12 text-green-400">{`'React'`}</span>, <span className="text-green-400">{`'TypeScript'`}</span>, <span className="text-green-400">{`'.NET'`}</span>,
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-secondary w-4 md:w-6 select-none">7</span>
                <div>
                    <span className="pl-8 md:pl-12 text-green-400">{`'AWS'`}</span>, <span className="text-green-400">{`'Go'`}</span>, <span className="text-green-400">{`'LLMs'`}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-secondary w-4 md:w-6 select-none">8</span>
                <div>
                    <span className="pl-4 md:pl-6 text-accent">]</span>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-secondary w-4 md:w-6 select-none">9</span>
                <div>
                    <span className="text-accent">{`}`}</span>;
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-xl bg-muted/35 px-3 py-2 text-xs font-medium text-secondary">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
              Open to meaningful opportunities
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
