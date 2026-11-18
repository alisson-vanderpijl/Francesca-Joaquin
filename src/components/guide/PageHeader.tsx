import { FadeIn } from "@/components/ui/FadeIn";
import { renderInlineBold } from "@/lib/render-inline-bold";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

function subtitleParagraphs(subtitle: string): string[] {
  return subtitle
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  const paragraphs = subtitle ? subtitleParagraphs(subtitle) : [];

  return (
    <FadeIn>
      <header className="mb-12 border-b border-charcoal/10 pb-10 md:mb-16 md:pb-14">
        <h1 className="font-serif text-4xl text-charcoal md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {paragraphs.length > 0 && (
          <div className="mt-4 max-w-3xl space-y-4 text-sm leading-relaxed text-charcoal/70 md:text-base">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{renderInlineBold(paragraph)}</p>
            ))}
          </div>
        )}
      </header>
    </FadeIn>
  );
}
