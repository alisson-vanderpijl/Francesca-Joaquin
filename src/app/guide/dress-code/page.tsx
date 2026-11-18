"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Kept for backwards compatibility — dress code lives on /guide/wedding */
export default function DressCodePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/guide/wedding#dress-code");
  }, [router]);

  return null;
}
