import { ActionHandler } from '../engine';
import { callGemini } from '../services/ai';

export const aiLeadScoringHandler: ActionHandler = async (config, context) => {
  console.log(`[AILeadScoringAction] Scoring lead...`);

  // Extract lead data from context
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
    - Title: ${lead.title}
    
    Output ONLY a JSON object with "score" (number) and "justification" (string).
  `;

  const aiResult = await callGemini(prompt);
  
  if (aiResult) {
    try {
      // Extract JSON from potential markdown code blocks
      const cleanJson = aiResult.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return {
        score: parsed.score,
        justification: parsed.justification,
        timestamp: new Date().toISOString(),
        model: 'gemini-1.5-flash'
      };
    } catch (e) {
      console.error("Failed to parse AI scoring result:", aiResult);
    }
  }

  // Fallback to simple heuristic if API fails
  let score = 50;
  if (lead.email?.endsWith('.edu')) score -= 10;
  if (lead.email?.endsWith('.gov')) score += 20;
  if (lead.company) score += 15;
  
  score = Math.max(1, Math.min(100, score));

  return {
    score,
    justification: '[MOCK] Quality estimated based on basic heuristics.',
    timestamp: new Date().toISOString(),
    model: 'nexus-heuristic-v1'
  };
};
