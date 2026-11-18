import type { ReactNode } from "react";

type InvitationShellProps = {
  children: ReactNode;
  languageSwitcher?: ReactNode;
  align?: "center" | "top";
};

export function InvitationShell({
  children,
  languageSwitcher,
  align = "center",
}: InvitationShellProps) {
  return (
    <div
      className={`flex min-h-[100dvh] flex-col bg-invitation-canvas px-4 sm:px-6 ${
        align === "center"
          ? "justify-center py-8 sm:py-12 lg:py-16"
          : "py-8 sm:py-12 lg:py-16"
      }`}
    >
      <div className="mx-auto w-full max-w-[40.8rem]">
        <article
          className={`invitation-card relative flex min-h-[min(36rem,82dvh)] flex-col px-7 py-12 sm:px-10 sm:py-14 md:px-12 md:py-16 ${
            align === "center" ? "justify-center" : "justify-start"
          }`}
        >
          {languageSwitcher && (
            <div className="absolute right-5 top-5 z-20 sm:right-7 sm:top-7">
              {languageSwitcher}
            </div>
          )}
          {children}
        </article>
      </div>
    </div>
  );
}
