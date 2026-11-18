import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

type ImageCardProps = {
  label: string;
  title: string;
  description: string;
  aspectRatio?: "square" | "landscape" | "portrait" | "wide";
};

export function ImageCard({
  label,
  title,
  description,
  aspectRatio = "landscape",
}: ImageCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden border border-charcoal/10 bg-ivory">
      <ImagePlaceholder label={label} aspectRatio={aspectRatio} className="w-full" />
      <div className="p-6 md:p-8">
        <h3 className="font-serif text-xl text-charcoal md:text-2xl">{title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-charcoal/70">{description}</p>
      </div>
    </article>
  );
}
