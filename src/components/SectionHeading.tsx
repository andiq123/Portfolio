"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";

type Props = {
  icon: IconType;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
};

export default function SectionHeading({ icon: Icon, eyebrow, title, accent, description }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.45 }} className="mb-10 text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
        {eyebrow}
      </div>
      <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
        {title}{accent && <> <span className="text-gradient">{accent}</span></>}
      </h2>
      {description && <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">{description}</p>}
    </motion.div>
  );
}
