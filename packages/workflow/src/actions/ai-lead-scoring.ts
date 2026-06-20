import { ActionHandler } from '../engine';
import { getLLMProvider } from '../lib/llm';

export const aiLeadScoringHandler: ActionHandler = async (config, context) => {
  console.log(`[AILeadScoringAction] Scoring lead...`);

  const lead = context.trigger?.lead || context.steps?.[config.leadStepId] || context.data;
  
  if (!lead) {
    throw new Error('No lead data found in context for scoring.');
  }

  const prompt = `
    Score this sales lead from 1-100 based on their potential value and fit.
    Lead Info:
    - Name: ${lead.firstName} ${lead.lastName}
    - Email: ${lead.email}
    - Company: ${lead.company}
    - Industry: ${lead.industry}
    
    Output ONLY a JSON object with "score" (number) and "justification" (string).
  `;

  const provider = getLLMProvider();
  const aiResult = await provider.generateText(prompt);
  
  if (aiResult) {
    try {
      const cleanJson = aiResult.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return {
        score: parsed.score,
        justification: parsed.justification,
        timestamp: new Date().toISOString(),
        model: provider.name
      };
    } catch (e) {
      console.error("Failed to parse AI scoring result:", aiResult);
    }
  }

  // Heuristic Fallback
  let score = 50;
  if (lead.email?.endsWith('.edu')) score -= 10;
  if (lead.email?.endsWith('.gov')) score += 20;
  if (lead.company) score += 15;
  
  return {
    score: Math.max(1, Math.min(100, score)),
    justification: '[Fallback] Quality estimated based on basic heuristics.',
    timestamp: new Date().toISOString(),
    model: 'heuristic-v1'
  };
};
