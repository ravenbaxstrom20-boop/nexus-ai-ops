import { ActionHandler } from '../engine';
import { getLLMProvider } from '../lib/llm';

export const aiEnrichmentHandler: ActionHandler = async (config, context) => {
  console.log(`[AIEnrichmentAction] Enriching lead data...`);

  const lead = context.trigger?.lead || context.steps?.[config.leadStepId] || context.data;
  
  if (!lead) {
    throw new Error('No lead data found in context for enrichment.');
  }

  const prompt = `
    Enrich this lead data with industry, company size, and LinkedIn URL.
    Email: ${lead.email}
    Company: ${lead.company}
    
    Output ONLY a JSON object with:
    - industry (string)
    - companySize (string)
    - linkedInUrl (string)
  `;

  const provider = getLLMProvider();
  const aiResult = await provider.generateText(prompt);

  if (aiResult) {
    try {
      const cleanJson = aiResult.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return {
        ...parsed,
        enrichmentModel: provider.name,
        timestamp: new Date().toISOString()
      };
    } catch (e) {
      console.error("Failed to parse AI enrichment result:", aiResult);
    }
  }

  // Fallback Mock Logic
  return {
    industry: 'Technology',
    companySize: 'Unknown',
    linkedInUrl: `https://www.linkedin.com/company/${(lead.company || 'unknown').toLowerCase().replace(/\s+/g, '-')}`,
    enrichmentModel: 'mock',
    timestamp: new Date().toISOString()
  };
};
