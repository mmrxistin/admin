// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

import { z } from "zod";

export const malperPageSchema = z.object({
  title: z.string().trim().min(1).max(120),
  slug: z.string().trim().min(1).max(80).regex(/^[a-z0-9-]+$/),
  description: z.string().trim().max(240).default(""),
  content: z.string().trim().min(1).max(20000),
  layout: z.enum(["standard", "feature"]).default("standard"),
  published: z.boolean().default(true),
});

export type MalperPageInput = z.infer<typeof malperPageSchema>;
