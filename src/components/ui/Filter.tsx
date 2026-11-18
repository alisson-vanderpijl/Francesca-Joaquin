"use client";

type FilterProps = {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  formatOption?: (value: string) => string;
};

export function Filter({ label, options, value, onChange, formatOption }: FilterProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-widest text-charcoal/60">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal transition-colors duration-200 focus:border-earth focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {formatOption ? formatOption(option) : option}
          </option>
        ))}
      </select>
    </div>
  );
}
