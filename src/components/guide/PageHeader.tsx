import { FadeIn } from "@/components/ui/FadeIn";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <FadeIn>
      <header className="mb-12 border-b border-charcoal/10 pb-10 md:mb-16 md:pb-14">
        <h1 className="font-serif text-4xl text-charcoal md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-charcoal/70 md:text-base">
            {subtitle}
          </p>
        )}
      </header>
    </FadeIn>
  );
}
