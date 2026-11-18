import Image from "next/image";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { renderInlineBold } from "@/lib/render-inline-bold";
import type { Recommendation } from "@/types";

type RecommendationCardProps = {
  item: Recommendation;
  showImage?: boolean;
  showPhone?: boolean;
  labels?: {
    address?: string;
    phone?: string;
  };
};

export function RecommendationCard({
  item,
  showImage = true,
  showPhone = false,
  labels,
}: RecommendationCardProps) {
  const placeholderLabel = item.imageLabel ?? item.name;
  const addressLabel = labels?.address ?? "Dirección";
  const phoneLabel = labels?.phone ?? "Teléfono";
  const phoneIsPlaceholder = item.phone?.includes("Placeholder") ?? false;

  return (
    <article className="flex h-full flex-col overflow-hidden border border-charcoal/10 bg-ivory transition-all duration-300 hover:border-charcoal/20">
      {showImage &&
        (item.imageUrl ? (
          <div className="relative aspect-[4/3] w-full shrink-0">
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <ImagePlaceholder
            label={placeholderLabel}
            aspectRatio="landscape"
            className="w-full shrink-0"
          />
        ))}

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="font-serif text-xl text-charcoal md:text-2xl">{item.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
          {renderInlineBold(item.description)}
        </p>

        <dl className="mt-6 space-y-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-widest text-charcoal/40">
              {addressLabel}
            </dt>
            <dd className="mt-1 text-charcoal/80">{item.address}</dd>
          </div>
          {showPhone && item.phone && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-charcoal/40">
                {phoneLabel}
              </dt>
              <dd className="mt-1">
                {phoneIsPlaceholder ? (
                  <span className="text-charcoal/60">{item.phone}</span>
                ) : (
                  <a
                    href={`tel:${item.phone.replace(/\s/g, "")}`}
                    className="text-earth transition-colors hover:text-charcoal"
                  >
                    {item.phone}
                  </a>
                )}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </article>
  );
}