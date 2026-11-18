import type { PriceLevel } from "@/types";

type PriceLevelTagProps = {
  level: PriceLevel;
  className?: string;
};

export function formatPriceLevel(level: PriceLevel): string {
  return "$".repeat(level);
}

export function PriceLevelTag({ level, className = "" }: PriceLevelTagProps) {
  return (
    <span
      className={`text-sm tracking-wider text-earth ${className}`.trim()}
      aria-label={`Nivel de precio: ${level} de 4`}
      title={`${formatPriceLevel(level)} — ${level} de 4`}
    >
      {formatPriceLevel(level)}
    </span>
  );
}
