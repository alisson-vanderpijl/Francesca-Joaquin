type ImagePlaceholderProps = {
  label: string;
  aspectRatio?: "square" | "landscape" | "portrait" | "wide";
  className?: string;
};

const aspectClasses = {
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
};

export function ImagePlaceholder({
  label,
  aspectRatio = "landscape",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-sand/40 ${aspectClasses[aspectRatio]} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sand/20 to-earth/10" />
      <p className="relative z-10 max-w-[80%] text-center text-xs uppercase tracking-widest text-charcoal/40">
        {label}
      </p>
    </div>
  );
}
