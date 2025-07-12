import { z } from "zod";

export const generateEmailStateSchema = z.object({
  userInput: z.string().optional(),
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
