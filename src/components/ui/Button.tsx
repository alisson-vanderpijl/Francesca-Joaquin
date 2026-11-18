import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps & {
  href: string;
  external?: boolean;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-charcoal text-ivory border border-charcoal hover:bg-charcoal/90",
  secondary:
    "bg-transparent text-charcoal border border-charcoal/30 hover:border-charcoal hover:bg-charcoal/5",
  ghost:
    "bg-transparent text-charcoal border border-transparent hover:border-charcoal/20",
};

const baseStyles =
  "inline-flex items-center justify-center px-8 py-3.5 text-sm tracking-wide uppercase transition-all duration-300 ease-out min-h-[48px]";

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={styles} {...rest}>
        {children}
      </Link>
    );
  }

  const { href: _, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={styles} {...buttonProps}>
      {children}
    </button>
  );
}
