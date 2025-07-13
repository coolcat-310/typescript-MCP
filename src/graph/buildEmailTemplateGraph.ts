
import { supportedModelTypes } from "../types/supportedModelTypes";
import { StateGraph, START } from '@langchain/langgraph';

import { generateEmailStateSchema } from "../state/generateEmailStateSchema";
// import { emailContentGeneratorNode } from "../nodes/emailContentGeneratorNode";
import { companyResearchNode } from "../nodes/companyResearchNode";


export function buildEmailTemplateGraph(model: supportedModelTypes) {
  const graph = new StateGraph(generateEmailStateSchema);

  // Register Nodes
  // const taskNode = emailContentGeneratorNode(model);
  // graph.addNode(taskNode.id, taskNode.run, { ends: taskNode.ends });

  const researchNode = companyResearchNode(model);
  graph.addNode(researchNode.id, researchNode.run, { ends: researchNode.ends });

  // @ts-expect-error - LangGraph expects a fixed set of node keys, and dynamic keys cause a type conflict
  graph.addEdge(START, researchNode.id);

  return graph.compile();
}
