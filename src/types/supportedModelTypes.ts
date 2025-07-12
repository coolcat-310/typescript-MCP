import { ChatOpenAI } from '@langchain/openai';
import { Ollama } from '@langchain/ollama';

export type supportedModelTypes =  ChatOpenAI | Ollama;
