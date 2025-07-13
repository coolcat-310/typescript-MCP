
import { supportedModelTypes } from "../types/supportedModelTypes";
import { StateGraph, START } from '@langchain/langgraph';

import { generateEmailStateSchema } from "../state/generateEmailStateSchema";
import { emailContentGeneratorNode } from "../nodes/emailContentGeneratorNode";


export function buildEmailTemplateGraph(model: supportedModelTypes) {
  const graph = new StateGraph(generateEmailStateSchema);

  // Register Nodes
  const taskNode = emailContentGeneratorNode(model);
  graph.addNode(taskNode.id, taskNode.run, { ends: taskNode.ends });

  graph.addEdge(START, taskNode.id);

  return graph.compile();
}
