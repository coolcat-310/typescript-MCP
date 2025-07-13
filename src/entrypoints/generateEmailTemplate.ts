import { buildEmailTemplateGraph } from "../graph/buildEmailTemplateGraph";
import { ModelProvider, createModel } from "../models/modelResolver";


export async function generateEmailTemplate(modelArg: ModelProvider) {
  const model  = createModel(modelArg);

  const app = buildEmailTemplateGraph(model);

}