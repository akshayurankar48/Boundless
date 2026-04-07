import { z } from "zod";

export const placementOptions = [
  "forearm",
  "upper-arm",
  "sleeve",
  "back",
  "chest",
  "ribs",
  "thigh",
  "calf",
  "wrist",
  "ankle",
  "neck",
  "hand",
  "other",
] as const;

export type Placement = (typeof placementOptions)[number];

export const placementLabels: Record<Placement, string> = {
  forearm: "Forearm",
  "upper-arm": "Upper Arm",
  sleeve: "Sleeve",
  back: "Back",
  chest: "Chest",
  ribs: "Ribs",
  thigh: "Thigh",
  calf: "Calf",
  wrist: "Wrist",
  ankle: "Ankle",
  neck: "Neck",
  hand: "Hand",
  other: "Other",
};

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be under 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be under 15 digits"),
  place: z.string().min(2, "Place must be at least 2 characters").max(100, "Place must be under 100 characters"),
  idea: z
    .string()
    .min(10, "Please describe your idea in at least 10 characters")
    .max(2000, "Please keep your description under 2000 characters"),
  placement: z.enum(placementOptions, {
    message: "Please select a placement area",
  }),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
