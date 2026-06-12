import { ActionHandler } from '../engine';
import { callGemini } from '../services/ai';

export const aiProcessHandler: ActionHandler = async (config, context) => {
  console.log(`[AIAction] Processing prompt: ${config.prompt}`);

  // Variable replacement
  let processedPrompt = config.prompt;
  if (context.trigger && context.trigger.lead) {
    processedPrompt = processedPrompt.replace(/{{trigger.lead.firstName}}/g, context.trigger.lead.firstName || '');
    processedPrompt = processedPrompt.replace(/{{trigger.lead.lastName}}/g, context.trigger.lead.lastName || '');
    processedPrompt = processedPrompt.replace(/{{trigger.lead.company}}/g, context.trigger.lead.company || '');
    processedPrompt = processedPrompt.replace(/{{trigger.lead.industry}}/g, context.trigger.lead.industry || '');
  }

  const aiResult = await callGemini(processedPrompt);

  if (aiResult) {
    return {
      summary: aiResult,
      confidence: 1.0,
      timestamp: new Date().toISOString(),
      model: 'gemini-1.5-flash'
    };
  }

  // Fallback to mock if API key missing or call fails
  return {
    summary: `[MOCK] AI summary of lead based on prompt: ${processedPrompt}`,
    confidence: 0.95,
    timestamp: new Date().toISOString(),
    model: 'nexus-mock-v1'
  };
};
