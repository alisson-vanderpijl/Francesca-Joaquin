import type { AtHomeBeautyProvider } from "@/types";

type AtHomeBeautyCardProps = {
  provider: AtHomeBeautyProvider;
  labels: {
    services: string;
    phone: string;
  };
};

export function AtHomeBeautyCard({ provider, labels }: AtHomeBeautyCardProps) {
  return (
    <article className="flex h-full flex-col border border-charcoal/10 bg-ivory p-6 transition-all duration-300 hover:border-charcoal/20 md:p-8">
      <h3 className="font-serif text-xl text-charcoal md:text-2xl">
        {provider.name}
      </h3>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-widest text-charcoal/40">
          {labels.services}
        </p>
        <ul className="mt-3 space-y-2">
          {provider.services.map((service) => (
            <li
              key={service}
              className="flex gap-3 text-sm leading-relaxed text-charcoal/70"
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-earth"
                aria-hidden="true"
              />
              <span>{service}</span>
            </li>
          ))}
        </ul>
      </div>

      <dl className="mt-auto pt-8 text-sm">
        <dt className="text-xs uppercase tracking-widest text-charcoal/40">
          {labels.phone}
        </dt>
        <dd className="mt-1 text-charcoal/80">{provider.phone}</dd>
      </dl>
    </article>
  );
}
