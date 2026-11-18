"use client";

import Image from "next/image";
import { GuideLandingCards } from "@/components/guide/GuideLandingCards";
import { WeddingCountdown } from "@/components/guide/WeddingCountdown";
import { useSiteConfig } from "@/components/providers/ContentProvider";
import { FadeIn } from "@/components/ui/FadeIn";
import { siteContainerClass } from "@/lib/layout-classes";

const GUIDE_HERO_IMAGE = "/Images/guide-hero.jpg";

export function GuideLanding() {
  const siteConfig = useSiteConfig();

  return (
    <>
      <FadeIn>
        <section className="w-full">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand/40 md:aspect-[21/9]">
            <Image
              src={GUIDE_HERO_IMAGE}
              alt={siteConfig.coupleNames}
              fill
              unoptimized
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 sm:bottom-6 lg:bottom-8">
              <div className={siteContainerClass}>
                <WeddingCountdown />
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={100}>
        <GuideLandingCards />
      </FadeIn>
    </>
  );
}
