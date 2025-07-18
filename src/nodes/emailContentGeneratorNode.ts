import { generateEmailStateSchema, GenerateEmailState } from "../state/generateEmailStateSchema";
import { supportedModelTypes } from "../types/supportedModelTypes";
import { withValidation } from "../utility/withValidation";

async function generateEmailContent(
  model: supportedModelTypes,
  state: {
    userInput?: string;
    tone?: string;
    audience?: string;
    purpose?: string;
    additionalContext?: string;
    emailLength?: string;
    recipientInfo?: string;
    emailSubject?: string;
    emailBody?: string;
    followUpAction?: string;
    emailSignature?: string;
    generatedEmail?: string;
    error?: string;
  }
): Promise<GenerateEmailState> {
  // Compose the email subject if not provided
  const subject = state.emailSubject ?? `Regarding ${state.purpose ?? "your request"}`;

  // Compose the email body
  let body = state.emailBody ?? "";
  if (!body) {
    body = `Dear ${state.recipientInfo ?? "Recipient"},\n\n`;
    body += `${state.userInput ?? "I hope this email finds you well."}\n\n`;
    if (state.additionalContext) {
      body += `${state.additionalContext}\n\n`;
    }
    body += `Purpose: ${state.purpose ?? "General Inquiry"}\n`;
    if (state.followUpAction) {
      body += `Next Steps: ${state.followUpAction}\n`;
    }
    body += `\n${state.emailSignature ?? "Best regards,\nYour Name"}`;
  }

  if (state.tone === "formal") {
    body = body.replace("I hope this email finds you well.", "I trust this message finds you in good health.");
  } else if (state.tone === "informal") {
    body = body.replace("I hope this email finds you well.", "Hey there!");
  }

  const generatedEmail = {
    subject,
    body,
    modelUsed: model,
    audience: state.audience,
    length: state.emailLength,
  };

  const myPromise = new Promise((resolve, reject) => {
        // Simulate an asynchronous operation (e.g., fetching data)
        setTimeout(() => {
            resolve(generatedEmail); // Resolve the promise with the data
        }, 1000);
    });

  const response = await myPromise;

  return response as GenerateEmailState;
}

export function emailContentGeneratorNode (
  model: supportedModelTypes,
) {
  return {
    id: 'emailContentGeneratorNode',
    run: withValidation(generateEmailStateSchema, (state: GenerateEmailState) => generateEmailContent(model, state)),
    ends: []
  };
}

