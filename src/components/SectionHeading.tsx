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
    <div data-reveal className="section-heading mb-10">
      <div className="eyebrow mb-4 font-mono"><span className="text-code" aria-hidden="true">{"//"}</span>
        <Icon className="h-4 w-4" aria-hidden="true" />
        {eyebrow}
      </div>
      <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
        {title}{accent && <> <span className="text-gradient">{accent}</span></>}
      </h2>
      {description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">{description}</p>}
    </div>
  );
}
