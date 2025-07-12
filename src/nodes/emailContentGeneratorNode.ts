import { z } from 'zod';
import { generateEmailStateSchema } from "../state/generateEmailStateSchema";
import { supportedModelTypes } from '../types/supportedModelTypes';
import { withValidation } from '../utility';


const generateEmailContent = async (model: supportedModelTypes, state: z.infer<typeof generateEmailStateSchema>) => {
  const prompt = `Generate an email based on the following details:
  Subject: ${state.subject}
  Recipient: ${state.recipient}
  Body: ${state.body}
  Tone: ${state.tone || 'neutral'}
  Length: ${state.length || 'medium'}
  Additional Instructions: ${state.additionalInstructions || 'none'}
  
  Please format the email appropriately.`;

  if ('call' in model && typeof model.call === 'function') {
    const response = await model.call({ prompt });
    return { ...state, emailContent: response.text || response };
  } else if ('generate' in model && typeof model.generate === 'function') {
    const response = await model.generate([{ role: 'user', content: prompt }]);
    return { ...state, emailContent: response.generations[0][0].text || response.generations[0][0] };
  } else {
    throw new Error('Unsupported model type');
  }
};


export const createEmailContentGeneratorNode = async (
  model: supportedModelTypes,
  state: z.infer<typeof generateEmailStateSchema>
) => {
  return {
    id: 'emailContentGeneratorNode',
    run: withValidation(generateEmailStateSchema, (state) => generateEmailContent(model, state)),
    ends: []
  };
}