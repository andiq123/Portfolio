"use client";
import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="flex justify-center my-8">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="h-16 w-1 rounded-full bg-gradient-to-b from-transparent via-primary/50 to-transparent"
      ></motion.div>
    </div>
  );
}
