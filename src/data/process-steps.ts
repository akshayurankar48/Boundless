export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation",
    description:
      "You share your idea, and we discuss placement, size, and what works best. No pressure — just a clear conversation.",
  },
  {
    number: "02",
    title: "Design & Adjustments",
    description:
      "We refine the design together — adjustments are included until it's exactly what you envisioned.",
  },
  {
    number: "03",
    title: "Size & Placement",
    description:
      "We test the size and placement on your body to make sure it sits right and looks good where it matters.",
  },
  {
    number: "04",
    title: "Pricing & Booking",
    description:
      "You get a clear quote with no surprises. Once confirmed, we take a deposit and lock your appointment.",
  },
];
