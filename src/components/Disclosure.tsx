import type { ComponentProps, ReactNode } from "react";
import { LuChevronRight } from "react-icons/lu";

type DisclosureProps = ComponentProps<"details"> & { summary: ReactNode };

/** Native keyboard behavior and grouping, with CSS-only reversible transitions. */
export default function Disclosure({ summary, children, className = "", ...props }: DisclosureProps) {
  return (
    <details {...props} className={`disclosure ${className}`}>
      <summary className="flex min-h-11 cursor-pointer items-center gap-2">
        <LuChevronRight className="disclosure-chevron h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {summary}
      </summary>
      <div className="disclosure-body"><div className="disclosure-content">{children}</div></div>
    </details>
  );
}
