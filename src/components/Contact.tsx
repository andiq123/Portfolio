"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { createContainerVariants, createItemVariants, buttonVariants } from "@/constants/animations";

export default function Contact() {
  const isMobile = useIsMobile();

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-muted">
      <motion.div
        className="max-w-4xl mx-auto text-center space-y-8"
        variants={createContainerVariants(isMobile)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-foreground"
          variants={createItemVariants(isMobile)}
        >
          Let&apos;s Connect
        </motion.h2>
        <motion.p
          className="text-xl text-secondary max-w-2xl mx-auto"
          variants={createItemVariants(isMobile)}
        >
          I&apos;m interested in exploring new opportunities, technical challenges, and potential collaborations. Feel free to reach out for professional inquiries.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          variants={createItemVariants(isMobile)}
        >
          <motion.div
            className="text-lg text-secondary"
            variants={createItemVariants(isMobile)}
          >
            <span className="font-medium text-foreground">Professional Email:</span>{" "}
            <motion.a
              href="mailto:andrei.ungureanu.work@gmail.com"
              className="text-primary hover:text-primary-dark transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              andrei.ungureanu.work@gmail.com
            </motion.a>
          </motion.div>

          <motion.a
            href="https://www.linkedin.com/in/andrei-ungureanu-63086016a/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn inline-flex items-center justify-center bg-muted text-foreground hover:bg-muted/80"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            LinkedIn
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
