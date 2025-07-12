
import { StateGraph, START } from '@langchain/langgraph';
import { supportedModelTypes }  from '../types/supportedModelTypes';
import { generateEmailStateSchema } from '../state/generateEmailStateSchema';

export const generateEmailTemplateGraph = (model: supportedModelTypes) => {
  const graph = new StateGraph({ channel: generateEmailStateSchema});
  
  const taskNode = emailContentGeneratorNode(model);
  graph.addNode(taskNode.id, taskNode.run, { ends: taskNode.ends });

  // Routing
  graph.addEdge(START, taskNode.id);
  return graph.compile();
};
