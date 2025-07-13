import { buildEmailTemplateGraph } from "../graph/buildEmailTemplateGraph";
import { ModelProvider, createModel } from "../models/modelResolver";
import { GenerateEmailState } from "../state/generateEmailStateSchema";


export async function generateEmailTemplate(modelArg: ModelProvider) {
  const model  = createModel(modelArg);

  const app = buildEmailTemplateGraph(model);

  const input: GenerateEmailState = {
    userInput: "Draft a professional email to a client about project updates.",
    tone: "Professional",
    audience: "Client",
    purpose: "Provide updates on project status and next steps.",
    researchURLs: [
      "https://www.endpoint.com/",
    ]
  };
  const runName = "email-template-generation";

  const appResult = await app.invoke(input, { runName });


  console.log("🏁 App Graph Completed:", JSON.stringify(appResult, null, 2));
}