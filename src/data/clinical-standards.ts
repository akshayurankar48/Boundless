export type ClinicalStandard = {
  title: string;
  description: string;
  icon: "shield" | "syringe" | "award" | "scan";
};

export const clinicalStandards: ClinicalStandard[] = [
  {
    title: "Hospital Grade Autoclave",
    description:
      "Industry-leading auto-sterilization for all precision instruments. Every tool undergoes a full sterilization cycle before each client.",
    icon: "shield",
  },
  {
    title: "100% Single Use",
    description:
      "Needles, tubes, grips — single-use, medical-grade, and fully disposable. Zero cross-contamination risk.",
    icon: "syringe",
  },
  {
    title: "Licensed & Certified",
    description:
      "Fully certified practitioners with advanced medical hygiene training. Exceeding industry health and safety standards.",
    icon: "award",
  },
  {
    title: "Premium Vegan Inks",
    description:
      "ISO-certified sterilization and premium vegan-friendly mineral inks. Your safety is the canvas for our craft.",
    icon: "scan",
  },
];
