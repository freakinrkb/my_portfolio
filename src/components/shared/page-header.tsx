import { Reveal } from "@/components/shared/reveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

/** Standard header for every subpage — eyebrow, title, lede. */
export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <Reveal>
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>}
      </div>
    </Reveal>
  );
}
