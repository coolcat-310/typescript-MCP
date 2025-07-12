import { createModel, ModelProvider } from "../utility/modelResolver";
import { generateEmailTemplateGraph } from "../graphs/generateEmailTemplateGraph";
import { generateEmailStateSchema } from "../state/generateEmailStateSchema";

type EmailStateInput = typeof generateEmailStateSchema._type;

export async function createEmailAgent(model: ModelProvider) {
  const graphModel = createModel(model);
  const app = generateEmailTemplateGraph(graphModel);

  const input: EmailStateInput = {
    userInput: "Generate a professional email to schedule a meeting with a client next week.",
    tone: "professional",
    audience: "client",
    purpose: "schedule a meeting",
    additionalContext: "The client is interested in discussing our new product line.",
    emailLength: 'medium',
  };

  const results = await app.invoke(input, { runName: "email_generation_run" });

  console.log("🏁Graph Completed:", JSON.stringify(results, null, 2));
}