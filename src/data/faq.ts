export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "How much does a tattoo cost?",
    answer:
      "Pricing varies based on size, detail, and placement. Small pieces start around $200, while larger or more complex work is quoted during the consultation. We provide a detailed estimate after reviewing your concept so there are no surprises.",
  },
  {
    question: "How painful is getting a tattoo?",
    answer:
      "Pain tolerance is different for everyone. Areas with thinner skin or closer to bone (ribs, wrists, ankles) tend to be more sensitive, while meatier areas (upper arm, thigh) are generally more comfortable. Most clients describe the sensation as manageable, especially once you settle in after the first few minutes.",
  },
  {
    question: "How long does a tattoo take to heal?",
    answer:
      "The surface heals in about 2-3 weeks, but full skin recovery takes around 4-6 weeks. During this time, the tattoo may peel and feel itchy — this is completely normal. Following aftercare instructions closely will ensure the best result.",
  },
  {
    question: "What aftercare do you recommend?",
    answer:
      "We provide a detailed aftercare sheet at your appointment. In short: keep the wrap on for the recommended time, wash gently with unscented soap, pat dry, and apply a thin layer of unscented moisturizer. Avoid sun exposure, pools, and soaking for at least 2 weeks.",
  },
  {
    question: "What is the minimum age for getting tattooed?",
    answer:
      "You must be 18 years or older with a valid government-issued photo ID. We do not tattoo minors regardless of parental consent — no exceptions.",
  },
  {
    question: "Do you require a deposit?",
    answer:
      "Yes, we require a non-refundable deposit to secure your appointment. The deposit amount varies by project size and is applied toward your final total. This ensures commitment from both sides and allows us to dedicate time to your custom design.",
  },
  {
    question: "Do you offer free touch-ups?",
    answer:
      "We include one complimentary touch-up within 3 months of your original session, provided you followed aftercare instructions. Touch-ups after that period or due to aftercare neglect may incur a fee.",
  },
  {
    question: "What does the design process look like?",
    answer:
      "It starts with a consultation where we discuss your vision, placement, and sizing. From there, we create a custom design and share it with you before your appointment. We welcome feedback and revisions to make sure the final piece is exactly what you want.",
  },
];
