"use client";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-muted">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
          Let&apos;s Connect
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl mx-auto">
          I&apos;m interested in exploring new opportunities, technical challenges, and potential collaborations. Feel free to reach out for professional inquiries.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="text-lg text-secondary">
            <span className="font-medium text-foreground">Professional Email:</span>{" "}
            <a
              href="mailto:andrei.ungureanu.work@gmail.com"
              className="text-primary hover:text-primary-dark transition-colors"
            >
              andrei.ungureanu.work@gmail.com
            </a>
          </div>

          <a
            href="https://www.linkedin.com/in/andrei-ungureanu-63086016a/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn inline-flex items-center justify-center bg-muted text-foreground hover:bg-muted/80 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
