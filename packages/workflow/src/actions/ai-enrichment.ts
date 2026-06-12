import { ActionHandler } from '../engine';
import { callGemini } from '../services/ai';

export const aiEnrichmentHandler: ActionHandler = async (config, context) => {
  console.log(`[AIEnrichmentAction] Enriching lead data...`);

  // Extract lead data from context
  const lead = context.trigger?.lead || context.steps?.[config.leadStepId] || context.data;
  
  if (!lead) {
    throw new Error('No lead data found in context for enrichment.');
  }

  const { email, company } = lead;
  if (!email && !company) {
    throw new Error('Insufficient lead data for enrichment (email or company required).');
  }

  const prompt = `
    Enrich this lead data with industry, company size, and LinkedIn URL.
    Email: ${email}
    Company: ${company}
    
    Output ONLY a JSON object with:
    - industry (string)
    - companySize (string)
    - linkedInUrl (string)
  `;

  const aiResult = await callGemini(prompt);

  if (aiResult) {
    try {
      const cleanJson = aiResult.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return {
        ...parsed,
        enrichmentModel: 'gemini-1.5-flash',
        timestamp: new Date().toISOString()
      };
    } catch (e) {
      console.error("Failed to parse AI enrichment result:", aiResult);
    }
  }

  // Fallback Mock Logic
  let enrichedData = {
    industry: 'Technology',
    companySize: '51-200 employees',
    linkedInUrl: `https://www.linkedin.com/company/${(company || 'unknown').toLowerCase().replace(/\s+/g, '-')}`,
    enrichmentModel: 'nexus-enrich-v1 (mock)',
    timestamp: new Date().toISOString()
  };

  if (email?.endsWith('.edu')) {
    enrichedData.industry = 'Education';
  } else if (email?.endsWith('.gov')) {
    enrichedData.industry = 'Government';
  }

  return enrichedData;
};
