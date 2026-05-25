import { ActionHandler } from '../engine';

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

  // Mock AI/External API Logic: In a real scenario, this would call an LLM or an enrichment service like Clearbit/Apollo
  // We'll simulate fetching data based on the domain or company name
  
  let enrichedData = {
    industry: 'Technology',
    companySize: '51-200 employees',
    linkedInUrl: `https://www.linkedin.com/company/${(company || 'unknown').toLowerCase().replace(/\s+/g, '-')}`,
    enrichmentModel: 'nexus-enrich-v1 (mock)',
    timestamp: new Date().toISOString()
  };

  // Heuristic adjustments
  if (email?.endsWith('.edu')) {
    enrichedData.industry = 'Education';
    enrichedData.companySize = 'N/A';
  } else if (email?.endsWith('.gov')) {
    enrichedData.industry = 'Government';
    enrichedData.companySize = '10,000+ employees';
  } else if (company?.toLowerCase().includes('startup')) {
    enrichedData.companySize = '1-10 employees';
  }

  console.log(`[AIEnrichmentAction] Data enriched for ${email || company}`);

  return enrichedData;
};
