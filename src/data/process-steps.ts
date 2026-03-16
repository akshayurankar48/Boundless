export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Consult",
    description:
      "Share your vision. We discuss concept, placement, sizing, and style direction. No commitment — just creative dialogue.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Your concept is translated into a custom design. Every piece is original — no flash, no templates. Revisions until it's perfect.",
  },
  {
    number: "03",
    title: "Ink",
    description:
      "The session. Medical-grade sterilization, premium inks, and unwavering focus. Comfort breaks as needed. Your experience matters.",
  },
  {
    number: "04",
    title: "Heal",
    description:
      "Detailed aftercare guidance. Follow-up check-in at 2 weeks. Touch-ups included if needed. We stand behind every piece.",
  },
];
