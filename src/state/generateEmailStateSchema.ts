import { z } from "zod";

export const generateEmailStateSchema = z.object({
  userInput: z.string().describe("The user's input or request for the email."),
  emailTone: z.string().optional(),
  emailLength: z.string().optional(),
  recipientInfo: z.string().optional(),
  emailSubject: z.string().optional(),
  emailBody: z.string().optional(),
  followUpAction: z.string().optional(),
  emailSignature: z.string().optional(),
  generatedEmail: z.string().optional(),
  error: z.string().optional(),
});
