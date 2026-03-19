"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";
import { PageTransition } from "@/components/animations/page-transition";

// Heavy animation components — load after initial paint
const Preloader = dynamic(
  () => import("@/components/animations/preloader").then((m) => m.Preloader),
  { ssr: false }
);

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <Preloader />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
