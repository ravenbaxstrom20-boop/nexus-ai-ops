import { Engine } from '../src/engine';
import { WorkflowDefinition } from '../src/types';

async function runEnrichmentTest() {
  const engine = new Engine();

  const definition: WorkflowDefinition = {
    trigger: {
      type: 'webhook',
      config: { path: '/lead-enrichment' }
    },
    actions: [
      {
        id: 'enrich-lead',
        type: 'ai_enrichment',
        config: {}
      },
      {
        id: 'log-result',
        type: 'log',
        config: { message: 'Enrichment finished' }
      }
    ]
  };

  const leads = [
    {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@techstartup.com',
      company: 'TechStartup Inc'
    },
    {
      firstName: 'Professor',
      lastName: 'X',
      email: 'charles@xavier.edu',
      company: 'Xavier Academy'
    }
  ];

  for (const lead of leads) {
    console.log(`\n--- Testing Lead Enrichment: ${lead.firstName} ${lead.lastName} ---`);
    const result = await engine.executeWorkflow(definition, { lead });
    console.log('Result:', JSON.stringify(result.steps['enrich-lead'], null, 2));
  }
}

runEnrichmentTest().catch(console.error);
