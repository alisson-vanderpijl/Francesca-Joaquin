import Image from "next/image";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

type ImageCardProps = {
  label: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  aspectRatio?: "square" | "landscape" | "portrait" | "wide";
};

export function ImageCard({
  label,
  title,
  description,
  imageSrc,
  imageWidth,
  imageHeight,
  aspectRatio = "landscape",
}: ImageCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden border border-charcoal/10 bg-ivory">
      {imageSrc ? (
        <div className="relative w-full bg-sand/20">
          <Image
            src={imageSrc}
            alt={label}
            width={imageWidth ?? 1024}
            height={imageHeight ?? 512}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : (
        <ImagePlaceholder label={label} aspectRatio={aspectRatio} className="w-full" />
      )}
      <div className="p-6 md:p-8">
        <h3 className="font-serif text-xl text-charcoal md:text-2xl">{title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-charcoal/70">{description}</p>
      </div>
    </article>
  );
}
