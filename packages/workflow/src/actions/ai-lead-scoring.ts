import { ActionHandler } from '../engine';

export const aiLeadScoringHandler: ActionHandler = async (config, context) => {
  console.log(`[AILeadScoringAction] Scoring lead...`);

  // Extract lead data from context
  const lead = context.trigger?.lead || context.steps?.[config.leadStepId] || context.data;

  if (!lead) {
    throw new Error('No lead data found in context for scoring.');
  }

  // Mock AI Logic: In a real scenario, this would be an LLM call
  // We'll use a simple heuristic for now
  let score = 50; // Base score

  if (lead.email?.endsWith('.edu')) score -= 10;
  if (lead.email?.endsWith('.gov')) score += 20;
  if (lead.company) score += 15;
  if (lead.title?.toLowerCase().includes('ceo') || lead.title?.toLowerCase().includes('director')) {
    score += 25;
  }

  // Clamp score between 1 and 100
  score = Math.max(1, Math.min(100, score));

  let justification = '';
  if (score > 70) {
    justification = 'High quality lead due to professional title and company association.';
  } else if (score > 40) {
    justification = 'Moderate quality lead. Basic information present.';
  } else {
    justification = 'Low quality lead. May be personal or educational email.';
  }

  return {
    score,
    justification,
    timestamp: new Date().toISOString(),
    model: 'nexus-scoring-v1 (mock)'
  };
};
