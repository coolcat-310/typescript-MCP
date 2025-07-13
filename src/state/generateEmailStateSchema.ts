import { z } from "zod";

export const generateEmailStateSchema = z.object({
  userInput: z.string().min(1, "User input is required"),
  tone: z.string().optional(),
  audience: z.string().optional(),
  purpose: z.string().optional(),
  additionalContext: z.string().optional(),
  emailLength: z.string().optional(),
  recipientInfo: z.string().optional(),
  emailSubject: z.string().optional(),
  emailBody: z.string().optional(),
  followUpAction: z.string().optional(),
  emailSignature: z.string().optional(),
  generatedEmail: z.string().optional(),
  error: z.string().optional(),
});

export type GenerateEmailState = z.infer<typeof generateEmailStateSchema>;
