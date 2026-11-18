type AdminFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  type?: "text" | "url" | "number";
  placeholder?: string;
};

export function AdminField({
  label,
  value,
  onChange,
  multiline = false,
  type = "text",
  placeholder,
}: AdminFieldProps) {
  const className =
    "w-full border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal focus:border-earth focus:outline-none";

  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-widest text-charcoal/60">
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder={placeholder}
          className={`${className} min-h-[100px] resize-y`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={className}
        />
      )}
    </label>
  );
}
