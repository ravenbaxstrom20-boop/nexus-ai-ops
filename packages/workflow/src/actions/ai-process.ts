import { ActionHandler } from '../engine';
import { getLLMProvider } from '../lib/llm';

export const aiProcessHandler: ActionHandler = async (config, context) => {
  console.log(`[AIAction] Processing prompt: ${config.prompt}`);

  // Variable replacement
  let processedPrompt = config.prompt;
  if (context.trigger && context.trigger.lead) {
    processedPrompt = processedPrompt.replace(/{{trigger.lead.firstName}}/g, context.trigger.lead.firstName || '');
    processedPrompt = processedPrompt.replace(/{{trigger.lead.lastName}}/g, context.trigger.lead.lastName || '');
    processedPrompt = processedPrompt.replace(/{{trigger.lead.company}}/g, context.trigger.lead.company || '');
  }

  const provider = getLLMProvider();
  const aiResult = await provider.generateText(processedPrompt);

  if (aiResult) {
    return {
      summary: aiResult,
      confidence: 1.0,
      timestamp: new Date().toISOString(),
      model: provider.name
    };
  }

  return {
    summary: `[Mock] AI summary based on: ${processedPrompt}`,
    confidence: 0.5,
    timestamp: new Date().toISOString(),
    model: 'mock'
  };
};
