"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";

// Heavy animation components — load after initial paint
const Preloader = dynamic(
  () => import("@/components/animations/preloader").then((m) => m.Preloader),
  { ssr: false }
);
const MagneticCursor = dynamic(
  () => import("@/components/animations/magnetic-cursor").then((m) => m.MagneticCursor),
  { ssr: false }
);

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <Preloader />
      <MagneticCursor />
      {children}
    </>
  );
}
