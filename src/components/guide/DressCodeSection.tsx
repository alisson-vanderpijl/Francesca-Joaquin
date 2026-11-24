"use client";

import { ImageCard } from "@/components/cards/ImageCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";

type DressCodeSectionProps = {
  variant?: "page" | "tab";
};

export function DressCodeSection({ variant = "page" }: DressCodeSectionProps) {
  const { t } = useLanguage();
  const dressCode = t.wedding.dressCode;
  const isTab = variant === "tab";

  return (
    <section
      id="dress-code"
      className={
        isTab
          ? ""
          : "mt-20 border-t border-charcoal/10 pt-20 md:mt-28 md:pt-28"
      }
    >
      <FadeIn>
        <header className="mb-12 max-w-2xl md:mb-16">
          <h2
            className={`font-serif text-charcoal ${
              isTab ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
            }`}
          >
            {dressCode.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/70 md:text-base">
            {dressCode.intro}
          </p>
        </header>
      </FadeIn>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <FadeIn delay={100}>
          <ImageCard
            label={dressCode.women.imageLabel}
            title={dressCode.women.title}
            description={dressCode.women.description}
            imageSrc="/Images/dress-code-women.jpg"
            imageWidth={1024}
            imageHeight={512}
          />
        </FadeIn>

        <FadeIn delay={200}>
          <ImageCard
            label={dressCode.men.imageLabel}
            title={dressCode.men.title}
            description={dressCode.men.description}
            imageSrc="/Images/dress-code-men.jpg"
            imageWidth={1024}
            imageHeight={512}
          />
        </FadeIn>
      </div>
    </section>
  );
}
