import { z } from "zod";

export const messageFormSchema = z.object({
  message: z.string().trim().min(1).max(255),
});

export type MessageFormData = z.infer<typeof messageFormSchema>;
