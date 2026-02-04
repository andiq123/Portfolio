"use client";
import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="flex justify-center my-1 md:my-2">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="h-10 w-0.5 rounded-full bg-gradient-to-b from-transparent via-primary/40 to-transparent"
      ></motion.div>
    </div>
  );
}
