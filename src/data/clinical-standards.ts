export type ClinicalStandard = {
  title: string;
  description: string;
  icon: "shield" | "syringe" | "award" | "scan";
};

export const clinicalStandards: ClinicalStandard[] = [
  {
    title: "100% Disposable Setup",
    description:
      "All needles, tubes, and grips are single-use and disposed of after every session. No reuse, no compromise on safety.",
    icon: "shield",
  },
  {
    title: "No Cross Contamination",
    description:
      "Everything used during your session is handled carefully and discarded after use, maintaining a clean and controlled environment.",
    icon: "syringe",
  },
  {
    title: "Government Licensed & Trained",
    description:
      "Operating with a valid government trade license and trained under experienced mentors.",
    icon: "award",
  },
  {
    title: "Quality Vegan Inks",
    description:
      "We use Quantum vegan inks, known for smooth application, strong pigmentation, and long-lasting results.",
    icon: "scan",
  },
];
